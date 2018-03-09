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

    fillInBookAttributes = () => {
        /* if books are missing certain attributes, we fill them in using
        this.state.defaultValues

        Returns array 'books' which is used in render()
         */
        let books = []
        this.props.books.map(b => {
            let book = Object.assign({}, b)
            if(book.hasOwnProperty('authors') === false){
                book.authors = this.state.defaultValues.defaultAuthor
            } else if(book.hasOwnProperty('imageLinks') === false ){
                book.imageLinks = {}
                book.imageLinks.smallThumbnail = this.state.defaultValues.defaultImage
            } else if(book.hasOwnProperty('shelf') === false){
                book.shelf = "none"
            }
            books.push(book)
        })
        return books
    }

    render() {
        const populatedBooks = this.fillInBookAttributes()

        let books = []
        if(this.props.shortName !== "searchResults"){
            // it's not search results, so present only books on this shelf
            books = populatedBooks.filter(b => b.shelf === this.props.shortName)
        } else {
            // this is a search - present all books. No filter.
            books = populatedBooks
        }

        return (
            <div className="bookshelf">
            {
                this.props.shortName !== "searchResults" &&
                <h2 className="bookshelf-title">
                    {this.state.shelfNames[this.props.shortName]}
                </h2>
            }
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book =>
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    mover={this.props.mover}
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
