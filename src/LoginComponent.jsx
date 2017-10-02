import React, { Component } from 'react';
import { FormGroup, Checkbox, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

export class LoginForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup>
          <ControlLabel className="loginLabels">Email: </ControlLabel>
          <input name="user_email" type="email" required onChange={this.props.handleChange}/>
        </FormGroup>
        <FormGroup validationState={this.props.stateOfEntry}>
          <ControlLabel className="loginLabels">Password: </ControlLabel>
          <input
            id="loginPasswordInput"
            name="user_password"
            onChange={this.props.handleChange}
            type={this.props.loginPasswordState}
            required
          />
          <HelpBlock>Password is case-sensitive.</HelpBlock>
        </FormGroup>
        <Checkbox onChange={this.props.showLoginPassword}>Show Password</Checkbox>
        <Button id="loginButton" type="submit" bsStyle="primary"  bsSize="small" >Login</Button>
      </form>
    );
  }
}

export default LoginForm;
