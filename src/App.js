import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
        <div className="app">
            <Route path='/search' render={({history}) => (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                            to='/'
                            className="close-search"
                        >Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author"/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div>
            )}/>
            
            <Route exact path='/' render={({ history }) => (
                <div>
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className='list-library-contents'>
                        <Library />
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                </div>
            )}/>
        </div>
        )}
  }

export default BooksApp
