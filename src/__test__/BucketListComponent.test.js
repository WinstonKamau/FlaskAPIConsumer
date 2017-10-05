import React from 'react';
import ReactDOM from 'react-dom';
import { HelpBlock, Modal } from 'react-bootstrap';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Redirect } from 'react-router-dom';
import { CreateBucketModal, BucketTable, DeleteBucketModal,
  SearchBucket, SearchBucketTable, MainPage } from '../BucketListComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateBucketModal />', () => {
  it('renders the error statement once called', () => {
    const wrapper = shallow(<CreateBucketModal createBucketError="Example Error"/>);
    expect(wrapper.contains(<HelpBlock>Example Error</HelpBlock>)).to.equal(true);
  });
  it('renders one form', () => {
    const wrapper = shallow(<CreateBucketModal />);
    expect(wrapper.find('form')).to.have.length(1);
  });
});

describe('<BucketTable />', () => {
  it('', () => {
    const wrapper = shallow(<BucketTable data={[]} />);
  });

  it('renders a table if there are buckets and that the names exist', () => {
    const wrapper = shallow(<BucketTable data={[{ name: 'Example1' }, { name: 'Example2' }]} />);
    expect(wrapper.contains(
      <thead>
        <tr>
          <th >Bucket Name</th>
          <th>Edit Bucket</th>
          <th>Delete Bucket</th>
        </tr>
      </thead>)).to.equal(true);
    expect(wrapper.contains('Example1')).to.equal(true);
    expect(wrapper.contains('Example2')).to.equal(true);
    expect(wrapper.find('BucketWithTooltip')).to.have.length(2);
  });
});

describe('<DeleteBucketModal />', () => {
  it('renders bucket name to delete', () => {
    const wrapper = shallow(<DeleteBucketModal deletableBucketName="Example"/>);
    expect(wrapper.contains(
      <Modal.Body>
            Are you sure you want to delete the bucket
        <strong>Example</strong>?
      </Modal.Body>)).to.equal(true);
  });
  it('renders a form, title and two buttons', () => {
    const wrapper = shallow(<DeleteBucketModal />);
    expect(wrapper.find('Button')).to.have.length(2);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.contains(<Modal.Title>Delete BucketList</Modal.Title>)).to.equal(true);
  });
});

describe('<SearchBucket />', () => {
  it('renders error message when given prop', () => {
    const wrapper = shallow(<SearchBucket searchBucketError="Example Error Message" />);
    expect(wrapper.contains(<HelpBlock>Example Error Message</HelpBlock>)).to.equal(true);
  });
  it('renders a Form group', () => {
    const wrapper = shallow(<SearchBucket />);
    expect(wrapper.find('FormGroup')).to.have.length(1);
  });
});

describe('<SearchBucketTable />', () => {
  it('renders error message when given prop', () => {
    const wrapper = shallow(<SearchBucketTable notification="Name does not exist" data={[]} />);
    expect(wrapper.contains(<HelpBlock>Name does not exist</HelpBlock>)).to.equal(true);
  });
  it('renders table if name exists', () => {
    const wrapper = shallow(<SearchBucketTable data={[{ name: 'example1' }, { name: 'example2' }]} />);
    expect(wrapper.contains('example1')).to.equal(true);
    expect(wrapper.contains('example2')).to.equal(true);
  });
});


describe('<MainPage />', () => {
  it('renders two menu items', () => {
    const wrapper = shallow(<MainPage pageButtons={[]} />);
    expect(wrapper.find('MenuItem')).to.have.length(2);
  });
  it('renders two five buttons' , () => {
    const wrapper = shallow(<MainPage pageButtons={[1, 2, 3, 4, 5]} />);
    expect(wrapper.find('Button')).to.have.length(7);
  });
  it('renders shown title and bucket name', () => {
    const wrapper = shallow(
      <MainPage pageButtons={[]} bucketChosenTitle="ExampleBucket" bucketChosen="ExampleName" />);
    expect(wrapper.contains(<strong>ExampleBucket</strong>)).to.equal(true);
    expect(wrapper.contains(<strong id="bucketName">ExampleName</strong>)).to.equal(true);
  });
  it('renders all items', () => {
    const wrapper = shallow(<MainPage pageButtons={[]} />);
    expect(wrapper.find('SearchBucket')).to.have.length(1);
    expect(wrapper.find('SearchBucketTable')).to.have.length(1);
    expect(wrapper.find('BucketTable')).to.have.length(1);
    expect(wrapper.find('DropdownButton')).to.have.length(1);
    expect(wrapper.find('ActivityTable')).to.have.length(1);
  });
});
