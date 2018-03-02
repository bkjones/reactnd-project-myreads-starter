import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class Library extends Component {
    /*
    * The Library component will be composed of Bookshelf components.
    * It produces the main page view, and should be able to handle state
    * changes like moving a book from one bookshelf to another.
    *
    * When we create the search page, we can use a Library component on that
    * page as well, with only one bookshelf present to show search results.
    * That way, you can perform the same actions on a book from either screen.
    */
    state = {
        books: [],
    }

    changeBookshelf = (bookId, e) => {
        const newShelf = e.target.value
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
        //BooksAPI.getAll().then(books => console.log("BOOKS: ", books))
        BooksAPI.getAll().then(books => this.setState({books}))
    }

    getUniqueShelfNames = (books) => {
        console.log("books in getUniqueShelfNames: ", books)
        let shelfNames = new Set()
        books.map(book => shelfNames.add(book.shelf))
        console.log("shelfNames: ", shelfNames)
        return shelfNames
    }

    render() {
        const shelfNames = this.getUniqueShelfNames(this.state.books)
        return(
          <div className="list-books-content">
            <div>
                {
                    Array.from(shelfNames).map(shelf =>
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
