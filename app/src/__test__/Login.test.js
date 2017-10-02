import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Login } from '../Login';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  it('two buttons are rendered', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('Button')).to.have.length(2);
  });
  it('contains an alert container', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('AlertContainer')).to.have.length(1);
  });
  it('renders bucket list page  when login status is true', () => {
    const wrapper = shallow(<Login />);
    wrapper.setState({ loginStatus: true });
    expect(wrapper.contains(<Redirect to="/bucketlist" />)).to.equal(true);
  });
  it('renders reigster page  when signUpButton state is true', () => {
    const wrapper = shallow(<Login />);
    wrapper.setState({ signUpButtonState: true });
    expect(wrapper.find('Register')).to.have.length(1);
  });
  it('checks initial states', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.state('loginPasswordState')).to.equal('password');
    expect(wrapper.state('stateOfEntry')).to.equal(null);
    expect(wrapper.state('user_email')).to.equal('');
    expect(wrapper.state('user_password')).to.equal('');
    expect(wrapper.state('loginStatus')).to.equal(false);
    expect(wrapper.state('signInButtonState')).to.equal(true);
    expect(wrapper.state('signUpButtonState')).to.equal(false);
  });
});
