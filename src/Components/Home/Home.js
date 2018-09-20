import React, { Component } from 'react';
inport 
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
               <img src={user.picture} alt={user.name}></img></div> 
               <button onClick={this.props.logOut}>Logout</button>
           
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
 
export default connect(mapStateToProps)(Home);