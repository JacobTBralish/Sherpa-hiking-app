import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { postProfile, profileFinished } from '../../Redux/reducer'
import { Link } from 'react-router-dom';

class CreateProfile extends Component {
    constructor() {
        super();
        this.state = {
            profilePic: '',
            bio: '',
            city: '',
            profileState: '',
            firstName: '',
            lastName: '',
            experience: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() { 
        let { profilePic, bio, city, profileState, firstName, lastName, experience } = this.state;
        let { user } = this.props;
        return ( 
        <div>
            <body className='mainContainer'>
                <form>
                    <label>Profile URL</label>
                    <input placeholder='Picture URL' onChange={this.handleChange} className='ProfileInput' id='profilePic' value={profilePic}></input>
                    <label>Tell us about you</label>
                    <input placeholder='Bio' onChange={this.handleChange} className='ProfileInput' id='bio' value={bio}></input>
                    <label>What city and state do you live in?</label>
                    <input placeholder='City' onChange={this.handleChange} className='BioInput' id='city' value={city}></input>
                    <input placeholder='State' onChange={this.handleChange} className='ProfileInput' id='profileState' value={profileState}></input>
                    <label>What's your name?</label>
                    <input placeholder='First Name' onChange={this.handleChange} className='ProfileInput' id='firstName' value={firstName}></input>
                    <input placeholder='Last Name' onChange={this.handleChange} className='ProfileInput' id='lastName' value={lastName}></input>
                    <label>How experienced are you with hiking?</label>
                    <select onChange={this.handleChange} id='experience' value={experience}>
                        <option value='Beginner'>Beginner</option>
                        <option value='Novice'>Novice</option>
                        <option value='Average'>Average</option>
                        <option value='Experienced'>Experienced</option>
                        <option value='Master'>Master</option>
                    </select>

                    <button onClick={() => {postProfile( user.id ,profilePic, bio, city, profileState, firstName, lastName, experience )}}>Apply</button>
                    <Link to={`/profile/${user.id}`}><button>Save Changes</button></Link>
                
                </form>
            </body>
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = {
    postProfile,
    profileFinished
}
 
export default connect(mapStateToProps,mapDispatchToProps)(CreateProfile);