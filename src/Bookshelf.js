import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    state = {
        shelfNames: {
            currentlyReading: "Currently Reading",
            wantToRead: "Want to Read",
            read: "Read",
            searchResults: "Search Results",
            none: "None"
        },
        defaultValues: {
            defaultAuthor: 'No Author!',
            defaultImage: 'no-cover.gif'
        }
    }

    render() {
        this.props.books.map(b => {
            if(b.hasOwnProperty('authors') === false){
                b.authors = this.state.defaultValues.defaultAuthor
            } else if(b.hasOwnProperty('imageLinks') === false ){
                b.imageLinks = {}
                b.imageLinks.smallThumbnail = this.state.defaultValues.defaultImage
            } else if(b.hasOwnProperty('shelf') === false){
                b.shelf = "none"
            }
        })
        console.log("Bookshelf.props.books: ", this.props.books)
        if(this.props.shortName !== "searchResults"){
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
        } else {
            return (
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                          this.props.books.map(book =>
                          <li key={book.id}>
                            <Book
                                title={book.title}
                                bookId={book.id}
                                authors={book.authors}
                                cover={book.imageLinks['smallThumbnail']}
                                mover={this.props.mover}
                                shelfId={book.shelf || "none"}
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
}


export default Bookshelf
