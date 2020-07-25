const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  PubSub,
  gql,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => {
      let returnedBooks = await Book.find({}).populate('author')
      if (args.author) {
        returnedBooks = returnedBooks.filter(
          (book) => book.author.name === args.author
        )
      }
      if (args.genre) {
        returnedBooks = returnedBooks.filter((book) =>
          book.genres.includes(args.genre)
        )
      }
      return returnedBooks
    },
    allGenres: async () => {
      const books = await Book.find({})
      let genres = []
      const bookGenreArrays = books.map((book) => book.genres)
      bookGenreArrays.forEach((genreArray) =>
        genreArray.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres = genres.concat(genre)
          }
        })
      )
      return genres
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        let bookAuthor = await Author.findOne({ name: args.author })
        if (!bookAuthor) {
          bookAuthor = new Author({ name: args.author })
        }
        const book = new Book({ ...args, author: bookAuthor })
        await book.save()
        bookAuthor.books = bookAuthor.books.concat(book)
        bookAuthor.bookCount = bookAuthor.books.length
        bookAuthor.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        {
          new: true,
        }
      )
      return updatedAuthor
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
