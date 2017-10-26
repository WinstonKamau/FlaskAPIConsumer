import React from 'react';
import ReactDOM from 'react-dom';
import { LoginForm } from '../LoginComponent';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';
Enzyme.configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  it('input type is changeable by changing state', () => {
    const wrapper = shallow(<LoginForm loginPasswordState="text"/>);
    expect(wrapper.find('input').get(1)["props"]["type"]).to.equal("text");
  });
  it('renders two input forms', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('input')).to.have.length(2);
  });
  it('renders a checkbox', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('Checkbox')).to.have.length(1);
  });
  it('renders two labels', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('ControlLabel')).to.have.length(2);
  });
  it('renders a button', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('Button')).to.have.length(1);
  });
  it('renders two Form Groups', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('FormGroup')).to.have.length(2);
  });
  it('renders one Help Block', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('HelpBlock')).to.have.length(1);
  });
  it('renders one form', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('form')).to.have.length(1);
  });
})
  