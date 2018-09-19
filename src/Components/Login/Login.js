import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';

class Login extends Component {


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



export default (Login);