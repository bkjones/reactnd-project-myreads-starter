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
        /* If there are no books, get all books & put them in the proper shelves. */
        let bookshelves = Object.assign({}, this.state.bookshelves)
        let bookshelvesPopulated = false
        for(let s in bookshelves){
            if(bookshelves[s].length > 0){
                bookshelvesPopulated = true
                return;
            }
        }

        if(!bookshelvesPopulated){
            BooksAPI.getAll().then(books => {
                for(let shelf in bookshelves){
                    bookshelves[shelf] = books.filter(b => b.shelf === shelf)
                }
                console.log("\"this\" is set to: ", this)
                this.setState({bookshelves})
            })
        }
    }

    changeBookshelf = (bookId, e) => {
        const newShelf = e.target.value
        this.setState((state) => {
            BooksAPI.update({id: bookId}, newShelf).then((response) => {
                for(var shelf in state.bookshelves){
                    for(var idx=0; idx < state.bookshelves[shelf].length; idx++){
                        if(state.bookshelves[shelf][idx].id === bookId){
                            const bookToMove = state.bookshelves[shelf].splice(idx, 1)[0]
                            state.bookshelves[newShelf].push(bookToMove)
                            console.log("Bookshelves updated: ", state.bookshelves)
                            break
                        }
                    }
                }
            }).catch(err => console.log("Error! ", err))
            console.log("Changing bookshelves in this.state: ", state.bookshelves)
            return {bookshelves: state.bookshelves}
        })
    }
    changeBookshelfBak = (bookId, e) => {
        const newShelf = e.target.value
        let bookshelves = Object.assign({}, this.state.bookshelves)
        BooksAPI.update({id: bookId}, newShelf).then((response) => {
            for(var shelf in bookshelves){
                for(var idx=0; idx < bookshelves[shelf].length; idx++){
                    if(bookshelves[shelf][idx].id === bookId){
                        const bookToMove = bookshelves[shelf].splice(idx, 1)[0]
                        bookshelves[newShelf].push(bookToMove)
                        console.log("Bookshelves updated: ", bookshelves)
                        break
                    }
                }
            }
            console.log(this)
            this.setState((state) => ({bookshelves: bookshelves}));
        }).catch(err => console.log("Error! ", err))
    }

    render() {
        console.log("Library state: ", this.state)
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
