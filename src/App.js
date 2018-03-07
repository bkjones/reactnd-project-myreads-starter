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

    clearSearchResults = () => {
        this.setState({searchResults: []})
    }

    render() {
        return (
            <div className="app">
                <Route path='/search' render={({history}) => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link
                                to='/'
                                className="close-search"
                                onClick={this.clearSearchResults}
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
                            <Library searchResults={this.state.searchResults} />
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
