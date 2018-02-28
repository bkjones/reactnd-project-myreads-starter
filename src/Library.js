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

    changeBookshelf = (bookId, e) => {
        const newShelf = e.target.value;
        let updatedBook;

        // do the server-side update on the book
        BooksAPI.update({id: bookId}, newShelf).then(() => {
            const newBookShelves = Object.entries(this.state.bookshelves).map((entries) => {
            const [bookShelf, books] = entries;
            return {
                // pull out the updated book
                [bookShelf]: books.filter(book => {
                    if (book.id === bookId) {
                        // create the book object that'll go into the new shelf
                        updatedBook = Object.assign({}, book, {
                            shelf: newShelf
                        });
                        return false
                    } else {
                        return true;
                    }
                })
            }
            });

            // clean object used to update state
            const bookShelves = {};

            // take every object in the array
            for (const entry of newBookShelves) {
                const bookShelf = Object.keys(entry)[0];
                bookShelves[bookShelf] = entry[bookShelf];

                // put our updated book in the suitable shelf
                if (bookShelf === updatedBook.shelf) {
                    bookShelves[bookShelf].push(updatedBook)
                }
            }

            // update the state with the new bookShelf object.
            //This needs to happen inside of BooksAPI.update().then
            this.setState({ bookshelves: bookShelves })
        })
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

    foochangeBookshelf(bookId, e){
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
