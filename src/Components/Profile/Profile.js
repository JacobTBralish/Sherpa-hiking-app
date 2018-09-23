import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
// import { getProfile } from '../../Redux/reducer';


class Profile extends Component {
    state = { 
        profile: []
     }

componentDidMount() {
    // this.props.getProfile(this.props.match.params.id);
    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {/* console.log(response.data) */
        return this.setState({profile:response.data})}).catch(error => {
            console.log(error, 'There was an error accessing your profile.')
        })
}
    


    render() { 
        let { user/* , profile  */} = this.props;
        let { profile } = this.state;

        console.log(profile)
        let mappedProfile = profile ? profile.map((item, index) => {
            return <div>
                <img src={item.profilepic}></img>
                <h2>{item.first_name}</h2>
                <p></p>
                <p></p>
                <p></p>
            </div> 
        }) : 'loading'
        return ( 
            <div>
                {user
                    ?<div>
                        <div>Name :{user.name}</div> 
                        <div>{mappedProfile}</div> 
                        <div>
                     </div> 
                </div> : <div> </div>}
                <Link to={`/profileCreate`}><button>Create Profile</button></Link>
                Profile
            </div>
         );
    }
}

const mapStateToProps= state => {
    return {
        user:state.user,
        // profile: state.profile,
    }
}

const mapDispatchToProps = {
    // getProfile,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);