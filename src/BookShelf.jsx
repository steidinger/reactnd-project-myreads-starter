import React from 'react'
import PropTypes from 'prop-types';
import BookSummary from './BookSummary';

const BookShelf = ({books, name, onMoveToShelf}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <BookSummary
                            key={book.id}
                            title={book.title}
                            authors={book.authors}
                            shelf={book.shelf}
                            coverUrl={book.imageLinks.thumbnail}
                            onSelectShelf={(shelf) => onMoveToShelf(book, shelf)}
                        />))}
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveToShelf: PropTypes.func
};

BookShelf.defaultProps = {
    onMoveToShelf: () => {}
};

export default BookShelf;