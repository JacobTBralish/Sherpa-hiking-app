import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logIn, logOut  } from '../../Redux/reducer';
import axios from 'axios';
import { connect } from 'react-redux'
import './Nav.css';


class Nav extends Component {

//the logIn in the axios is from the reducer
componentDidMount(){
    // this.props.logIn();
    axios.get('/api/user-data').then(response => {
        const user = response.data;
        this.props.logIn(user);
    })
}
    //this login goes to the onClick
    login = () => {
        console.log(process.env.REACT_APP_AUTH0_DOMAIN)
        // window.location.origin means 'this webside, whichever one im currently on ie localhost:3000'
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
        const scope = encodeURIComponent('openid profile email');
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
      }


    logout = () => {
        axios.post('/api/logout').then(res => {
            console.log(res.data)
            this.props.logOut(this.props.user);
        })
    }

    notLoggedIn = () => {
        alert("You are not logged in! Please log in to access your profile.")
    }


    render(){
        const { user } = this.props;
        // const { id } = req.params;


    return (
    <div className='NavBack'>
        <ul className='Navbar'>
            <button className='NavLink'><li><Link to='/' className='navButton' >Home</Link></li></button>
           
            <button className='NavLink'><li><Link to='/selectstate' className='navButton' >Find Trails</Link></li></button>

            {/*---------------------- fix ternary -------------------------*/}
            <button onClick={this.login} className='NavLink'><li>Login</li></button>
             <button onClick={this.logout}>Log Out</button>}
            <button className='NavLink'><li><Link to='/googlemaps' className='navButton' >Search the map</Link></li></button>
            {/* {!user ? */}
            <button className='NavLink'><li><Link to={`/profile`} className='navButton' >Profile</Link></li></button>
            {/* // : this.notLoggedIn()} */}
        </ul>
    </div>
    )
}
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


const mapDispatchToProps = {
    logIn,
    logOut
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);