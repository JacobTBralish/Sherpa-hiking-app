import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Reviews.css';
import { getTrailReviews, deleteReview, postTrailReview } from '../../Redux/reducer';
import PropTypes from 'prop-types';


class Reviews extends Component {
    constructor(props) {
        super(props);
            this.state = {
                title: '',
                reviewBody: '',
                rating: 0,
                isLoading: false

            }
    }
    
    componentDidMount() {
        this.setState({isLoading: true})
        axios.get(this.props.url).then(res => {
            this.setState({isLoading:false})
            this.props.getTrailReviews(res.data);
            console.log('res.data: ', res.data);
        }).catch(error => {
        console.log(error, 'Error getting trail.')
    })
}

    handlePost = ( trailName, trailImg, title, reviewBody, rating, userId, e ) => {
        console.log("work----------------------------------",trailName, trailImg, title, reviewBody, rating, userId, e)
        e.preventDefault();
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const time = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    //    console.log('DATE',time)
    //    console.log(title, time, reviewBody, rating, userId)

        axios.post(`/api/trail/${this.props.match.params.id}`, { trailName, trailImg, title, time, reviewBody, rating, userId} ).then(response => {
            console.log( response.data )
            this.props.postTrailReview(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
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

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
     }







    render() { 
    //     const data = this.props.trailReviews.length > 0 ? this.props.trailReviews[0]: {}
        
        let{ trailReviews, user, chosenTrail, render } = this.props;
        let { title, reviewBody, rating, isLoading } = this.state;
        // console.log(chosenTrail);


        // let mappedTrailReviews = trailReviews ? trailReviews.map((review, index) => {
        //     return (
        //         <div key={index} className='reviewInfo'>
        //             <p className='reviewText'>{review.name}</p>
        //             <p className='reviewText'>{review.title}</p>
        //             <p className='reviewText'>{review.rating}</p>
        //             <p className='reviewText'>{review.body}</p>
        //             <div className='trashButtonAnimation'>
        //                 <button className='trashButton' onClick={() => this.handleDelete(review.id)}><i class="fas fa-trash"></i></button>
        //             </div>
        //         </div>
        //     )
        // }) : 'loading...'


        return ( <div>
            <div>
            <div className='reviewFormContainer'>                         
                    <form className='reviewForm'>
                        <label>Title: </label>
                        <div>
                            <input onChange={this.handleChange} id='title'></input>
                        </div>
                    <label>Rating </label>
                    <select className='rating' id='rating' onChange={this.handleChange}>
                        <option>Select a rating</option>
                        <option value={1}>1</option>
                        <option value={1.5}>1.5</option>
                        <option value={2}>2</option>
                        <option value={2.5}>2.5</option>
                        <option value={3}>3</option>
                        <option value={3.5}>3.5</option>
                        <option value={4}>4</option>
                        <option value={4.5}>4.5</option>
                        <option value={5}>5</option>
                    </select>
                    <label>Review: </label>
                    <textarea id='reviewBody' className='reviewInput' onChange={this.handleChange}></textarea>

                        <div className='styledButtonAnimation'>
                        <button className='styledButton'  onClick={(e) => {this.handlePost( chosenTrail[0].name, chosenTrail[0].imgSmallMed, title, reviewBody, rating, user.id, e )}}><i class="far fa-paper-plane"></i></button>
                    </div>
                    {/* {user && user.profileFinished ? */}

                    {/* : */}
                    {/* // <button className='postButton'  onClick={() => {alert('You are not logged in! Please log in or create an account to post a review.')}}>Post Review</button> */}
                    
                </form>
            </div>
            </div>

            <div className='review'>

                <h1 className='reviewsTitle'>Trail Reviews</h1>
                <div>
                {(isLoading || !trailReviews)
                ?
                <div>Loading...</div>
                :
                render(trailReviews)
                }
            </div>
                {/* <div>{mappedTrailReviews}</div> */}
            </div>
        </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        trailReviews:state.trailReviews,
        trailId: state.trailId,
        user: state.user,
        chosenTrail: state.chosenTrail,

    }
}
 
const mapDispatchToProps = {
    getTrailReviews,
    deleteReview,
    postTrailReview,

}

Reviews.propTypes = {
    trailReviews: PropTypes.string
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Reviews));