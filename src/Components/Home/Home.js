import React, { Component } from 'react';
import { connect } from 'react-redux';
// import images from '../../photos/'

class Home extends Component {
    state = {  }
    render() { 
        let { user } = this.props;
        return ( 
            <div>
                <div className='homeContainer'>
                {user 
                    ?<div>
                        <div>Name :{user.name}</div> 
                        <div>Email :{user.email}</div> 
                        <div>
               </div> 
           
           </div> : <div> You need to log in</div>
            } 
                    <div className='mainImg' >
                        <img alt='Sherpa Hiking' src={require('../../photos/mountain1.jpeg')}></img>
                    </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps= state => {
    return {
        user:state.user
    }
}
 
export default connect(mapStateToProps)(Home);