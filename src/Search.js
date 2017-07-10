import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BookSummary from './BookSummary';

const getThumbnail = (book) => (book.imageLinks ? book.imageLinks.thumbnail : undefined);

const Search = ({onBookShelved, onQueryChanged, query, searchResults}) => {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={event => onQueryChanged(event.target.value)}
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
                                onSelectShelf={(shelf) => onBookShelved(book, shelf)}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
};

Search.propTypes = {
    query: PropTypes.string.isRequired,
    searchResults: PropTypes.array.isRequired,
    onQueryChanged: PropTypes.func.isRequired,
    onBookShelved: PropTypes.func.isRequired
};

export default Search;