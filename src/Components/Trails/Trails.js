import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrails } from '../../Redux/reducer'
// import Trail from '../Trails/Trail'
import { Link } from 'react-router-dom'

class Trails extends Component {


    componentDidMount() {
    axios.get(`https://www.hikingproject.com/data/get-trails?lat=${this.props.location.state.latitude}&lon=${this.props.location.state.longitute}&maxDistance=50&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`, {headers:{
        "Access-Control-Allow-Origin": "*"
    }}).then((res)=> {
        // console.log(this.props.location.state.latitude)
        this.props.getTrails(res.data)
        }).catch(error => {
            console.log(error, 'There was an error finding the trails requested.')
        })
    }
    render() { 
        let { trailsList } = this.props;

        let mappedTrails = trailsList ? trailsList.map((trail, index) => {
            return <div key={index}>{trail.location}</div>
        }) : 'loading'
        return ( 
        <div>
            <div>{mappedTrails}</div>
            <p></p>
            <p></p>
            <p></p>
        
        </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        trailsList: state.trailsList
    }
}

const mapDispatchToProps = {
    getTrails
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Trails);