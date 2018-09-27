import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getProfile } from '../../Redux/reducer';
import './Profile.css';


class Profile extends Component {
    state = { 
        // profile: []
     }

componentDidMount() {
    // this.props.getProfile(this.props.match.params.id);
    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => { console.log(response.data)
        return this.props.getProfile(response.data)
    }).catch(error => {
            console.log(error, 'There was an error accessing your profile.')
        })
}
    


    render() { 
        let { user, profile } = this.props;

        console.log(profile)
        let mappedProfile = profile ? profile.map((item, index) => {
            console.log(item)
            return <div key={index}>
                <div>
                    <div className='personalContainer'>
                        <img id='profilePic' src={item.profilepic} alt={item.first_name}></img>
                    <div className='profileInfo'>
                        <h2 id='name'>{item.first_name} {item.last_name}</h2>
                        <h4>Location:</h4>
                        <p>{item.city}, {item.state}</p>
                        <h4>About {item.first_name}:</h4>
                        <p>{item.bio}</p>
                        <p>Experience with hiking: {item.experience}</p>
                    </div>
                    </div>
                </div>
            </div> 
        }) : 'loading'
        return ( 
            <div className='mainContainer'>
            <div className='profileContainer'>
                {user
                    ?<div>
                        <div>{mappedProfile}</div> 
                </div> : <div> </div>}
                { user && !user.profileFinished ?
                <Link to={`/profileEdit/${ user.id }`}><button>Edit Profile</button></Link>
                :
                <Link to={`/profileCreate`}><button>Create Profile</button></Link>
            }
            </div>
            </div>
         );
    }
}

const mapStateToProps= state => {
    return {
        user:state.user,
        profile: state.profile,
    }
}

const mapDispatchToProps = {
    getProfile
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);