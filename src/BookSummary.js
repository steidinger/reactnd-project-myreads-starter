import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

const BookSummary = ({id, title, authors, shelf, coverUrl, onSelectShelf}) => {
    return <li>
        <div className="book">
            <div className="book-top">
                <Link to={`/book/${id}`}>
                <div className="book-cover" style={{backgroundImage: `url(${coverUrl}`}}></div>
                </Link>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    coverUrl: PropTypes.string.isRequired,
    onSelectShelf: PropTypes.func.isRequired
};

export default BookSummary;