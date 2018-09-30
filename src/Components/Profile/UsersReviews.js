import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class UsersReviews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usersReviews: []
         }
    }

    componentDidMount(){
        axios.get(`/api/profileReviews/${this.props.user.id}`).then(response => {
            console.log(response.data)
            return this.setState({UsersReviews: response.data});
        }).catch(error => {
            console.log(error, 'Error in getting users reviews')
        })
    }

    render() { 
        let { usersReviews } = this.state
        console.log('usersReviews: ', usersReviews);

        let mappedUsersReviews = usersReviews.length ? usersReviews.map((review, index) => {
            return <div key={index}>
            <div>{review.trailName}</div>
            </div>
        }) : 'loading'

        return ( 
            <div>
                {mappedUsersReviews}
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UsersReviews);