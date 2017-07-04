import React from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

const BookSummary = ({title, authors, shelf, coverUrl, onSelectShelf}) => {
    const style = {
        width: 140,
        height: 200,
        backgroundImage: `url(${coverUrl}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center'
    };
    return <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={style}></div>
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
    coverUrl: PropTypes.string.isRequired
};

export default BookSummary;