import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { postProfile, profileFinished } from '../../Redux/reducer'
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import './CreateProfile.css';
const request = require('superagent');

class CreateProfile extends Component {
    constructor() {
        super();
        this.state = {
            profilePic: [],
            picturePreview: [],
            bio: '',
            city: '',
            profileState: '',
            firstName: '',
            lastName: '',
            experience: '',
        }
    }
    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles[0].name);
        let profilePic=this.state.profilePic;
        if(profilePic.length < 1){
          profilePic.push(acceptedFiles);
          let picturePreview=[];
          for(var i in profilePic){
            picturePreview.push({profilePic})
          }
          this.setState({profilePic,picturePreview});
        }
        else{
          alert("You can only upload one profile image!")
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
        console.log(user.id, this.props.profile)
        return ( 
        <div>
            <body className='mainProfileContainer'>
                <div className='profileContainer'>
                    <div className='dropzoneContainer'>
                    <Dropzone value={profilePic} onDrop={(files) => this.onDrop(files)}>
                        <div>Drag and drop your profile picture here to upload</div>
                    </Dropzone>
            {/* <button label="Print Files" primary={true} onClick={(event) => this.handleClick(event)}>Upload image</button> */}
                </div>
                    <form className='profileinfoContainer'>
                        {/* <label>Profile URL</label>
                        <input placeholder='Picture URL' onChange={this.handleChange} className='ProfileInput' id='profilePic' value={profilePic}></input> */}
                        <label>Tell us about you</label>
                        <input placeholder='Bio' onChange={this.handleChange} className='ProfileInput' id='bio' value={bio}></input>
                        <label>What city and state do you live in?</label>
                        <input placeholder='City' onChange={this.handleChange} className='BioInput' id='city' value={city}></input>
                        <input placeholder='State' onChange={this.handleChange} className='ProfileInput' id='profileState' value={profileState}></input>
                        <label>What's your name?</label>
                        <input placeholder='First Name' onChange={this.handleChange} className='ProfileInput' id='firstName' value={firstName}></input>
                        <input placeholder='Last Name' onChange={this.handleChange} className='ProfileInput' id='lastName' value={lastName}></input>
                        <label>How much experience do you you have hiking?</label>
                        <select onChange={this.handleChange} id='experience' value={experience}>
                            <option value='Beginner'>Beginner</option>
                            <option value='Novice'>Novice</option>
                            <option value='Average'>Average</option>
                            <option value='Experienced'>Experienced</option>
                            <option value='Master'>Master</option>
                        </select>

                        <button onClick={() => {console.log(this.props.profile,'this is your profile pictures console.log'), postProfile( user.id ,profilePic, bio, city, profileState, firstName, lastName, experience )}}>Apply</button>
                        <Link to={`/profile/${user.id}`}><button>Save Changes</button></Link>
                    
                    </form>
                </div>
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