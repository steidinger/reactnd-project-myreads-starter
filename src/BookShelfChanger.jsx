import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = ({currentShelf, onSelect}) => {
    return (
        <div className="book-shelf-changer">
            <select onChange={(event) => onSelect(event.target.value)} value={currentShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

BookShelfChanger.propTypes = {
    currentShelf: PropTypes.string,
    onSelect: PropTypes.func
};

BookShelfChanger.defaultProps = {
    currentShelf: 'none',
    onSelect: () => {}
};

export default BookShelfChanger;