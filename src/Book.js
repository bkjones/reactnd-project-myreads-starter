import React, { Component } from 'react'
import BookMover from './BookMover'

class Book extends Component {
    render(){
        console.log("Book.props: ", this.props)
        return(
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.cover})`}}></div>
                    <BookMover
                        mover={this.props.mover}
                        bookId={this.props.bookId}
                        selected={this.props.shelfId}
                    />
              </div>
              <div className="book-title">{this.props.title}</div>
              <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }
}

export default Book
