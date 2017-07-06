import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import BookSummary from './BookSummary';

const getThumbnail = (book) => (book.imageLinks ? book.imageLinks.thumbnail : undefined);

class Search extends React.Component {
    static propTypes = {
        shelvedBooks: PropTypes.array.isRequired,
        onBookShelved: PropTypes.func.isRequired,
        maxResults: PropTypes.number
    };

    state = {
        searchResults: [],
        query: ''
    };

    constructor(props) {
        super(props);
        this.shelvedBooks = props.shelvedBooks.reduce((cache, b) => {
            cache[b.id] = b.shelf;
            return cache
        }, {});
    }
    
    handleQueryChanged = (query) => {
        this.setState({query});
        if (query !== '') {
            BooksAPI.search(query, this.props.maxResults || 10)
                .then(books => {
                    if (books.error) {
                        this.setState({searchResults: []});
                    }
                    else {
                        this.setState({searchResults: books.map(b => Object.assign(b, {shelf: this.shelvedBooks[b.id] || 'none'}))});
                    }
                });
        }
        else {
            this.setState({searchResults: []});
        }
    };

    handleBookShelved = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => this.props.onBookShelved(book, shelf));
        book.shelf = shelf;
        this.setState(state => ({
            searchResults: state.searchResults.map(b => b.id === book.id ? book : b)
        }));
    };

    render() {
        const {query, searchResults} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={event => this.handleQueryChanged(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map(book => (
                            <BookSummary
                                key={book.id}
                                title={book.title}
                                authors={book.authors || []}
                                coverUrl={getThumbnail(book)}
                                shelf={book.shelf}
                                onSelectShelf={(shelf) => this.handleBookShelved(book, shelf)}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;