import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UsersReviews.css'
import Pagination from 'react-js-pagination';
import axios from 'axios';


class UsersReviews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usersReviews: [],
            activePage:1,
            itemsPerPage: 3
         }
    }

    componentDidMount(){
        axios.get(`/api/profileReviews/${this.props.user.id}`).then(response => {
            console.log(response.data)
            return this.setState({usersReviews: response.data});
        }).catch(error => {
            console.log(error, 'Error in getting users reviews')
        })
    }
    
    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

    render() { 
        let { usersReviews, itemsPerPage, activePage } = this.state;
        // let { chosenTrail } = this.props;

        console.log('usersReviews: ', usersReviews);

        let activePageIndex = parseInt(activePage, 10);
        let itemsPerPageIndex = parseInt(itemsPerPage, 10);
        
        let indexOfLastReview = activePageIndex * itemsPerPageIndex;
        let indexOfFirstReview = indexOfLastReview - itemsPerPageIndex;
        let renderedReviews = usersReviews.slice(indexOfFirstReview, indexOfLastReview);



        let mappedUsersReviews = renderedReviews.length ? renderedReviews.map((review, index) => {
            return <div key={index} className='trailReview'>
                <div>
                    <div className='trailTitle'><Link to={{ pathname:`/trail/${review.review_trail_id}`}}>{review.trail_name}</Link></div>
                    <img className='trailReviewImage' src={review.trail_img} alt={review.trail_name}></img>
                </div>
            <p className='trailReviewBody'>{review.body}</p>
            </div>
        }) : 'loading'

        return ( 
            <div>
                {mappedUsersReviews}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={3}
                    totalItemsCount={UsersReviews.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chosenTrail: state.chosenTrail,
    }
}
export default connect(mapStateToProps)(UsersReviews);