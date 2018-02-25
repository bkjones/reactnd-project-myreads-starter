import React, { Component } from 'react'

class BookMover extends Component{
/* This is the select list attached to each book. Its initial state should be
passed in via a prop. The value should be the bookshelf the book attached to this
select list is on. The onChange event on the select list will need to be handled
by the Library component, since the removal of a book from one shelf & appearance
of same book on another is going to require a re-rendering of two bookshelves. */
    render(){
        console.log("Bookmover props", this.props)
        return(
            <div className="book-shelf-changer">
              <select value={this.props.selected} onChange={this.props.mover}>
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
