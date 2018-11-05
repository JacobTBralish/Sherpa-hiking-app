import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logIn, logOut  } from '../../Redux/reducer';
import axios from 'axios';
import { connect } from 'react-redux'
// import logo from '../../photos/edited-sherpa.png';
import './Nav.css';


class Nav extends Component {
    constructor(props){
        super(props);
        this.state ={
            redirect: false,
            toggle: false
        }
    }

//the logIn in the axios is from the reducer
componentDidMount(){
    axios.get('/api/user-data').then(response => {
        const user = response.data;
        this.props.logIn(user);
        // if (user && !user.profileFinished){
        // alert('Please complete your profile!')}
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
        }).catch(error => {
            console.log(error, 'There was an error logging out in Nav');
        })
    }

    notLoggedIn = () => {
        alert("You are not logged in! Please log in to access your profile.")
    }

    render(){
        const { user } = this.props;

    return (
        <header className={this.state.toggle ? 'show' : 'hide'}>
    <div className='NavBack'>
    <button className='hamburgerButton' onClick={() => {console.log(this.state.toggle); this.setState({toggle: !this.state.toggle})}}>
       {/* <div id='hamburger'>
            <div id='bartop'></div>
            <div id='barmiddle'></div>
            <div id='barbottom'></div>
        </div> */}
    Sherpa</button>
    <nav className='NavBack'>

                    {/* </nav> */}
                <div className='userNameBox'>{user && user.profileFinished ? `Hello ${user.firstname }!` : '' }</div>
    {/* <img className='logo' src={logo}></img> */}

    <div className='webTitle'><h1>SHERPA</h1></div>
        <div className='buttonContainer'>
            {/* <div className='Navbar'> */}
                <button id='homeButton' className='navButton'><Link to='/'  >Home</Link></button>
            
                <button className='navButton' id='findTrailsButton'><Link to='/selectstate' >Find Trails</Link></button>

                {/*---------------------- fix ternary -------------------------*/}
                {!user
                ?
                <button onClick={this.login} id='authButton' className='navButton'>Login</button>
                :
                <button onClick={this.logout /* history.push('/') */} id='authButton' className='navButton'>Log Out</button>}

                {/* <button className='navButton'><Link to='/googlemaps'>Search the map</Link></button> */}
                {user ?
                <button id='profileButton' className='navButton'><Link to={`/profile/${user.id}`} >Profile</Link></button>
                :  <button id='profileButton' onClick={() => this.notLoggedIn()} className='navButton'> Profile</button>
            }
                
            {/* </div> */}
        </div>
        </nav>
    </div>
    </header>
    )
}
}

const mapStateToProps = state => {
    return {
        user: state.user,
        profile: state.profile
    }
}


const mapDispatchToProps = {
    logIn,
    logOut
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);