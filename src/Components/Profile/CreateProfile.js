import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { postProfile } from '../../Redux/reducer'
import Dropzone from 'react-dropzone';
import './CreateProfile.css';
import Axios from 'axios';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/jacob-development/image/upload';

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


     handleImageUpload = (file) => {
         Axios.get('/api/upload').then(response => {
             
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


    postProfileInfo = (id, profilePic, bio, city, profileState, firstName, lastName, experience) => {
        this.props.postProfile( id, profilePic, bio, city, profileState, firstName, lastName, experience )
        this.props.history.push(`/profile/${this.props.user.id}`)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() { 

        let { profilePic, bio, city, profileState, firstName, lastName, experience } = this.state;
        let { user } = this.props;
        const data = this.props.user.length > 0 ? this.props.user[0]: {}
        console.log('user: ', user);
        console.log(profilePic, this.props.profile)
        
        return ( 
        <div className='mainCreateContainer'>
            {/* <body className='mainContainer'> */}
                <div className='personalCreateContainer'>
                    <form className='createProfileInfoContainer'>
                    <div className='dropzoneContainer'>
                    <Dropzone multiple={false}
                    accept={'image/*'}
                    onDrop={this.handleImageUpload}
                    className='dropzone'>
                        <div>Drag and drop your profile picture here to upload</div>
                    </Dropzone>
                </div>
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

                        <button onClick={() => {
                            this.postProfileInfo( user.id ,profilePic, bio, city, profileState, firstName, lastName, experience )
                            }}>Save</button>
                        {/* <Link to={`/profile/${user.id}`}><button>Save Changes</button></Link> */}
                    
                    </form>
                </div>
            {/* </body> */}
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        profile:state.profile
    }
}

const mapDispatchToProps = {
    postProfile,
    // profileFinished
}
 
export default connect(mapStateToProps,mapDispatchToProps)(CreateProfile);