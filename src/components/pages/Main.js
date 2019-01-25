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

  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")}/>
            <Shelf name="Want To Read" books={this.state.books.filter(b => b.shelf === "wantToRead")}/>
            <Shelf name="Read" books={this.state.books.filter(b => b.shelf === "read")}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='Search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Main