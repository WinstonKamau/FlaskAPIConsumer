import React, { Component } from 'react';
import {FormGroup,ControlLabel, HelpBlock,Button, Modal, Table} from 'react-bootstrap';

export class ActivityTable extends Component {
    render(){
        if(this.props.data.length === 0){
            return(
                <p>No activity</p>
                );
            };
        return(
            <Table condensed hover>
                <thead>
                    <tr>
                        <th>Activity Name</th>
                        <th>Edit Activity</th>
                        <th>Delete Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map(row =>
                    (
                    <tr>
                        <td>{row.activity_name}</td>
                        <td>
                            <center>
                            <Button type="submit" onClick={this.props.open} className="btn btn-default btn-sm glyphicon glyphicon-pencil" name="editActivityButton" id={row.activity_name} value={row.id}>
                            </Button>
                            </center>
                        </td>
                        <td>
                            <center>
                            <Button type="submit" onClick={this.props.open} className="btn btn-danger btn-sm glyphicon glyphicon-trash" name="deleteActivityButton" id={row.activity_name} value={row.id}>
                            </Button>
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

export class CreateActivityModal extends Component{
    render(){
        return(
            <Modal show={this.props.showActivityModal} onHide={this.props.close}>
                <form onSubmit={this.props.handleSubmit} name="createActivityForm">
                    <Modal.Header>
                    <Modal.Title>Create a new Activity</Modal.Title>
                        
                    </Modal.Header>
            
                    <Modal.Body>
                        <FormGroup validationState={this.props.createStatusActivityForm}>
                            <HelpBlock>{this.props.createActivityError}</HelpBlock>
                            <ControlLabel >New Activity Name </ControlLabel>
                            <input name="activity_name" type="text" onChange={this.props.handleChange} required/>
                        </FormGroup>
                    </Modal.Body>
            
                    <Modal.Footer>
                    <Button name="closeActivityButton" onClick={this.props.close}>Close</Button>
                    <Button type="submit" bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
        
    }
}
export class EditActivityModal extends Component{
    render(){
        return(
            <Modal show={this.props.showEditActivityModal} onHide={this.props.close}>
                <form onSubmit={this.props.handleSubmit} name="editActivityForm">
                    <Modal.Header>
                    <Modal.Title>Edit Activity {this.props.previousActivityName}</Modal.Title>
                        
                    </Modal.Header>
            
                    <Modal.Body>
                        <FormGroup validationState={this.props.editStatusActivityForm}>
                            <HelpBlock>{this.props.editActivityError}</HelpBlock>
                            <ControlLabel >New Activity Name </ControlLabel>
                            <input name="editActivityName" type="text" onChange={this.props.handleChange} required/>
                        </FormGroup>
                    </Modal.Body>
            
                    <Modal.Footer>
                    <Button name="closeEditActivityButton" onClick={this.props.close}>Close</Button>
                    <Button type="submit" bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </form>
        </Modal>
        );
    }
}

export class DeleteActivityModal extends Component{
    render(){
        return(
        <Modal show={this.props.showDeleteActivityModal} onHide={this.props.close}>
            <form onSubmit={this.props.handleSubmit} name="deleteActivityForm">
                <Modal.Header>
                <Modal.Title>Delete Activity</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                Are you sure you want to delete the activity <strong>{this.props.deletableActivityName}</strong>?
                </Modal.Body>
        
                <Modal.Footer>
                <Button name="closeDeleteActivityButton" onClick={this.props.close}>Close</Button>
                <Button type="submit" className="btn btn-danger" bsStyle="primary">Remove</Button>
                </Modal.Footer>
            </form>
        </Modal>
        );
    }
}
