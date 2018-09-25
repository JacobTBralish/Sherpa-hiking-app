import React, { Component } from 'react';
import axios from 'axios';
import { getTrail } from '../../Redux/reducer';
import { connect } from 'react-redux';
import Reviews from '../Reviews/Reviews';
// import { Link } from 'react-router-dom';
import './Trail.css';

class Trail extends Component {

componentDidMount() {console.log('hello')
    axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.trailId}&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then(res => {
        this.props.getTrail(res.data.trails);
        console.log(res.data.trails)
    }).catch(error => {
        console.log(error, 'Error getting trail.')
    })
}

    render() { 

        let { chosenTrail } = this.props;

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
                        <button></button>
                    </div>
                </div>
            </div>
            )
        }) : 'Loading...'

        return ( 
            <div>
               <div>{showTrail}</div>
               <div><Reviews trailId={this.props.trailId} /></div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        chosenTrail: state.chosenTrail,
        trailId: state.trailId
    }
    
}

const mapDispatchToProps = {
    getTrail
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Trail);