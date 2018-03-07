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
        BooksAPI.getAll().then(books => this.setState({books}))
    }

    render() {
        if('searchResults' in this.props){
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
