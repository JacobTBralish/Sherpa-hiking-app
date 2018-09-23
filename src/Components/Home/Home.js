import React, { Component } from 'react';
import { connect } from 'react-redux';
import mainImage from '../../photos/appalachiantrail.jpg'

class Home extends Component {
    state = {  }
    render() { 
        let { user } = this.props;
        return ( 
            <div className='mainContainer'>
                <div className='homeContainer'>
                    <div >
                    {user 
                        ?<div>
                            <div>Name :{user.name}</div> 
                            <div>Email :{user.email}</div> 
                            <div>
                </div> 
            
            </div> : <div> You need to log in</div>
                } 
                        <div className='imgContainer' >
                            <img id='homeImage' alt='Sherpa Hiking' src='https://s3.amazonaws.com/whole-journeys-assets/production/uploads/MaroonBells_900.jpg'></img>
                        </div>
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