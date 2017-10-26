import React, { Component } from 'react';
import axios from 'axios' ;
import { RegisterForm } from './RegisterComponent.jsx';
import { Redirect } from 'react-router-dom';
import AlertContainer from 'react-alert';

export class Register extends Component{
    constructor(props) {
        super(props);
        this.showPassword = this.showPassword.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          passwordState: "password",
          passwordValue: '',
          stateOfEntry: null,
          stateOfConfirmEntry: null,
          user_email: "",
          user_password:"",
          capsLock:"",
          userConflictMessage: '',
          userConflictStatus: null,
          registerStateMessage:'' ,
          registerButtonStatus: true,
          registerState: false,
          loginRegisterErrorMessage:'',
        }
      }
      alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }
     
      showAlert = () => {
        this.msg.success('You have been logged in!')
      }
      showDescriptiveError = () => {
        this.msg.error(this.state.loginRegisterErrorMessage);
      }
    handleChange(e){
        this.setState({user_email:e.target.value,})
        if (this.state.userConflictStatus === "error")
            {
            this.setState({
                userConflictMessage:'',
                userConflictStatus: null
            });
            }
    }

    validatePassword(e){
        let passwordEntered = e.target.value;
        if (passwordEntered.length > 6) {
            this.setState({stateOfEntry: "success"});
            this.setState({user_password: e.target.value});
            if (this.state.theConfirmPassword === e.target.value){
                this.setState({
                    stateOfConfirmEntry: "success",
                    registerButtonStatus: false
                })
            }
        }
        else this.setState({stateOfEntry:"error"});
        if (this.state.theConfirmPassword !== e.target.value){
            this.setState({
                stateOfConfirmEntry: "error",
                registerButtonStatus: true
            })
        }
    }


    confirmPassword(e){
        let confirmPassword = e.target.value;
        if (confirmPassword === this.state.user_password && this.state.stateOfEntry === "success"){
            this.setState({stateOfConfirmEntry: "success"});
            this.setState({registerButtonStatus: false});
        }
        else this.setState({stateOfConfirmEntry:"error"});

    }
    handleSubmit(event){
        event.preventDefault();
        localStorage.removeItem("bucketListToken");
        axios.post('http://localhost:5000/auth/register', {
            user_email: this.state.user_email,
            user_password: this.state.user_password 
          })
          .then( response => {
            this.showAlert()
            axios.post('http://localhost:5000/auth/login', {
                user_email: this.state.user_email,
                user_password: this.state.user_password 
              })
              .then(response => {
                if(response.status === 200 ){
                    localStorage.setItem('bucketListToken', "Bearer " + response.data["access-token"]);
                    this.setState({registerState:true});
                }
              })
              .catch( error => {
                if (error.response === undefined){
                    alert ('There is something wrong')
                }
                else{
                    this.setState({loginRegisterErrorMessage: error.response.data["message"]});
                    this.showDescriptiveError();
                }
              });
          })
          .catch( error => {
            if (error.response === undefined)
                {alert ('There is something wrong')}
            else{
            this.setState({
                userConflictStatus: "error",
                userConflictMessage: error.response.data["message"],
                loginRegisterErrorMessage: error.response.data["message"]
            });
            this.showDescriptiveError();
            }
          });

    }
    showPassword(){
        const typeOfInput = this.state.passwordState === "password" ? "text" : "password";
        this.setState({passwordState: typeOfInput});
    };
    render(){
        if (this.state.registerState === true ){
            return(
                <Redirect to="/bucketlist" />
            );
        }
        return(
            <div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <RegisterForm handleSubmit={this.handleSubmit} userConflictStatus={this.state.userConflictStatus}
                handleChange={this.handleChange} userConflictMessage={this.state.userConflictMessage}
                stateOfEntry={this.state.stateOfEntry} validatePassword={this.validatePassword}
                passwordState={this.state.passwordState} showPassword={this.showPassword} stateOfConfirmEntry={this.state.stateOfConfirmEntry}
                confirmPassword={this.confirmPassword} signIn={this.props.signIn} signInButtonState={this.props.signInButtonState}
                signUp={this.props.signUp} signUpButtonState={this.props.signUpButtonState} registerStateMessage={this.state.registerStateMessage}
                registerButtonStatus={this.state.registerButtonStatus}
                />
            </div>
        );
    };
}
