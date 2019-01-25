import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'

class Search extends React.Component {
  // constructor method to maintain book array
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: []
    }
  }

  // retrieve all books from BooksAPI using getAll() when page loaded
  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      console.log(resp);
      this.setState({ books: resp});
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
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default Search