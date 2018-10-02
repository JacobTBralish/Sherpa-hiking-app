import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getProfile } from '../../Redux/reducer';
import Reviews from './UsersReviews';
import './Profile.css';


class Profile extends Component {
    state = { 

     }

componentDidMount() {
     this.props.getProfile(this.props.match.params.id)

}
    


    render() { 
        let { user, profile } = this.props;
        // const profileInfo = profile.length > 0 ? profile[0]: {}

        console.log('This is data')
        let mappedProfile = profile ? profile.map((item, index) => {
            console.log(item)
            return <div key={index} className='outerPersonalContainer'>
                    <div className='personalContainer'>
                        <h2 id='name'>{item.first_name} {item.last_name}</h2>
                        <img id='profilePic' src={item.profilepic} alt={item.first_name}></img>
                    <div className='profileInfo'>
                        <h4>Location:</h4>
                        <p>{item.city}, {item.state}</p>
                        <h4>About {item.first_name}:</h4>
                        <p>{item.bio}</p>
                        <p>Experience with hiking: {item.experience}</p>
                        <div className='editButtonAnimation'> 
                                <Link className='editButton' to={`/profileEdit/${ this.props.match.params.id }`}><i className="far fa-edit"></i></Link>
                        </div>
                    
                      
                    </div>
                    </div>
            </div> 
        }) : 'loading'
        return ( 
            <div className='mainContainer'>
                <div className='profileContainer'>
                    <div>{mappedProfile}</div> 
                    {!user.profilefinished
                        ?<div>
                            <Link to={`/profileCreate/${ this.props.match.params.id }`}><button>Create Profile</button></Link>
                        </div> : ''}

           
            </div>
                <div className='mainReviewsContainer'>
                    <div className='usersReviewsContainer'>
                        {profile.length ? <Reviews /> : ''}
                    </div>
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