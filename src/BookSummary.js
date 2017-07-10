import React from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

const BookSummary = ({title, authors, shelf, coverUrl, onSelectShelf}) => {
    return <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{backgroundImage: `url(${coverUrl}`}}></div>
                <BookShelfChanger
                    currentShelf={shelf}
                    onSelect={onSelectShelf}
                />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(", ")}</div>
        </div>
    </li>
};

BookSummary.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    coverUrl: PropTypes.string.isRequired,
    onSelectShelf: PropTypes.func.isRequired
};

export default BookSummary;