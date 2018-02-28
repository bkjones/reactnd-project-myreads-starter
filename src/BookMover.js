import React, { Component } from 'react'

class BookMover extends Component{
/* This is the select list attached to each book. Its initial state is a prop.
    The value should be the bookshelf that the book attached to this select list
    is on. The onChange event handler for the select list is Library component,
    since the removal of a book from one shelf & appearance of same book on
    another is requires re-rendering of (potentially) two bookshelves.
*/
    render(){
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
