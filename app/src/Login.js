import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import axios from 'axios' ;
import './Login.css';
import {Redirect} from 'react-router-dom';
import {Register} from './Register';
import {LoginForm} from './LoginComponent';

export class Login extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.showLoginPassword = this.showLoginPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.state = {
          loginPasswordState: "password",
          stateOfEntry: null,
          user_email: "",
          user_password:"",
          loginStatus: false,
          signInButtonState: true,
          signUpButtonState: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleChange(e){
        if (e.target.name === "user_email")
        this.setState({user_email: e.target.value});
        if (e.target.name === "user_password")
        this.setState({user_password: e.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.user_email);
        console.log(this.state.user_password);
        axios.post('http://localhost:5000/auth/login', {
            user_email: this.state.user_email,
            user_password: this.state.user_password 
          })
          .then(response => {
            console.log(response.status);
            if(response.status === 200 ){
                localStorage.setItem('bucketListToken', "Bearer " + response.data["access-token"]);
                this.setState({loginStatus: true});
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    showLoginPassword(){
        const typeOfInput = this.state.loginPasswordState === "password" ? "text" : "password";
        this.setState({loginPasswordState: typeOfInput});
    };
    signUp(){
        this.setState({
            signInButtonState: false,
            signUpButtonState: true
        })
    }
    signIn(){
        this.setState({
            signInButtonState: true,
            signUpButtonState: false
        })
    }
    render(){
    if (this.state.loginStatus === true){
        return <Redirect to="/bucketlist"/>
    };
    if (this.state.signUpButtonState === true){
        return (
        <div>
 
            <Register signIn={this.signIn} signInButtonState={this.state.signInButtonState} signUp={this.signUp}
             signUpButtonState={this.state.signUpButtonState}/>
        </div> 
            );
    };
    return(
        <div>
            <Button id="signIn" onClick={this.signIn} className="btn btn-default" disabled={this.state.signInButtonState}>Sign In</Button>
            <Button id="signUp" onClick={this.signUp}disabled={this.state.signUpButtonState} className="btn btn-default">Sign Up</Button>
            <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} stateOfEntry={this.state.stateOfEntry}
            loginPasswordState={this.state.loginPasswordState} showLoginPassword={this.showLoginPassword}
            signInButtonState={this.state.signInButtonState} signUpButtonState={this.state.signUpButtonState}
            signUp={this.signUp} signIn={this.signIn}
            />
        </div>
    );
    }
}

