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

    /*changeBookshelf = (bookId, e) => {
        const newShelf = e.target.value //caching to use asynchronously
        let updatedBooks = []

        BooksAPI.update({id: bookId}, newShelf).then(() => {
            //TODO: books newly added to a shelf from the search page need to be
            // *added* to this.state.books right here. Otherwise, the search
            // page re-renders without reflecting the updated shelf info :/

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
    }*/

    doLocalBookUpdates = (book, shelf) => {
        /* This function updates this.state.books to reflect shelf changes. It
        makes no external API calls. */
        let updatedBooks = []

        // books newly added to a shelf from the search page need to be
        // *added* to this.state.books right here. Otherwise, the search
        // page re-renders without reflecting the updated shelf info :/
        const oldBook = this.state.books.filter(b => b.id === book.id)
        if(oldBook.length === 0){
            // the book coming in is not in this.state.books already and we
            // need to add it to updatedBooks which will be used in setState
            book.shelf = shelf
            updatedBooks.push(book)
        }

        this.state.books.map(b => {
            if(b.id === book.id){
                const bookToUpdate = Object.assign({}, b, {shelf: shelf});
                updatedBooks.push(bookToUpdate)
            } else {
                updatedBooks.push(b)
            }
            return true
        })

        this.setState({books: updatedBooks})
        return true
    }

    changeBookshelf = (book, e) => {
        const newShelf = e.target.value //caching to use asynchronously
        // do local updates to books
        let updatedBooks = this.doLocalBookUpdates(book, newShelf)
        // update book on the server.
        BooksAPI.update({id: book.id}, newShelf)
    }

    componentDidMount(){
        BooksAPI.getAll().then(books => this.setState({books}))
    }

    render() {
        if('searchResults' in this.props){
            //searchResults come with no shelf info. So we add it for those
            //search results that are in this.state.books, since those all have
            //a shelf. We do this so in the search results page, the Bookmover
            //drop-down select list will have the right shelf selected.
            let resultBooks = []
            this.props.searchResults.forEach(resultBook => {
                let matchingStateBook = this.state.books.filter(b => b.id === resultBook.id)
                if(matchingStateBook.length === 1){
                    console.log("matchingStateBook: ", matchingStateBook)
                    resultBook.shelf = matchingStateBook[0].shelf
                    resultBooks.push(resultBook)
                } else {
                    resultBooks.push(resultBook)
                }
            })
            console.log("resultBooks: ", resultBooks)

            return(
              <div className="list-books-content">
                <div>
                    {
                        <Bookshelf
                            shortName="searchResults"
                            books={resultBooks}
                            mover={this.changeBookshelf}
                        />
                    }
                </div>
              </div>
          )
      } else {
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
}

export default Library
