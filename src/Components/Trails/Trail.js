import React, { Component } from 'react';
import axios from 'axios';
import { getTrail, postTrailReview } from '../../Redux/reducer';
import { connect } from 'react-redux';
import Reviews from '../Reviews/Reviews';
// import { Link } from 'react-router-dom';
import './Trail.css';

class Trail extends Component {
    constructor(){
        super();
        this.state = {
            toggleView: false,
            title: '',
            reviewBody: '',
            rating: 0
            
        }
    }

componentDidMount() {
    axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then(res => {
        this.props.getTrail(res.data.trails);
        // console.log(res.data.trails)
    }).catch(error => {
        console.log(error, 'Error getting trail.')
    })

    }


    handleChange = (event) => {
       this.setState({
           [event.target.id]: event.target.value
       })
    }


    // INSERT INTO trail_reviews (review_trail_id, title, time, body, rating, author_id) VALUES
    // ($1, $2, $3, $4, $5, $6);
    // SELECT * FROM trail_reviews where review_trail_id = $1;

    handlePost = ( title, reviewBody, rating, userId ) => {
        console.log("work----------------------------------")

    const date = new Date();
       const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
       const time = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
       console.log('DATE',time)
       console.log(title, time, reviewBody, rating, userId)

        axios.post(`/api/trail/${this.props.match.params.id}`, { title, time, reviewBody, rating, userId} ).then(response => {
            console.log( response.data )
            this.props.postTrailReview(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
        })
}

    handleVist(userId){
        axios.post(`/api/trail/${this.props.match.params.id}`, userId).then(response => {
            this.props.visitedTrail(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
        })
    }


    render() { 
       let style = {
            padding: '4px',
        }
        const data = this.props.chosenTrail.length > 0 ? this.props.chosenTrail[0]: {}

        console.log(data)

        console.log('this.props', this.props)
        let { chosenTrail, user } = this.props;
        let { title, rating, reviewBody} = this.state;

        let showTrail = chosenTrail ? chosenTrail.map((trail, index) => {
           return (
            <div key={index} className='mainContainer'>
                <div className='trailContainer'>
                    <div className='imageContainer'><img className='trailImage' src={trail.imgMedium} alt={trail.name}></img></div>
                        <div className='infoContainer'>
                        <h6>Name: {trail.name}</h6>
                        <h6>Location: {trail.location}</h6>
                        <h6>Rating: {trail.stars}/5</h6>
                        <h6>Difficulty: {trail.difficulty}</h6>
                        <h6>Length: {trail.length} miles</h6>
                        <h6>Starting elevation: {trail.low}</h6>
                        <h6>Highest elevation: {trail.high}</h6>
                        <h6>acent: {trail.acent}</h6>
                        <h6>Latitude: {trail.latitude}</h6>
                        <h6>Longitude: {trail.longitude}</h6>
                        <h6>Description: {trail.summary}</h6>
                        <button onClick={() => {this.handleVist(trail.id)}}>Visited</button>
                    </div>
                </div>
            </div>
            )
        }) : 'Loading...'

        // let mapped
        return ( 
            <div>
               <div>{showTrail}</div>
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
                    <input id='reviewBody' className='reviewInput' onChange={this.handleChange}></input>
                    
                    <button className='postButton'  onClick={() => {this.handlePost( title, reviewBody, rating, user.id )}}>Post Review</button>
                </form>
               <div className='displayedReviewsContainer'>

                   <Reviews className="displayedReviews" trailId={this.props.trailId} />
                   
               
                   </div>
                   
            </div>
                </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        chosenTrail: state.chosenTrail,
        trailId: state.trailId,
        trailReviews: state.trailReviews,
        user:state.user
    }
    
}

const mapDispatchToProps = {
    getTrail,

    postTrailReview

}
 
export default connect(mapStateToProps,mapDispatchToProps)(Trail);