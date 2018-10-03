import React, { Component } from 'react';
import axios from 'axios';
import { getTrail, postVisitedTrail, getVisitedTrails } from '../../Redux/reducer';
import { connect } from 'react-redux';
import Reviews from '../Reviews/Reviews';
import Weather from '../Weather/Weather';
import './Trail.css';

class Trail extends Component {
    constructor(){
        super();
        this.state = {
            visitCount: 0,
            visited: false,
            toggleValue: false,
            isLoading: false,
            review: null,

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





    // IS THIS NEEDED ANYMORE?
    handleCount(visited, visitCount){
        if (visited === false){
            this.setState({visitCount:this.state.visitCount})
        }else {
            this.setState({visitCount:this.state.visitCount + 1})
        }
    }

    //CAN I INCREMENT INSIDE OF THIS?
    handleVist(userId, visitCount, visited){
        // console.log(userId)
        axios.post(`/api/visitedtrail/${this.props.match.params.id}`, {userId, visitCount}).then(response => {
            // console.log(response.data)
            this.handleCount(visited);

            this.props.postVisitedTrail(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
        })
    }

        toggleValueButton = () => {
        this.setState({toggleValue: !this.state.toggleValue})
    }


    render() { 

  
        let { chosenTrail, user, trailReviews } = this.props;
        let { visitCount, isLoading } = this.state;

        let showTrail = chosenTrail ? chosenTrail.map((trail, index) => {
           return (
            <div key={index} className='mainTrail'>
                <div className='trailContainer'>
                    <div className='imageContainer'><img className='trailImage' src={trail.imgMedium} alt={trail.name}></img></div>
                        <div className='infoContainer'>
                        <h6 >Name: {trail.name}</h6>
                        <h6>Location: {trail.location}</h6>
                        <h6>Rating: {trail.stars}/5</h6>
                        <h6>Difficulty: {trail.difficulty}</h6>
                        <h6>Length: {trail.length} miles</h6>
                        <h6>Starting elevation: {trail.low}</h6>
                        <h6>Highest elevation: {trail.high}</h6>
                        <h6>acent: {trail.high - trail.low}</h6>
                        <h6>Latitude: {trail.latitude}</h6>
                        <h6>Longitude: {trail.longitude}</h6>
                        <h6>Description: {trail.summary}</h6>
                        <div className='visitedButtonAnimation'><button onClick={() => {this.handleVist(user.id, visitCount)}} className='styledButton'><i class="fas fa-plus"></i></button> 
                        </div>
                        {visitCount === 1 ? `1 person has been to ${trail.name}!` : `${visitCount} people have been to ${trail.name}!`}
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }) : 'Loading...'
      
        return ( 
            <div>
            <div>{showTrail}</div>
            <div className='weather'>
            {chosenTrail.length ? <Weather  /> : ''}
            </div>
               <div className='displayedReviewsContainer'>


               <Reviews 
               className="displayedReviews" 
               trailId={this.props.trailId}
               title={this.props.title}
               reviewBody={this.props.reviewBody}
               rating={this.props.rating} 
               url={`/api/trail/${this.props.match.params.id}`} render ={(trailReviews) => (
                trailReviews.map(review => {
                    return<div className='reviewInfo'>
                    <h3 className='reviewText'>{review.title}</h3>
                    <h3 className='reviewText'>{review.time}</h3>
                    <h3 className='reviewText'>{review.rating}</h3>
                    <h3 className='reviewText'>{review.body}</h3>
                    <div className='trashButtonAnimation'>
                        <button className='trashButton' onClick={() => this.handleDelete(review.id)}><i class="fas fa-trash"></i></button>
                    </div>
                    </div>
               }))} />

                   
                   
               
                   </div>
                   
                </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        chosenTrail: state.chosenTrail,
        trailId: state.trailId,
        user:state.user
    }
    
}

const mapDispatchToProps = {
    getTrail,
    postVisitedTrail,
    getVisitedTrails

}


 
export default connect(mapStateToProps,mapDispatchToProps)(Trail);