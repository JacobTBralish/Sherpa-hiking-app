import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { editProfile } from '../../Redux/reducer'
// import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jacob-development/image/upload';



class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            profilePic:[],
            picturePreview: [],
            bio:'',
            city:'',
            profileState:'',
            lastName: '',
            experience:''
        }
    }
 
    handleImageUpload = (file) => {
        axios.get('/api/upload').then(response => {
            
           let formData = new FormData();
           formData.append('signature', response.data.signature)
           formData.append('api_key', '626685399682776');
           formData.append('timestamp', response.data.timestamp)
           formData.append('file', file[0]);

           axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => { console.log(response.data)
               this.setState({
                   profilePic: response.data.secure_url
               })
           })
        })
    }

    editProfileInfo = ( id, profilePic, bio, city, profileState, lastName, experience) => {
        this.props.editProfile( id, profilePic, bio, city, profileState, lastName, experience )
        this.props.history.push(`/profile/${this.props.user.id}`)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() { 
        let { profilePic, bio, city, profileState, lastName, experience } = this.state;
        let { user } = this.props;

        
        return ( 
<div>
            <body className='mainProfileContainer'>
                <div className='profileContainer'>
                    <div className='dropzoneContainer'>
                    <Dropzone multiple={false}
                    accept={'image/*'}
                    onDrop={this.handleImageUpload}
                    className='dropzone'>
                        <div>Drag and drop your profile picture here to upload</div>
                    </Dropzone>
            {/* <button label="Print Files" primary={true} onClick={(event) => this.handleClick(event)}>Upload image</button> */}
                </div>
                    <form className='profileinfoContainer'>
                        {/* <label>Profile URL</label>
                        <input placeholder='Picture URL' onChange={this.handleChange} className='ProfileInput' id='profilePic' value={profilePic}></input> */}
                        <label>Edit your bio:</label>
                        <input placeholder='Bio' onChange={this.handleChange} className='ProfileInput' id='bio' value={bio}></input>
                        <label>What city and state do you live in?</label>
                        <input placeholder='City' onChange={this.handleChange} className='BioInput' id='city' value={city}></input>
                        <input placeholder='State' onChange={this.handleChange} className='ProfileInput' id='profileState' value={profileState}></input>
                        <label>Edit your last name?</label>
                        <input placeholder='Last Name' onChange={this.handleChange} className='ProfileInput' id='lastName' value={lastName}></input>
                        <label>How much experience do you you have hiking?</label>
                        <select onChange={this.handleChange} id='experience' value={experience}>
                            <option value='Beginner'>Beginner</option>
                            <option value='Novice'>Novice</option>
                            <option value='Average'>Average</option>
                            <option value='Experienced'>Experienced</option>
                            <option value='Master'>Master</option>
                        </select>

                         <button onClick={() => {
                            this.editProfileInfo( user.id, profilePic, bio, city, profileState, lastName, experience )
                            }}>Save</button>
                    
                    </form>
                </div>
            </body>
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    editProfile
}
 
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);