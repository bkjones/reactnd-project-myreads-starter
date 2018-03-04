import React from 'react'
import './App.css'
import Library from './Library'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
    state = {
        searchResults: []
    }

    updateQuery = (query) => {
        if(query){
            BooksAPI.search(query).then((response) => {
                if(response.error){
                    this.setState({searchResults: []})
                } else {
                this.setState({searchResults: response})
                }
            })
        } else {
            this.setState({searchResults: []})
        }
    }

    clearQuery = () => {
        this.setState({query: ''})
    }


    render() {
        console.log("searchResults: ", this.state.searchResults)
        return (
            <div className="app">
                <Route path='/search' render={({history}) => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link
                                to='/'
                                className="close-search"
                            >Close</Link>
                            <div className="search-books-input">
                                <input
                                    type='text'
                                    placeholder='Search by title or author'
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.searchResults.map(book =>
                                    <li key={book.id}>{book.title}</li>
                                )}
                            </ol>
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
        )
    }
}

export default BooksApp
