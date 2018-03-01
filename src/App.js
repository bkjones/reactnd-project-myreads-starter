import React from 'react'
import './App.css'
import Library from './Library'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query })
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        let searchResults = []
        let query = this.state.query
        if (query){
            BooksAPI.search(query).then((response) => {
                console.log("Search response: ", response)
                searchResults = response
            })
        } else {
            searchResults = []
        }
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
                                    value={query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {searchResults.map(book =>
                                    <li>{book}</li>
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
