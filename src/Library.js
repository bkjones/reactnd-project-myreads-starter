import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class Library extends Component {
    /*
    The Library component holds Bookshelf components, which hold Book components
    */
    state = {
        books: [],
        shelfShortNames: ['currentlyReading', 'wantToRead', 'read']
    }

    changeBookshelf = (bookId, e) => {
        const newShelf = e.target.value //caching to use asynchronously
        let updatedBooks = []

        BooksAPI.update({id: bookId}, newShelf).then(() => {
            this.state.books.map(book => {
                if(book.id === bookId){
                    const bookToUpdate = Object.assign({}, book, {shelf: newShelf});
                    updatedBooks.push(bookToUpdate)
                } else {
                    updatedBooks.push(book)
                }
                return true
            })
            this.setState({books: updatedBooks})
        })
    }

    componentDidMount(){
        /* Get all books & put them in the proper shelves. */
        BooksAPI.getAll().then(books => this.setState({books}))
    }

    render() {
        return(
          <div className="list-books-content">
            <div>
                {
                    this.state.shelfShortNames.map(shelf =>
                        <div key={shelf}>
                        <Bookshelf
                            shortName={shelf}
                            books={this.state.books}
                            mover={this.changeBookshelf}
                        />
                        </div>
                    )
                }
            </div>
          </div>
      )
    }
}

export default Library
