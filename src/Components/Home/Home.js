import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css'

class Home extends Component {
    state = {  }
    render() { 
        let { user, profile } = this.props;
        return ( 
            <div className='mainContainer'>
                <div className='homeContainer'>
                    <div >
                    {user 
                        ?<div  className='login-display'>
                            <div id='welcomeText'>Welcome to Sherpa {profile.firstname}</div> 
                            <div> </div> 
                            <div>
                        </div> 
            
            </div> : <div> </div>
                } 
                        <div className='imgContainer' >
                            {/* <img id='homeImage' alt='Sherpa Hiking' src={mainImage}></img> */}
                            <div className='overlay'></div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps= state => {
    return {
        user:state.user,
        profile: state.profile
    }
}
 
export default connect(mapStateToProps)(Home);