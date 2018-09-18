import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Register extends Component {
    state = { 
        user: null
     }

    register = () => {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const email = this.refs.email.value;
        axios.post('/register' , {
          username,
          password,
          email
        }).then(response => {
          this.setState({user: response.data})
        }).catch(error => {
          this.setState({ message: 'Sorry! There was an error.', error });
        });
      }
    render() { 
        return ( 
            <div>
                <form>
                <label>Username:</label>
                <input type='text' ref='username'></input>
                <label>Password:</label>
                <input type='password' ref='password'></input>
                <label>Email:</label>
                <input type='text' ref='email'></input>

                <button onClick={this.register}>Finish</button>
            </form> 
            </div>
         );
    }
}
 
export default Register;