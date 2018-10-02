import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Reviews.css';
import { getTrailReviews, deleteReview } from '../../Redux/reducer';
// import StarRating from 'react-star-rating'




class Reviews extends Component {

    
    componentDidMount() {/* console.log(this.props) */
        axios.get(`/api/trail/${this.props.match.params.id}`).then(res => {
            this.props.getTrailReviews(res.data);
            console.log('res.data: ', res.data);
        }).catch(error => {
        console.log(error, 'Error getting trail.')
    })
    
}


    handleDelete = (reviewId) => {
        console.log(reviewId)
        axios.delete(`/api/trail/${this.props.match.params.id}?reviewId=${reviewId}`).then((response) => {
            this.props.deleteReview(response.data)
        }).catch(error => {
                 console.log(error, 'Error on the front end delete')
         })
    }





    render() { 
        // console.log(this.props.match.params.id)
    //     const data = this.props.trailReviews.length > 0 ? this.props.trailReviews[0]: {}
    //  console.log(data.id);
        // console.log(data.id)
        
        let{ trailReviews } = this.props;
        // console.log(trailReviews)

        let mappedTrailReviews = trailReviews ? trailReviews.map((review, index) => {
            return (
                <div key={index} className='reviewInfo'>
                    <p className='reviewText'>{review.name}</p>
                    <p className='reviewText'>{review.title}</p>
                    <p className='reviewText'>{review.rating}</p>
                    <p className='reviewText'>{review.body}</p>
                    <div className='trashButtonAnimation'>
                        <button className='trashButton' onClick={() => this.handleDelete(review.id)}><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            )
        }) : 'loading...'


        return ( 
            <div className='review'>
                <h1 className='reviewsTitle'>Trail Reviews</h1>
                <div>{mappedTrailReviews}</div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        trailReviews:state.trailReviews,
        trailId: state.trailId
    }
}
 
const mapDispatchToProps = {
    getTrailReviews,
    deleteReview
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Reviews));