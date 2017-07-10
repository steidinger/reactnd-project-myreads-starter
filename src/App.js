import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves';
import Search from './Search';

class BooksApp extends React.Component {
    state = {
        books: [],
        query: '',
        searchResults: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        BooksAPI.getAll().then(books => this.setState(state => ({books})));
    };

    findShelf = ({id}) => (this.state.books.find(book => book.id === id) || {shelf: 'none'}).shelf;

    handleQueryChanged = (query) => {
        this.setState({query});
        if (query !== '') {
            BooksAPI.search(query, 20)
                .then(books => {
                    if (books.error) {
                        this.setState({searchResults: []});
                    }
                    else {
                        this.setState({searchResults: books.map(b => ({shelf: this.findShelf(b), ...b}))});
                    }
                });
        }
        else {
            this.setState({searchResults: []});
        }
    };

    handleBookShelved = (book, shelf) => {
        let bookIsVisible = this.state.books.find(b => b.id === book.id);
        BooksAPI.update(book, shelf)
            .then(json => {
                if (bookIsVisible) {
                    let wasUpdated = (json[shelf] || []).indexOf(book.id) !== -1;
                    if (wasUpdated) {
                        this.setState((state) => state.books.forEach(b => {
                            if (b.id === book.id) {
                                b.shelf = shelf;
                            }
                        }));
                    }
                    this.setState(state => ({
                        books: state.books.filter(book => book.shelf !== 'none'),
                        searchResults: state.searchResults.map(b => wasUpdated && b.id === book.id ? {shelf, ...book} : book)
                    }));
                }
                else {
                    this.loadBooks();
                }
            });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Switch>
                        <Route path='/search'>
                            <Search
                                onBookShelved={this.handleBookShelved}
                                onQueryChanged={this.handleQueryChanged}
                                query={this.state.query}
                                searchResults={this.state.searchResults}/>
                        </Route>
                        <Route path='/'>
                            <BookShelves books={this.state.books} onMoveToShelf={this.handleBookShelved} />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
