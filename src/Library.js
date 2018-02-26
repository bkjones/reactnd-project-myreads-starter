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
        bookshelves: {
            "currentlyReading": [],
            "wantToRead": [],
            "read": []
        }
    }
    componentDidMount(){
        /* Get all books & put them in the proper shelves. */
        let bookshelves = this.state.bookshelves
        BooksAPI.getAll().then(books => {
            for(let shelf in bookshelves){
                bookshelves[shelf] = books.filter(b => b.shelf === shelf)
            }
            this.setState({bookshelves})
        })
    }

    changeBookshelf(bookId, e){
        BooksAPI.update({id: bookId}, e.target.value).then(response =>
            this.setState({bookshelves: response})
        )
    }

    render() {
        return(
          <div className="list-books-content">
            <div>
              <Bookshelf
                key="wantToRead"
                shortName="wantToRead"
                name="Want to Read"
                books={this.state.bookshelves["wantToRead"]}
                mover={this.changeBookshelf}
              />
              <Bookshelf
                key="currentlyReading"
                shortName="currentlyReading"
                name="Currently Reading"
                books={this.state.bookshelves["currentlyReading"]}
                mover={this.changeBookshelf}
              />
              <Bookshelf
                key="read"
                shortName="read"
                name="Read"
                books={this.state.bookshelves["read"]}
                mover={this.changeBookshelf}
              />
            </div>
          </div>
      )
    }
}

export default Library
