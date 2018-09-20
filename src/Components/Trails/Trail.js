import React, { Component } from 'react';
import axios from 'axios';
import { getTrail } from '../../Redux/reducer';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';

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
        // let { trailsList, chooseTrail } = this.props;

        // let mappedTrails = trailsList ?  trailsList.map((trail, index) => {
        //     return 
        //      <div key={index}>
            
        //     <img src={trail.imgSmall} alt={trail.name}></img>
        //     <h4>{trail.name}</h4>
        //     <h6>Length: {trail.length + ' miles'}</h6>
        //     <h6>{trail.location}</h6>
            
        //     </div>
        // }) : 'loading'

        let { chosenTrail } = this.props;

        let showTrail = chosenTrail.map((trail, index) => {
            return <div key={index}>
            
            <img src={trail.imgMedium} alt={trail.name}></img>
            <p>Name: {trail.name}</p>

            </div>
        })

        return ( 
            <div>
                <p>{showTrail}</p>
                {/* <p>{this.props.trail.location}</p> */}
                <h1>Hello</h1>
                <p></p>
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