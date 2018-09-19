import React, { Component } from 'react';
// import images from '../../photos/'

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className='homeContainer'>
                    <div className='mainImg' >
                        <img src={require('../../photos/mountain1.jpeg')}></img>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;