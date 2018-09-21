import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../Redux/reducer';


class Profile extends Component {
    state = { 
     }

componentDidMount() {
    this.props.getProfile(this.props.user.id);
}
    


    render() { 
        let { user, profile } = this.props;
        // console.log(profile)
        // let mappedProfile = profile ? profile.map((item, index) => {
        //     return <div>
        //         <img src={item.profilePic}></img>
        //         <p></p>
        //         <p></p>
        //         <p></p>
        //         <p></p>
        //     </div> 
        // }) : 'loading'
        // let { id } = req.params;
        return ( 
            <div>
                {user
                    ?<div>
                        <div>Name :{user.name}</div> 
                        {/* <div>{mappedProfile}</div>  */}
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
        profile: state.profile,
    }
}

const mapDispatchToProps = {
    getProfile,
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);