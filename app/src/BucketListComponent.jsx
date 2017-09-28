import React, { Component } from 'react';
import { FormGroup, ControlLabel, HelpBlock, Button, Modal, FormControl, ListGroup, ListGroupItem, Table,
DropdownButton, MenuItem, Tooltip, OverlayTrigger
} from 'react-bootstrap';
import { ActivityTable } from './ActivityListComponent';
import './BucketListComponent.css';

export class CreateBucketModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.close}>
        <form onSubmit={this.props.handleSubmit} name="createBucketForm">
          <Modal.Header>
                <Modal.Title>Create a new BucketList</Modal.Title>
                    
                </Modal.Header>
        
                <Modal.Body>
                    <FormGroup validationState={this.props.createStatusForm}>
                        <HelpBlock>{this.props.createBucketError}</HelpBlock>
                        <ControlLabel >New Bucket Name </ControlLabel>
                        <input name="bucket_name" type="text" onChange={this.props.handleChange} required/>
                    </FormGroup>
                </Modal.Body>
        
                <Modal.Footer>
                <Button name="closeBucketButton" onClick={this.props.close}>Close</Button>
                <Button type="submit" bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </form>
        </Modal>

        );
    }
}
  
export class BucketTable extends Component {
    render(){
        if(this.props.data.length === 0){
            return(
                <HelpBlock>You have not yet created a bucket</HelpBlock>
            );
        };
        return(
        
        <Table condensed hover>
            <thead>
                <tr>
                    <th >Bucket Name</th>
                    <th>Edit Bucket</th>
                    <th>Delete Bucket</th>
                </tr>
            </thead>
            <tbody>
                {this.props.data.map(row =>
                (
                <tr>
                    <td>
                    <BucketWithTooltip tooltip="Click to view activities" href="#" id="tooltip-1">
                        <Button type="submit" onClick={this.props.openActivities}name="viewActivitiesButton" id={row.name} value={row.id}>
                        {row.name}
                        </Button>
                    </BucketWithTooltip>
                    </td>
                    <td>
                        <center>
                        <Button type="submit" onClick={this.props.open} className="btn btn-default btn-sm glyphicon glyphicon-pencil" name="editBucketButton" id={row.name} value={row.id}>
                        </Button>
                        </center>
                    </td>
                    <td>
                        <center>
                        <button type="submit" onClick={this.props.open} className="btn btn-danger btn-sm glyphicon glyphicon-trash" name="deleteBucketButton" id={row.name} value={row.id}>
                        </button>
                        </center>
                    </td>
                </tr>
                
                ),
                )}
            </tbody>
        </Table>
    );
      }
    }
export class DeleteBucketModal extends Component{
    render(){
        return(
        <Modal show={this.props.delete} onHide={this.props.close}>
            <form onSubmit={this.props.handleSubmit} name="deleteBucketForm">
                <Modal.Header>
                <Modal.Title>Delete BucketList</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                Are you sure you want to delete the bucket <strong>{this.props.deletableBucketName}</strong>?
                </Modal.Body>
        
                <Modal.Footer>
                <Button name="closeDeleteButton" onClick={this.props.close}>Close</Button>
                <Button type="submit" className="btn btn-danger" bsStyle="primary">Remove</Button>
                </Modal.Footer>
            </form>
        </Modal>

        );
    }
}
export class EditBucketModal extends Component {
    render(){
        return(                
        <Modal show={this.props.edit} onHide={this.props.close} >
            <form onSubmit={this.props.handleSubmit} name="editBucketForm">
                <Modal.Header>
                <Modal.Title>Edit Bucket {this.props.bucketName}</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>

                    <FormGroup validationState={this.props.editStatusForm}>
                        <HelpBlock>{this.props.editBucketError}</HelpBlock>
                        <ControlLabel >New Bucket Name </ControlLabel>
                        <input name="editBucketName" type="text" onChange={this.props.handleChange}/>
                    </FormGroup>
                </Modal.Body>
        
                <Modal.Footer>
                <Button name="closeEditButton" onClick={this.props.close}>Close</Button>
                <Button type="submit" bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </form>
        </Modal>
        );
    }
}

export class SearchBucket extends Component{
    render(){
        return(                    
        <FormGroup  bsSize="small" validationState={this.props.searchBucketStatus}>
            <HelpBlock>{this.props.searchBucketError}</HelpBlock>
            <FormControl
            name="searchBucket"
            type="text"
            value={this.props.value}
            placeholder="Search bucketname"
            onChange={this.props.handleChange}
          ></FormControl>
          <FormControl.Feedback />
        </FormGroup>
        )
    }
}
export class SearchBucketTable extends Component{
    render(){
        if(this.props.data.length === 0){
            return(
                <HelpBlock>{this.props.notification}</HelpBlock>
            );
        };
        return(
        
            <DropdownButton defaultOpen={true} id="bg-vertical-dropdown-1">    
                {this.props.data.map(row =>
                (
                <ListGroupItem name="searchButton" class="btn" onClick={this.props.open} value={row.name} id={row.id}>{row.name}</ListGroupItem>
                ),
                )}
            </DropdownButton>
    
        

    );
    }
}

export class MainPage extends Component{
    render(){
        return(
        <div>
                <div className="page-header col-md-12 col-sm-12 col-xs-12" id="titleMainPage" >
                    <div className="col-md-3 col-sm-3 col-xs-3">
                    <SearchBucket searchBucketError={this.props.searchBucketError} value={this.props.value}
                        searchBucketStatus={this.props.searchBucketStatus} handleChange={this.props.handleChange}/>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                    <SearchBucketTable data={this.props.searchData} open={this.props.open}/>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-5">
                    <span id="titleHeader">The Bucket List</span>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                      <DropdownButton title="Menu" id="bg-vertical-dropdown-1">
                        <MenuItem onClick={this.props.handleClick} name="myAccount" eventKey="1">My Account</MenuItem>
                        <MenuItem onClick={this.props.handleClick} eventKey="2" name="logout">Logout</MenuItem>
                      </DropdownButton>
                    </div>
                </div>
                <div className="panel col-md-6 col-sm-6 col-xs-6" id="bucketPanel" >
                    <div className="panel-heading">
                    <span id="bucketListHeading">My BucketList</span>
                    <Button id="createBucket" name="createBucketButton" bsStyle="primary" onClick={this.props.open} bsSize="small" >Create New Bucket</Button>
                    </div>
                    <hr></hr>
                    <div className="panel-body">
                    <BucketTable open={this.props.open} data={this.props.data} openActivities={this.props.openActivities} />
                    </div>
                </div>
                <div className="panel col-md-6 col-sm-6 col-xs-6" id ="activityPanel">
                    <div className="panel-heading"><h4><strong>{this.props.bucketChosenTitle}</strong> <strong id="bucketName">{this.props.bucketChosen}</strong></h4></div>
                    <span id="activityHeading">My Activities</span>
                    <Button id="createActivityPanelButton" name="createActivityButton" bsStyle="primary" onClick={this.props.open} bsSize="small" disabled={this.props.activityButtonStatus}>Create New Activity</Button>
                    <div className="panel-body">
                        <ActivityTable data={this.props.activityData} open={this.props.open}/>
                    </div>
                </div>
        </div>
        );
    }
}

const BucketWithTooltip = React.createClass({
  render() {
    let tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>;

    return (
      <OverlayTrigger
        overlay={tooltip} placement="top"
        delayShow={300} delayHide={150}
      >
        <a href={this.props.href}>{this.props.children}</a>
      </OverlayTrigger>
    );
  }
});

