import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { editProfile ,postProfilePic, postBio, postCity, postState, postExperience } from '../../Redux/reducer'
import { Link } from 'react-router-dom';

class EditProfile extends Component {




    render() { 
        let { profilePic, bio, city, profileState, experience } = this.props;
        return ( 
        <div>
            <div>
                <label>Profile Picture URL:</label>
                <input onChange={e => postProfilePic(e.target.value)} className='editProfileInput' value={profilePic}></input>
                <label>Bio:</label>
                <input onChange={e => postBio(e.target.value)} className='editProfileInput' value={bio}></input>
                <label>City:</label>
                <input onChange={e => postCity(e.target.value)} className='editProfileInput' value={city}></input>
                <label>State:</label>
                <input onChange={e => postState(e.target.value)} className='editProfileInput' value={profileState}></input>
                <label>Experience:</label>
                <select onChange={e => postExperience(e.target.value)} value={experience}>
                    <option value='Beginner'>Beginner</option>
                    <option value='Novice'>Novice</option>
                    <option value='Average'>Average</option>
                    <option value='Experienced'>Experienced</option>
                    <option value='Master'>Master</option>
                </select>

                <Link to='/profileEdit'><button onClick={() => {editProfile( profilePic, bio, city, profileState, experience )}}>Save Changes</button></Link>
            
            </div>
            Profile 1
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        profilePic: state.profilePic,
        bio: state.bio,
        city: state.city,
        profileState: state.profileState,
        experience: state.experience
    }
}

const mapDispatchToProps = {
    editProfile,
    postProfilePic,
    postBio,
    postCity,
    postState,
    postExperience
}
 
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);