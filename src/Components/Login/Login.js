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

    handleChange = ( key, val ) => {
        this.setState({
            [key]: val
        })
    }

    register = () => {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        axios.post('/register' , {
          username,
          password
        }).then(response => {
          this.setState({user: response.data})
        }).catch(error => {
          this.setState({ message: 'Sorry! There was an error.', error });
        });
      }

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



      logout =() => {
          
      }





    render() { 
        let { user } = this.state;
        return ( 
        <div>

            <div>Login</div>

            <form>
                <label>Username:</label>
                <input type='text' name='username' ref='username' onChange={e => this.handleChange(e.target.value)}></input>
                <label>Password:</label>
                <input type='password' name='password' ref='password' onChange={e => this.handleChange(e.target.value)}></input>

                <Link to='/'><button onClick={this.login}>Login</button></Link>
                <Link to='/'><button  onClick={this.register}>Register</button></Link>
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