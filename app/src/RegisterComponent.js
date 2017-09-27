import React, { Component } from 'react';
import {FormGroup, Checkbox, ControlLabel, HelpBlock, Button} from 'react-bootstrap';

export class RegisterForm extends Component{
    render(){

        return(               
        <form onSubmit={this.props.handleSubmit}>
            <Button id="signIn" onClick={this.props.signIn} className="btn btn-default" disabled={this.props.signInButtonState}>Sign In</Button>
            <Button id="signUp" onClick={this.props.signUp} disabled={this.props.signUpButtonState} className="btn btn-default">Sign Up</Button>
            <FormGroup validationState="success">
                <HelpBlock>{this.props.registerStateMessage}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.props.userConflictStatus}>
                <label>Email</label>
                <input name="user_email" type="email" required onChange={this.props.handleChange}/>
                <HelpBlock>{this.props.userConflictMessage}</HelpBlock>
            </FormGroup>
            <FormGroup validationState={this.props.stateOfEntry}>
                <ControlLabel>Password </ControlLabel>
                <input id="registerPasswordInput" name="user_password" onChange={this.props.validatePassword} type={this.props.passwordState} required/>
                <HelpBlock >Password should be longer than six characters.</HelpBlock>
            </FormGroup>
            <Checkbox onChange={this.props.showPassword}>Show Password</Checkbox>
            <FormGroup validationState={this.props.stateOfConfirmEntry}>
                <ControlLabel>Confirm Password</ControlLabel>
                <input type="password" required onChange={this.props.confirmPassword}/>
                <HelpBlock>Password should match.</HelpBlock>
            </FormGroup>
            <Button id="registerButton" type="submit" bsStyle="primary"  bsSize="small" disabled={this.props.registerButtonStatus}>Register</Button>
        </form>
        );
    }

}