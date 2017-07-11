import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

const shelves = [
    {label: 'Currently Reading', value: 'currentlyReading'},
    {label: 'Want to Read', value: 'wantToRead'},
    {label: 'Read', value: 'read'}
];

class BookShelves extends React.Component {

    componentDidMount() {
        this.props.onInit();
    }

    render() {
        let {onMoveToShelf, books} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(({label, value}) => (
                            <BookShelf
                                key={value}
                                name={label}
                                books={books.filter(book => book.shelf === value)}
                                onMoveToShelf={onMoveToShelf}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>

        )
    }
}

BookShelves.propTypes = {
    books: PropTypes.array.isRequired,
    onMoveToShelf: PropTypes.func.isRequired,
    onInit: PropTypes.func
};

BookShelves.defaultProps = {
    onInit: () => {}
};

export default BookShelves;