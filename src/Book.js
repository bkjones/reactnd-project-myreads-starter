import React, { Component } from 'react'
import BookMover from './BookMover'

class Book extends Component {
    render(){
        console.log("Book.props: ", this.props)
        return(
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks["smallThumbnail"]})`}}></div>
                    <BookMover
                        book={this.props.book}
                        mover={this.props.mover}
                        selected={this.props.book.shelf || "none"}
                    />
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}

export default Book
