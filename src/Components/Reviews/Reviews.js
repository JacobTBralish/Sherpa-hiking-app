import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrailReviews } from '../../Redux/reducer';



class Reviews extends Component {

        componentDidMount() {console.log(this.props)
    axios.get(`/api/trailreview/${this.props.trailId}`).then(res => {
        this.props.getTrailReviews(res.data);
        console.log(res.data)
    }).catch(error => {
        console.log(error, 'Error getting trail.')
    })
}

    render() { 
        let{ trailReviews } = this.props;

        // let mappedTrailReviews = trailReviews ? trailReviews.map()


        return ( 
            <div>
                Reviews
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        trailReviews:state.trailReviews
    }
}
 
const mapDispatchToProps = {
    getTrailReviews
}

export default connect(mapStateToProps,mapDispatchToProps)(Reviews);