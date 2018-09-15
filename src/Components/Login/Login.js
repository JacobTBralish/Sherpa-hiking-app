import React, { Component } from 'react';
import { logIn, register } from '../../Redux/reducer';
import { connect } from "react-redux";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            password:''
        }
    }

    handleChange = ( key, val ) => {
        this.setState({
            [key]: val
        })
    }

    logIn = () => {
        const { logIn, history } = this.props;
        const { username, password } = this.state;
        logIn({ username, password }, history);
    }

    render() { 
        let { username, password } = this.state;
        return ( 
        <div>

            <div>Login</div>

            <form>
                <label>Username:</label>
                <input type='text' name='username' value={username} onChange={e => this.handleChange(e.target.value)}></input>
                <label>Password:</label>
                <input type='password' name='password' value={password} onChange={e => this.handleChange(e.target.value)}></input>
                <button onClick={this.logIn}>Login</button>
            </form>
        </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        username: state.user.username,
        password: state.user.password
    }
}


const mapDispatchToProps = {
    // LogIn,
    register
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);