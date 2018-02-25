import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    render() {
        console.log(this.props.books)
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.name}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(b => b.shelf === this.props.shortName).map(book =>
                      <li key={book.id}>
                        <Book
                            title={book.title}
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
