const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./utils/config')

const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
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
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      console.log('jee')
      let returnedBooks = Book.find({})
      console.log(returnedBooks)
      console.log('jee')
      if (args.author) {
        returnedBooks = returnedBooks.filter(
          (book) => book.author === args.author
        )
      }
      if (args.genre) {
        returnedBooks = returnedBooks.filter((book) =>
          book.genres.includes(args.genre)
        )
      }
      return returnedBooks
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('Trying to create a book')
      try {
        let bookAuthor = Author.findOne({ name: args.author })
        console.log(bookAuthor)
        if (!bookAuthor) {
          bookAuthor = new Author({ name: args.author })
          bookAuthor.save()
          console.log('New author created')
        }
        const book = new Book({ ...args, author: bookAuthor })
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      )
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
