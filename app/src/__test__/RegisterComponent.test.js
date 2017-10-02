import React from 'react';
import ReactDOM from 'react-dom';
import { HelpBlock } from 'react-bootstrap';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { RegisterForm } from '../RegisterComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('<Register />', () => {
  it('contains both a sign up and sign in button and a register button', () => {
    const wrapper = shallow(<RegisterForm/>)
    expect(wrapper.find('Button')).to.have.length(3);
  });
  it('inputs are three', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper.find('input')).to.have.length(3);
  });
  it('input type password is changeable', () => {
    const wrapper = shallow(<RegisterForm passwordState="password" />);
    expect(wrapper.find('input').get(1)["props"]["type"]).to.equal('password');
    const wrapper2 = shallow(<RegisterForm passwordState="text" />);
    expect(wrapper2.find('input').get(1)["props"]["type"]).to.equal('text');
  });
  it('ensure all inputs are requred', () => {
    const wrapper = shallow(<RegisterForm passwordState="password" />);
    expect(wrapper.find('input').get(0)["props"]["required"]).to.equal(true);
    expect(wrapper.find('input').get(1)["props"]["required"]).to.equal(true);
    expect(wrapper.find('input').get(2)["props"]["required"]).to.equal(true);
  });
  it('receives and renders helpblock messages', () => {
    const wrapper = shallow(
      <RegisterForm registerStateMessage="Error1" userConflictMessage="Error2" />);
    expect(wrapper.contains(<HelpBlock>Error1</HelpBlock>)).to.equal(true);
    expect(wrapper.contains(<HelpBlock>Error2</HelpBlock>)).to.equal(true);
  });
});
