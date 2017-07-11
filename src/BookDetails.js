import React from 'react'
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';

class BookDetails extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        back: PropTypes.string.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: '',
            authors: [],
            description: 'Loading...'
        };
    }

    componentWillReceiveProps = (newProps) => {
        console.log('old: ', this.props, ' new: ', newProps);
    };

    componentDidMount = () => {
        BooksAPI.get(this.state.id).then(book => {
            this.setState(state => ({
                title: book.title,
                authors: (book.authors || []).join(', '),
                description: book.description
            }));
        })
    };

    render = () => {
        console.log(this.props);
        let {title, authors, description} = this.state;
        let {back} = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <p>{authors}</p>
                <p>{description}</p>
                <Link to={back}>Back</Link>
            </div>
        );
    }
}

export default BookDetails;