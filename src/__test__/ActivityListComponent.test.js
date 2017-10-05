import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { HelpBlock } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { ActivityTable } from '../ActivityListComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('<ActivityTable />', () => {
  it('Check that if data has a length of zero helpblock is returned', () => {
    const wrapper = shallow(<ActivityTable data={[]} />);
    expect(wrapper.contains('You have no activities')).to.equal(true);
    });
  it('Check that table is printed if data is provided', () => {
    const wrapper = shallow(<ActivityTable data={[ 'example1', 'example2', 'example3']} />);
    expect(wrapper.find('tr')).to.have.length(4);
    });
  });
  