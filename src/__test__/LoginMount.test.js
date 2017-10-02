import React from 'react'
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import { mount, simulate } from 'enzyme'
import { expect } from 'chai';
import { Login } from '../Login';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login State Changes/>', () => {
  it('Three buttons are rendered on mounting, one disabled and two enabled', () => {
    const wrapper = mount(<Login />)
    expect(wrapper.find('Button')).to.have.length(3);
  });
  it('Renders sign up page once showSignUp is used. This means form groups will increase to 4',
    () => {
      const wrapper = mount(<Login />);
      expect(wrapper.find('FormGroup')).to.have.length(2);
      wrapper.setState({ signUpButtonState: true });
      expect(wrapper.find('FormGroup')).to.have.length(4);
    });
  it('Renders back to the sign in page from sign up page. This means form groups will reduce to 2',
    () => {
      const wrapper = mount(<Login />);
      expect(wrapper.find('FormGroup')).to.have.length(2);
      wrapper.setState({
        signUpButtonState: true,
        signInButtonState: false
      });
      expect(wrapper.find('FormGroup')).to.have.length(4);
      wrapper.setState({
        signUpButtonState: false,
        signInButtonState: true
      });
      expect(wrapper.find('FormGroup')).to.have.length(2);
    });
  it('Input state of password changes when checkbox is clicked', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('input').get(1).props.type).to.equal('password');
    wrapper.setState({ loginPasswordState: 'text' });
    expect(wrapper.find('input').get(1).props.type).to.equal('text');
  });
  it('Sign up changes signInButtonState to false and signUpButtonState to true', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.state().signInButtonState).to.equal(true);
    expect(wrapper.state().signUpButtonState).to.equal(false);
    wrapper.instance().signUp();
    expect(wrapper.state().signInButtonState).to.equal(false);
    expect(wrapper.state().signUpButtonState).to.equal(true);
  });
  it('Sign in changed signInButtonState to true and signUpButtonState to false', () => {
    const wrapper = mount(<Login />);
    wrapper.instance().signUp();
    expect(wrapper.state().signInButtonState).to.equal(false);
    expect(wrapper.state().signUpButtonState).to.equal(true);
    wrapper.instance().signIn();
    expect(wrapper.state().signInButtonState).to.equal(true);
    expect(wrapper.state().signUpButtonState).to.equal(false);
  });
  it('showLoginPassword changes the state of the type of login password state', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.state().loginPasswordState).to.equal('password');
    wrapper.instance().showLoginPassword();
    expect(wrapper.state().loginPasswordState).to.equal('text');
    wrapper.instance().showLoginPassword();
    expect(wrapper.state().loginPasswordState).to.equal('password');
  });
  it('handleChange changes the state of user_email', () => {
    const wrapper = mount(<Login />);
    wrapper.instance().handleChangeEmail({ target: { value: 'example@email.com' } });
    expect(wrapper.state().user_email).to.equal('example@email.com');
  });
});

