import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import { Modal } from 'react-bootstrap';
import { mount, simulate, shallow, render } from 'enzyme'
import { expect } from 'chai';
import { Redirect } from 'react-router-dom';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import { BucketList } from '../BucketList';

Enzyme.configure({ adapter: new Adapter() });
beforeEach(() => {
  const pop = { bucketListToken: 'this is awesome' };
  global.localStorage = {
    bucketListToken: 'this is awesome',
    getItem: function() {
      return pop["bucketListToken"]
    }
  };
});
describe('<BucketList />', () => {
    beforeEach(() => {
  const pop = { bucketListToken: 'this is awesome' };
  global.localStorage = {
    bucketListToken: 'this is awesome',
    getItem: function() {
      return pop["bucketListToken"]
    }
  };
});
  it('An undefined close will change all states passed into it', () => {
    const wrapper = mount(<BucketList />);   
    wrapper.setState({
      showModal: true,
      showModalEdit: true,
      editBucketID: 1,
      showModalDelete: true,
      showActivityModal: true,
      editBucketError: 'error',
      editStatusForm: 'error',
      createStatusActivityForm: 'error',
      createActivityError: 'error',
      showEditActivityModal: true,
      editActivityError: 'error',
      editStatusActivityForm: 'error',
      showDeleteActivityModal: false
    })
    expect(wrapper.state().showModal).to.equal(true);
    expect(wrapper.state().showModalEdit).to.equal(true);
    expect(wrapper.state().editBucketID).to.equal(1);
    expect(wrapper.state().showModalDelete).to.equal(true);
    expect(wrapper.state().showActivityModal).to.equal(true);
    expect(wrapper.state().editBucketError).to.equal('error');
    expect(wrapper.state().editStatusForm).to.equal('error');
    expect(wrapper.state().createStatusActivityForm).to.equal('error');
    expect(wrapper.state().createActivityError).to.equal('error');
    expect(wrapper.state().showEditActivityModal).to.equal(true);
    expect(wrapper.state().editActivityError).to.equal('error');
    expect(wrapper.state().editStatusActivityForm).to.equal('error');
    expect(wrapper.state().showDeleteActivityModal).to.equal(false);
    wrapper.instance().close();
    expect(wrapper.state().showModal).to.equal(false);
    expect(wrapper.state().showModalEdit).to.equal(false);
    expect(wrapper.state().editBucketID).to.equal(null);
    expect(wrapper.state().showModalDelete).to.equal(false);
    expect(wrapper.state().showActivityModal).to.equal(false);
    expect(wrapper.state().editBucketError).to.equal('');
    expect(wrapper.state().editStatusForm).to.equal(null);
    expect(wrapper.state().createStatusActivityForm).to.equal(null);
    expect(wrapper.state().createActivityError).to.equal('');
    expect(wrapper.state().showEditActivityModal).to.equal(false);
    expect(wrapper.state().editActivityError).to.equal('');
    expect(wrapper.state().editStatusActivityForm).to.equal(null);
    expect(wrapper.state().showDeleteActivityModal).to.equal(false);
  });
  it('open changes state of create bucket', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'createBucketButton' } });
    expect(wrapper.state().showModal).to.equal(true);
  });
  it('open changes state when editbucketButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'editBucketButton', value: 5, id: 'bucket1' } });
    expect(wrapper.state().showModalEdit).to.equal(true);
    expect(wrapper.state().editBucketID).to.equal(5);
    expect(wrapper.state().previousBucketName).to.equal('bucket1');
  });
  it('open changes states when deletebucketButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'deleteBucketButton', value: 2, id: 'bucket2' } });
    expect(wrapper.state().showModalDelete).to.equal(true);
    expect(wrapper.state().deleteBucketID).to.equal(2);
    expect(wrapper.state().deletableBucketName).to.equal('bucket2');
  });
  it('open changes state when createActivityButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'createActivityButton' } });
    expect(wrapper.state().showActivityModal).to.equal(true);
  });
  it('open changes state when editActivityButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'editActivityButton', value: 3, id: 'activity1' } });
    expect(wrapper.state().showEditActivityModal).to.equal(true);
    expect(wrapper.state().activityID).to.equal(3);
    expect(wrapper.state().previousActivityName).to.equal('activity1');
  });
  it('open changes state when deleteActivityButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'deleteActivityButton', value: 1, id: 'activity2' } });
    expect(wrapper.state().showDeleteActivityModal).to.equal(true);
    expect(wrapper.state().activityID).to.equal(1);
    expect(wrapper.state().deletableActivityName).to.equal('activity2');
  });
  it('open changes state when search is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'searchButton', id: 6, value: 'example' } });
    expect(wrapper.state().bucketIDCreateActivity).to.equal(6);
    expect(wrapper.state().bucketChosen).to.equal('example');
    expect(wrapper.state().activityButtonStatus).to.equal(false);
  });
  it('close changes state when closeBucketButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'createBucketButton' } });
    expect(wrapper.state().showModal).to.equal(true);
    wrapper.setState({
      createBucketError: 'errorMessage',
      createStatusForm: 'error'
    });
    expect(wrapper.state().createBucketError).to.equal('errorMessage');
    expect(wrapper.state().createStatusForm).to.equal('error');
    wrapper.instance().close({ target: { name: 'closeBucketButton', id: 6, value: 'example' } });
    expect(wrapper.state().showModal).to.equal(false);
    expect(wrapper.state().createBucketError).to.equal('');
    expect(wrapper.state().createStatusForm).to.equal(null);
  });
  it('close changes state when closeEditButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'editBucketButton', value: 5, id: 'bucket1' } });
    expect(wrapper.state().showModalEdit).to.equal(true);
    wrapper.setState({
      editBucketError: 'errorMessage',
      editStatusForm: 'error'
    });
    expect(wrapper.state().editBucketError).to.equal('errorMessage');
    expect(wrapper.state().editStatusForm).to.equal('error');
    wrapper.instance().close({ target: { name: 'closeEditButton' } });
    expect(wrapper.state().showModalEdit).to.equal(false);
    expect(wrapper.state().editBucketID).to.equal(null);
    expect(wrapper.state().editBucketError).to.equal('');
    expect(wrapper.state().editStatusForm).to.equal(null);
  });
  it('close changes state when closeDeleteButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'deleteBucketButton', value: 2, id: 'bucket2' } });
    expect(wrapper.state().showModalDelete).to.equal(true);
    wrapper.instance().close({ target: { name: 'closeDeleteButton' } });
    expect(wrapper.state().showModalDelete).to.equal(false);
  });
  it('close changes state when closeActivityButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'createActivityButton' } });
    expect(wrapper.state().showActivityModal).to.equal(true);
    wrapper.setState({
      createStatusActivityForm: 'error',
      createActivityError: 'errorMessage'
    });
    expect(wrapper.state().createStatusActivityForm).to.equal('error');
    expect(wrapper.state().createActivityError).to.equal('errorMessage');
    wrapper.instance().close({ target: { name: 'closeActivityButton' } });
    expect(wrapper.state().createStatusActivityForm).to.equal(null);
    expect(wrapper.state().createActivityError).to.equal('');
    expect(wrapper.state().showActivityModal).to.equal(false);
});
it('close changes state when closeEditActivityButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'editActivityButton', value: 3, id: 'activity1' } });
    expect(wrapper.state().showEditActivityModal).to.equal(true);
    wrapper.setState({
      editStatusActivityForm: 'error',
      editActivityError: 'errorMessage'
    });
    expect(wrapper.state().editStatusActivityForm).to.equal('error');
    expect(wrapper.state().editActivityError).to.equal('errorMessage');
    wrapper.instance().close({ target: { name: 'closeEditActivityButton' } });
    expect(wrapper.state().showEditActivityModal).to.equal(false);
    expect(wrapper.state().editActivityError).to.equal('');
    expect(wrapper.state().editStatusActivityForm).to.equal(null);
});
it('close changes state when closeDeleteActivityButton is passed', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'deleteActivityButton', value: 1, id: 'activity2' } });
    expect(wrapper.state().showDeleteActivityModal).to.equal(true);
    expect(wrapper.state().deletableActivityName).to.equal('activity2');
    wrapper.instance().close({ target: { name: 'closeDeleteActivityButton' } });
    expect(wrapper.state().showDeleteActivityModal).to.equal(false);
    expect(wrapper.state().deletableActivityName).to.equal('');
});
it('handles a change in a bucket name', () => {
    const wrapper = mount(<BucketList />);
    expect(wrapper.state().new_bucket).to.equal('');
    wrapper.instance().handleChange({ target: { name: 'bucket_name', value: 'bucket1' } });
    expect(wrapper.state().new_bucket).to.equal('bucket1');
});
it('handles a change in edit bucket', () => {
    const wrapper = mount(<BucketList />);
    expect(wrapper.state().potentialBucketName).to.equal('');
    wrapper.instance().handleChange({ target: { name: 'editBucketName', value: 'bucket2' } });
    expect(wrapper.state().potentialBucketName).to.equal('bucket2');
});
it('handles a change in adding activity', () => {
    const wrapper = mount(<BucketList />);
    expect(wrapper.state().newActivity).to.equal('');
    wrapper.instance().handleChange({ target: { name: 'activity_name', value: 'activity1' } });
    expect(wrapper.state().newActivity).to.equal('activity1');
});
it('handles a change in editing activity', () => {
    const wrapper = mount(<BucketList />);
    expect(wrapper.state().potentialActivityName).to.equal('');
    wrapper.instance().handleChange({ target: { name: 'editActivityName', value: 'activity1' } });
    expect(wrapper.state().potentialActivityName).to.equal('activity1');
});
it('returns no list if bucket is not searched', () => {
    const wrapper = mount(<BucketList />);
    wrapper.setState({
      searchBucketError: 'No error Found',
      searchBucketStatus: 'success'
    });
    wrapper.instance().handleChange({ target: { name: 'searchBucket', value: 'example' } });
    expect(wrapper.state().searchBucketError).to.equal('No error Found');
    expect(wrapper.state().searchBucketStatus).to.equal('success');
    wrapper.instance().handleChange({ target: { name: 'searchBucket', value: '' } });
    expect(wrapper.state().searchBucketError).to.equal('');
    expect(wrapper.state().searchBucketStatus).to.equal(null);
});
it('open activities methods test', () => {
    const wrapper = mount(<BucketList />);
    expect(wrapper.state().bucketChosen).to.equal('');
    expect(wrapper.state().activityButtonStatus).to.equal(true);
    expect(wrapper.state().bucketChosenTitle).to.equal('');
    wrapper.instance().openActivities({
      target: { id: 'bucket1' },
      preventDefault: () => {}
    });
    expect(wrapper.state().bucketChosen).to.equal('bucket1');
    expect(wrapper.state().activityButtonStatus).to.equal(false);
    expect(wrapper.state().bucketChosenTitle).to.equal('BucketName:');
});
it('calls componentWillMount', () => {
    sinon.spy(BucketList.prototype, 'componentWillMount');
    const wrapper = mount(<BucketList />);
    expect(BucketList.prototype.componentWillMount.calledOnce).to.equal(true);
  });
  it('calls updateTable', () => {
    sinon.spy(BucketList.prototype, 'updateTable');
    const wrapper = mount(<BucketList />);
    wrapper.instance().updateTable();
    expect(BucketList.prototype.updateTable.calledOnce).to.equal(true);
  });
  it('calls handleSubmit for create Bucket', () => {
    sinon.spy(BucketList.prototype, 'handleSubmit');
    const wrapper = mount(<BucketList />);
    wrapper.instance().handleSubmit({ target: { name: 'createBucketForm' },
      preventDefault: () => {}
    });
    expect(BucketList.prototype.handleSubmit.called).to.equal(true);
  });
  it('calls handleSubmit for edit Bucket', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().handleSubmit({ target: { name: 'editBucketForm' },
      preventDefault: () => {}
    });
    expect(BucketList.prototype.handleSubmit.called).to.equal(true);
  });
  it('calls handleSubmit for delete Bucket', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().handleSubmit({ target: { name: 'deleteBucketForm' },
      preventDefault: () => {}
    });
    expect(BucketList.prototype.handleSubmit.called).to.equal(true);
  });
  it('calls handleSubmit for create Activity', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().handleSubmit({ target: { name: 'createActivityForm' },
      preventDefault: () => {}
    });
    expect(BucketList.prototype.handleSubmit.called).to.equal(true);
  });
  it('calls handleSubmit for edit Activity', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().handleSubmit({ target: { name: 'editActivityForm' },
      preventDefault: () => {}
    });
    expect(BucketList.prototype.handleSubmit.called).to.equal(true);
  });
  it('calls handleSubmit for delete Activity', () => {
    const wrapper = mount(<BucketList />);
    wrapper.instance().handleSubmit({ target: { name: 'deleteActivityForm' },
      preventDefault: () => {}
    });
    expect(BucketList.prototype.handleSubmit.called).to.equal(true);
  });
  it('calls open for search Button', () => {
    sinon.spy(BucketList.prototype, 'open');
    const wrapper = mount(<BucketList />);
    wrapper.instance().open({ target: { name: 'searchButton', id: 2, value: 'bucket1' }
    });
    expect(BucketList.prototype.open.called).to.equal(true);
    expect(wrapper.state().bucketIDCreateActivity).to.equal(2);
    expect(wrapper.state().bucketChosen).to.equal('bucket1');
    expect(wrapper.state().activityButtonStatus).to.equal(false);
  });
  it('calls handlePages', () => {
    sinon.spy(BucketList.prototype, 'handlePages');
    const wrapper = mount(<BucketList />);
    wrapper.instance().handlePages({ target: '' });
    expect(BucketList.prototype.handlePages.called).to.equal(true);
  });
});

describe('<BucketList />', () => {
  it('calls handleClick', () => {
    sinon.spy(BucketList.prototype, 'handleClick');
    const wrapper = mount(<BucketList />);
    const pop = { bucketListToken: 'this is awesome' };
    global.localStorage = {
      bucketListToken: '',
      removeItem: function() {
        return ""
      }, getItem: function() {
        return pop["bucketListToken"]
      }
    };
    wrapper.instance().handleClick({ target: { name: 'logout' } });
    expect(BucketList.prototype.handleClick.calledOnce).to.equal(true);
  });
  it('calls handleClick', () => {
    const pop = { bucketListToken: null };
    global.localStorage = {
      bucketListToken: null,
     getItem: function() {
        return pop["bucketListToken"]
      }
    };
    const wrapper = mount(<MemoryRouter><BucketList /></MemoryRouter>);
    expect(wrapper.contains(<Redirect to="/" />)).to.equal(true);
  });
});


