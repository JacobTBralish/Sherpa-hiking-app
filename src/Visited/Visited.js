import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getVisited } from '../../Redux/reducer';
import { connect } from 'react-redux';



class Visited extends Component {

    componentDidMount(){
        axios.get(`/api/visitedtrail/${this.props.match.params.id}`).then(response => {
            this.props.getVisited(response.data)
        }).catch(error => {
            console.log(error, 'Error getting visited trail.')
        })
    }

    

    
    render() { 
        return ( 
            <div>
                visited
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{

    }
}

const mapDispatchToProps = {

}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visited));