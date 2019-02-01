import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book'

class Search extends React.Component {
  // constructor method to maintain book array
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  // retrieve all books from BooksAPI using getAll() when page loaded
  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      console.log(resp);
      this.setState({ books: resp });
    });
  }

  // method to update search results based on query in search field
  updateQuery = (query) => {
    this.setState({ query: query }, this.submitSearch);
  }

  // method to show results from query
  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      console.log(res);
      if(res.error) {
        return this.setState({ results: [] });
      } else {
        res.forEach(b => {
          // to make sure shelf of book in search results matches shelf of book in our library
          let f = this.state.books.filter(B => B.id === b.id);
          if(f[0]) {
            b.shelf = f[0].shelf;
          }
        });
        return this.setState({ results: res });
      }
    });
  }

  // method to update book's shelf
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat({book})
      }));
    });
  }
  
  render() {
    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) =>
                <Book updateShelf={this.updateShelf}
                  book={book}
                  key={key} />)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search