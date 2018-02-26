import React, { Component } from 'react'

class BookMover extends Component{
/* This is the select list attached to each book. Its initial state should be
passed in via a prop. The value should be the bookshelf the book attached to this
select list is on. The onChange event on the select list will need to be handled
by the Library component, since the removal of a book from one shelf & appearance
of same book on another is going to require a re-rendering of two bookshelves.

A challenge here is that the select list must show the same state whether we're
in a bookshelf or in the search page. I haven't figured that out yet, but regardless,
it seems this will need to be attached to a book, but be manipulated at the library level.*/
    render(){
        console.log("Bookmover props", this.props)
        return(
            <div className="book-shelf-changer">
              <select value={this.props.selected} onChange={(e) => this.props.mover(this.props.bookId, e)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
        )
    }
}

export default BookMover
