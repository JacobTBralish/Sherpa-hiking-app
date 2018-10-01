import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVisitedTrail, incrementVisited } from '../../Redux/reducer';
import axios from 'axios';




class Visited extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount() {
            axios.get(`/api/visitedtrail/${this.props.match.params.id}`).then(response => {
      console.log('COMPONENTDIDMOUNT',response.data)
      this.props.getVisitedTrails(response.data)
    //   this.setState({visitCount:response.data.visitCount})
  }).catch(error => {
      console.log(error, 'Error getting visited trail.')
  })
    }

    handleVist(userId, visitCount){
        // console.log(userId)
        axios.post(`/api/visitedtrail/${this.props.match.params.id}`, {userId, visitCount}).then(response => {
            // console.log(response.data)
            // this.handleCount(visited);

            this.props.postVisitedTrail(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
        })
    }

    incrementVistCount(userId, visitCount){
        // console.log(userId)
        axios.post(`/api/visitedtrail/${this.props.match.params.id}`, {userId, visitCount}).then(response => {
            // console.log(response.data)
            // this.handleCount(visited);

            this.props.postVisitedTrail(response.data);
        }).catch(error => {
            console.log(error, 'Error with posting your review')
        })
    }

    // handleCount(visited, visitCount){
    //     if (visited === false){
    //         this.setState({visitCount:props.visitCount})
    //     }else {
    //         this.setState({visitCount:props.visitCount + 1})
    //     }
    // }

    render() { 
        let { user, chosenTrail, visitCount } = this.props;

        return ( 
            /* ternary needs to go here */
            <div><button onClick={() => {this.handleVist(user.id, visitCount)}}>Visited</button></div> 
         );
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        chosenTrail: state.chosenTrail,
        visitCount: state.visitCount,
    }
}

const mapDispatchToProps = {
    postVisitedTrail,
    incrementVisited
}

export default connect(mapStateToProps, mapDispatchToProps)(Visited);