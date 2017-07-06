import React from 'react'
import {BrowserRouter, Link} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
      BooksAPI.getAll().then(books => this.setState(state => ({books})));
  };

    handleBookShelved = (book, shelf) => {
        let bookIsVisible = this.state.books.find(b => b.id === book.id);
        BooksAPI.update(book, shelf)
            .then(json => {
                if (bookIsVisible) {
                    if ((json[shelf] || []).indexOf(book.id) !== -1) {
                        this.setState((state) => state.books.forEach(b => {
                            if (b.id === book.id) {
                                b.shelf = shelf;
                            }
                        }));
                    }
                    this.setState(state => state.books.filter(book => book.shelf !== 'none'));
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
                        <Search onBookShelved={this.handleBookShelved}/>
                    </Route>
                    <Route path='/'>
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    name="Currently Reading"
                                    books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                                    onMoveToShelf={this.handleBookShelved}
                                />
                                <BookShelf
                                    name="Want to Read"
                                    books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                                    onMoveToShelf={this.handleBookShelved}
                                />
                                <BookShelf
                                    name="Read"
                                    books={this.state.books.filter(book => book.shelf === 'read')}
                                    onMoveToShelf={this.handleBookShelved}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
  }
}

export default BooksApp
