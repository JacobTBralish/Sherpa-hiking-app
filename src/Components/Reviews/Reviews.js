import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTrailReviews } from '../../Redux/reducer';
// import StarRating from 'react-star-rating'




class Reviews extends Component {

    
    componentDidMount() {/* console.log(this.props) */
        axios.get(`/api/trail/${this.props.trailId}`).then(res => {
            this.props.getTrailReviews(res.data);
            // console.log(res.data)
        }).catch(error => {
        console.log(error, 'Error getting trail.')
    })
    
}


    handleDelete(reviewId){
        console.log(reviewId)
        axios.delete(`/api/trail/${this.props.match.params.id}?reviewId=${reviewId}`).then((response) => {
            console.log('stupid')
            this.props.deleteReview(response.data)
        }).catch(error => {
                 console.log(error, 'Error on the front end delete')
         })
    }


//     handleRatingClick = (e, data) => {

//     alert('You left a ' + data.rating + ' star rating for ' + data.caption);

// }


    render() { 
        // console.log(this.props.match.params.id)
        const data = this.props.trailReviews.length > 0 ? this.props.trailReviews[0]: {}

        console.log(data.id)
        
        let{ trailReviews } = this.props;
        console.log(trailReviews)

        let mappedTrailReviews = trailReviews ? trailReviews.map((review, index) => {
            return (
                <div key={index}>
                    <p>{review.title}</p>
                    <p>{review.rating}</p>
                    <p>{review.body}</p>
                    <button onClick={() => this.handleDelete(data.id)}>Delete</button>
                </div>
            )
        }) : 'loading...'


        return ( 
            <div>
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
    getTrailReviews
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Reviews));