import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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

  handleSearchClosed = () => {
      this.setState({showSearchPage: false});
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <Search onClose={this.handleSearchClosed} onBookShelved={this.handleBookShelved}/>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
