import React, { Component } from 'react';
// import { login, register } from '../../Redux/reducer';
import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
import axios from 'axios';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            user: null,
        }
    }

    // handleChange = ( key, val ) => {
    //     this.setState({
    //         [key]: val
    //     })
    // }



      login = () => {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        axios.post('/login', {
          username,
          password
        }).then(response => {
          this.setState({ user: response.data });
        }).catch(error => {
          this.setState({ message: 'Sorry! There was an error.', error });
        });
      };



      logout = () => {
        axios.post('/logout').then(response => {
          this.setState({ user: null });
        }).catch(error => {
          this.setState({ message:'Sorry! There was an error.', error });
        });
      };





    render() { 
        // let { user } = this.state;
        return ( 
        <div>

            <div>Login</div>

            <form>
                <label>Username:</label>
                <input type='text' ref='username' /* onChange={e => this.handleChange(e.target.value)} */></input>
                <label>Password:</label>
                <input type='password' ref='password' /* onChange={e => this.handleChange(e.target.value)} */></input>

                <button onClick={this.login}>Login</button>
                <Link to='/register'><button>Sign up!</button></Link>
            </form>
        </div>
         );
    }
}

// const mapStateToProps = state => {
//     return {
//     }
// }


/* const mapDispatchToProps = {
    Login,
    register
} */


export default /* connect(mapStateToProps, mapDispatchToProps) */(Login);