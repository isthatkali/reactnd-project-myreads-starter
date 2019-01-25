import React from 'react'
import * as BooksAPI from '../BooksAPI'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book
    }
  }

  componentDidMount() {
    console.log(this);
  }

  // method to update book's shelf
  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
    });
  }

  render() {
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ 
                width: 128,
                height: 193,
                backgroundImage: `url(${this.state.book.imageLinks ? this.state.book.imageLinks.thumbnail : ''})`
              }}
            />
            <div className="book-shelf-changer">
              <select value={this.state.book.shelf || "None"}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.state.book.title || "N/A"}</div>
          <div className="book-authors">{this.state.book.authors[0] || "N/A"}</div>
        </div>
      </li>
    );
  }
}

export default Book