import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../Shelf'
import * as BooksAPI from '../../BooksAPI'

class Main extends React.Component {
  // constructor method to maintain book array
  constructor(props) {
    super(props);
    this.state = {
      books: []
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
      <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf updateShelf={this.updateShelf}
              name="Currently Reading"
              books={this.state.books.filter(b => b.shelf === "currentlyReading")}/>
            <Shelf updateShelf={this.updateShelf}
              name="Want To Read"
              books={this.state.books.filter(b => b.shelf === "wantToRead")}/>
            <Shelf updateShelf={this.updateShelf}
              name="Read"
              books={this.state.books.filter(b => b.shelf === "read")}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/Search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Main