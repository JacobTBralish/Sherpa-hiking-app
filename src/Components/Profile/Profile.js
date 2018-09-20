import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Profile extends Component {
    state = {  }

componentDidMount() {
    this.props.getProfile();
}
    


    render() { 
        // let { id } = req.params;
        return ( 
            <div>
                {/* <Link to={`/profileEdit/${id}`}><button>Edit Profile</button></Link> */}
                Profile
            </div>
         );
    }
}
 
export default Profile;