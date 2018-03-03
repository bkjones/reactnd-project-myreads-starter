import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    state = {
        shelfNames: {
            currentlyReading: "Currently Reading",
            wantToRead: "Want to Read",
            read: "Read"
        }
    }

    render() {
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelfNames[this.props.shortName]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(b => b.shelf === this.props.shortName).map(book =>
                      <li key={book.id}>
                        <Book
                            title={book.title}
                            bookId={book.id}
                            authors={book.authors}
                            cover={book.imageLinks['smallThumbnail']}
                            mover={this.props.mover}
                            shelfId={book.shelf}
                            shelfName={this.props.name}
                        />
                      </li>
                  )}
                </ol>
              </div>
            </div>
        )
    }
}


export default Bookshelf
