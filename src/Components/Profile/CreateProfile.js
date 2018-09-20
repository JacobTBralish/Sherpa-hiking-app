import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { postProfile ,postProfilePic, postBio, postCity, postState, postFirstName, postLastName, postExperience } from '../../Redux/reducer'
import { Link } from 'react-router-dom';

class CreateProfile extends Component {




    render() { 
        let { profilePic, bio, city, profileState, firstName, lastName, experience } = this.props;
        return ( 
        <div>
            <div>
                <input onClick={e => postProfilePic(e.target.value)} className='ProfileInput' value={profilePic}></input>
                <input onClick={e => postBio(e.target.value)} className='ProfileInput' value={bio}></input>
                <input onClick={e => postCity(e.target.value)} className='ProfileInput' value={city}></input>
                <input onClick={e => postState(e.target.value)} className='ProfileInput' value={profileState}></input>
                <input onClick={e => postFirstName(e.target.value)} className='ProfileInput' value={firstName}></input>
                <input onClick={e => postLastName(e.target.value)} className='ProfileInput' value={lastName}></input>
                <optgroup onClick={e => postExperience(e.target.value)} value={experience}>
                    <option>Beginner</option>
                    <option>Novice</option>
                    <option>Average</option>
                    <option>Experienced</option>
                    <option>Master</option>
                </optgroup>

                <Link to='/profile'><button onClick={() => {postProfile( profilePic, bio, city, profileState, firstName, lastName, experience )}}></button></Link>
            
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
        firstName: state.firstName,
        lastName: state.lastName,
        experience: state.experience
    }
}

const mapDispatchToProps = {
    postProfile,
    postProfilePic,
    postBio,
    postCity,
    postState,
    postFirstName,
    postLastName,
    postExperience
}
 
export default connect(mapStateToProps,mapDispatchToProps)(CreateProfile);