import React, { Component } from 'react';
import axios from 'axios' ;
import {CreateBucketModal, DeleteBucketModal, EditBucketModal,  MainPage} from './BucketListComponent.js';
import {CreateActivityModal, DeleteActivityModal, EditActivityModal} from './ActivityListComponent.js';
export class BucketList extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.open = this.open.bind(this);
        this.openActivities = this.openActivities.bind(this);
        this.close = this.close.bind(this);
        this.state={
            buckets: [],//dictionary of buckets of a user 
            showModal: false,//status of create Modal
            new_bucket: '',//variable for create bucket form
            createBucketError:'',//variable for helpblock on creating a bucket
            createStatusForm: null,//variable for setting status for create form
            potentialBucketName: '',//variable for new name of edit
            previousBucketName: '',//variable name before editing
            showModalEdit: false,//status of edit modal
            showModalDelete: false,//status of delete modal
            editBucketID: null,//variable for the id of the item to be edited
            editBucketError:'',//variable for helpblock for editing a bucket
            editStatusForm: null,//variable for setting status of edit form
            deleteBucketID: null,//variable for bucket id on delete
            deletableBucketName: '',//variable for bucket name on delete
            activities: [],//dictionary for activites of a user 
            showActivityModal: false,//status of create activity modal
            newActivity: '',//variable for create activity form
            createStatusActivityForm: null,//variable for setting activity status for create form
            createActivityError: '',//variable for setting activity error message
            bucketIDCreateActivity:null,//Id for bucket to view activities
            showEditActivityModal: null,//status of edit activity modal
            potentialActivityName: '',//variable for new activity of edit
            activityID: null,//variable for the id of an activity
            editActivityError: '',//error message for edit activity
            editStatusActivityForm: null,//Error status for edit activity
            previousActivityName: '',//variable for previous activity before editing
            showDeleteActivityModal: false,//variable for status of showing delete activity modal
            deletableActivityName: '',//variable fo the activity name about to be deleted
            bucketFound: [],//variable for bucket list found
            searchBucketError: '',//variable for error on search
            searchBucketStatus: null,//variable for status on search
            bucketChosen:'{No bucket chosen to display}',//variable for bucket list
            activityButtonStatus: true,//variable
        }
    }
    componentWillMount(){
        var token = localStorage.getItem('bucketListToken');
        var authorizationValue = {
            headers: {'Authorization': token}
          };
        axios.get('http://localhost:5000/bucketlists/', authorizationValue
        ).then( response => {
            this.setState({buckets:response.data})
            console.log(response);
            console.log(response.status);
        })
        .catch( error => {
            console.log(error);
        });
    }
    updateTable(){
        var token = localStorage.getItem('bucketListToken');
        var authorizationValue = {
            headers: {'Authorization': token}
          };
        axios.get('http://localhost:5000/bucketlists/', authorizationValue
        ).then( response => {
            this.setState({buckets:response.data})
            console.log(response);
            console.log(response.status);
        })
        .catch( error => {
            console.log(error);
        });
        if (this.state.bucketIDCreateActivity != null )
            {
            axios.get('http://localhost:5000/bucketlists/' + this.state.bucketIDCreateActivity +'/items/', authorizationValue
            ).then( response => {
                this.setState({activities:response.data});
                console.log(response.data);
            })
            .catch( error => {
                console.log(error);
            });
            }
    }

    handleChange(e){
        if (e.target.name === "bucket_name")
            {
            this.setState({new_bucket:e.target.value})
            console.log(this.state.new_bucket);
            }
        if(e.target.name === "editBucketName")
            {
            this.setState({potentialBucketName: e.target.value});
            }
        if(e.target.name === "activity_name")
            {
            this.setState({newActivity:e.target.value})
            console.log(this.state.newActivity) 
            }
        if (e.target.name === "editActivityName")
            {
            this.setState({potentialActivityName: e.target.value});
            console.log (this.state.potentialActivityName);
            }
        if (e.target.name === "searchBucket")
            {
            if (e.target.value !== '')
                {
                var token = localStorage.getItem('bucketListToken');
                var authorizationValue = {headers: {'Authorization': token}};
                var searchParameter = {params: {q: e.target.value}};
                axios.get('http://localhost:5000/bucketlists/?q='+ e.target.value,
                authorizationValue, searchParameter
                ).then( response => {
                    if (response.data["message"])
                        {
                        this.setState({
                            searchBucketStatus: "warning",
                            searchBucketError: response.data["message"],
                            bucketFound: []
                        });
                        }
                    else
                    this.setState({
                        bucketFound: response.data,
                        searchBucketError: '',
                        searchBucketStatus: null
                    });

                })
                .catch( error => {
                    console.log(error);
                });
                }
            else
                {
                this.setState({
                    bucketFound:[],
                    searchBucketError:'',
                    searchBucketStatus: null
                });
                };
            }
    }
    openActivities(event){
        event.preventDefault()
        this.setState({bucketIDCreateActivity:event.target.value});
        var token = localStorage.getItem('bucketListToken');
        var authorizationValue = {headers: {'Authorization': token}};
        this.setState({
            bucketChosen: event.target.id,
            activityButtonStatus: false
        })
        axios.get('http://localhost:5000/bucketlists/' + event.target.value +'/items/', authorizationValue
        ).then( response => {
            this.setState({
                activities:response.data,
            });
            console.log(response.data);
        })
        .catch( error => {
            console.log(error);
        });
    }
    handleSubmit(event){
        event.preventDefault();
        var token = localStorage.getItem('bucketListToken');
        var authorizationValue = {headers: {'Authorization': token}};
        if (event.target.name === "createBucketForm")
            {
            axios.post('http://localhost:5000/bucketlists/', {name: this.state.new_bucket}, authorizationValue
            ).then( response => {
                this.setState({
                    createBucketError: '',
                    createStatusForm: null,
                    showModal: false
                });
                this.updateTable();
            })
            .catch( error => {
                this.setState({
                    createBucketError: error.response.data["message"],
                    createStatusForm: "error"});
            });
            }
        if (event.target.name === "editBucketForm")
            {
            axios.put('http://localhost:5000/bucketlists/' + this.state.editBucketID,
                {name: this.state.potentialBucketName}, authorizationValue
            ).then( response => {
                this.setState({ showModalEdit: false });
                this.setState({previousBucketName: ''});
                this.componentWillMount();
            })
            .catch( error => {
                console.log(error);
                this.setState({
                    editBucketError:error.response.data["message"],
                    editStatusForm:"error"
                });
            });
            }
        if (event.target.name === "deleteBucketForm")
            {
            axios.delete('http://localhost:5000/bucketlists/' + this.state.deleteBucketID,
                         authorizationValue
            ).then( response => {
                this.setState({ showModalDelete: false });
                this.componentWillMount();
            })
            .catch( error => {
                console.log(error);
            });
            }
        if(event.target.name === "createActivityForm")
            {
            var urlString = this.state.bucketIDCreateActivity+'/items/';
            axios.post('http://localhost:5000/bucketlists/'+urlString,
                       {activity_name: this.state.newActivity}, authorizationValue
            ).then( response => {
                this.setState({
                    showActivityModal:false,
                    createStatusActivityForm: null,
                    createActivityError: ''});
                this.updateTable()
                console.log(response.data);
            })
            .catch( error => {
                console.log(error);
                this.setState({createStatusActivityForm: "error"});
                this.setState({createActivityError: error.response.data["message"]});
            });
            }
        if(event.target.name === "editActivityForm")
            {
            axios.put('http://localhost:5000/bucketlists/' + this.state.bucketIDCreateActivity + '/items/' +
            this.state.activityID, {activity_name: this.state.potentialActivityName}, authorizationValue)
            .then( response => {
                this.setState({
                    editActivityError: '',
                    editStatusActivityForm: null,
                    previousActivityName: '',
                    showEditActivityModal: false
            });
                this.updateTable();
                console.log(response.data);
            })
            .catch( error => {
                console.log(error);
                this.setState({
                    editActivityError:error.response.data["message"],
                    editStatusActivityForm: "error"
                });

            });
            }
        if(event.target.name === "deleteActivityForm")
            {
            axios.delete('http://localhost:5000/bucketlists/' + this.state.bucketIDCreateActivity + '/items/'+
            this.state.activityID, authorizationValue)
            .then( response => {
            this.setState({
                deletableActivityName: '',
                showDeleteActivityModal: false
            }); 
                this.updateTable();
                console.log(response.data);
            })
            .catch( error => {
                console.log(error);
            });
            }
    }
    open(e) {
        console.log(e);
        if (e.target.name === "createBucketButton")
            {    
            this.setState({ showModal: true });
            }
        if (e.target.name === "editBucketButton")
            {
            this.setState({
                editBucketID: e.target.value,
                showModalEdit: true,
                previousBucketName: e.target.id
            });
            }
        if (e.target.name === "deleteBucketButton")
            {
            this.setState({
                deleteBucketID: e.target.value,
                showModalDelete: true,
                deletableBucketName: e.target.id
            });
            }
        if (e.target.name === "createActivityButton")
            {
            this.setState({ showActivityModal: true });
            }
        if (e.target.name === "editActivityButton")
            {
            this.setState({
                previousActivityName: e.target.id,
                activityID: e.target.value,
                showEditActivityModal:true
            });
            }
        if (e.target.name === "deleteActivityButton")
            {
            this.setState({
                deletableActivityName: e.target.id,
                activityID: e.target.value,
                showDeleteActivityModal: true
            });
            }
        if (e.target.name ==="searchButton")
            {
            this.setState({bucketIDCreateActivity:e.target.id});
            var token = localStorage.getItem('bucketListToken');
            var authorizationValue = {headers: {'Authorization': token}};
            this.setState({
                bucketChosen: e.target.value,
                activityButtonStatus: false
                })
            axios.get('http://localhost:5000/bucketlists/' + e.target.id +'/items/', authorizationValue
            ).then( response => {
                this.setState({
                    activities:response.data,
                    });
                console.log(response.data);
                })
            .catch( error => {
                console.log(error);
                });
            }
      }
    close(e) {
        if (e === undefined )
            {
            this.setState({ 
                showModal: false,
                showModalEdit: false,
                editBucketID: null,
                showModalDelete: false,
                showActivityModal: false,
                editBucketError: '',
                editStatusForm: null,
                createStatusActivityForm: null,
                createActivityError: '',
                showEditActivityModal:false,
                editActivityError:'',
                editStatusActivityForm: null,
                showDeleteActivityModal: false
            });
            }
        else{
            if (e.target.name === "closeBucketButton")
                {
                this.setState({ 
                    showModal: false,
                    createBucketError: '',
                    createStatusForm: null
                });
                }
            if (e.target.name === "closeEditButton" )
                {
                this.setState({
                    showModalEdit: false,
                    editBucketID: null,
                    editBucketError: '',
                    editStatusForm: null
                });
                }
            if (e.target.name === "closeDeleteButton")
                {
                this.setState({showModalDelete: false});
                }
            if (e.target.name === "closeActivityButton")
                {
                this.setState({
                    showActivityModal: false,
                    createStatusActivityForm: null,
                    createActivityError: ''
                });
                }
            if (e.target.name === "closeEditActivityButton")
                {
                this.setState({
                    showEditActivityModal:false,
                    editActivityError:'',
                    editStatusActivityForm: null
                });
                }
            if (e.target.name === "closeDeleteActivityButton")
                {
                console.log("asdfasd")
                this.setState({
                    showDeleteActivityModal:false,
                    deletableActivityName: ''
                });
                }
            }
    }
    render(){

        return(
            <div>
                <MainPage open={this.open} data={this.state.buckets} openActivities={this.openActivities}
                bucketChosen={this.state.bucketChosen} activityButtonStatus={this.state.activityButtonStatus}
                activityData={this.state.activities} searchBucketError={this.state.searchBucketError} value={this.state.value}
                searchBucketStatus={this.state.searchBucketStatus} handleChange={this.handleChange} searchData={this.state.bucketFound}
                />
                <div>
                    <CreateBucketModal showModal={this.state.showModal} close={this.close} handleSubmit={this.handleSubmit}
                    createStatusForm={this.state.createStatusForm} createBucketError={this.state.createBucketError}
                    handleChange={this.handleChange} close={this.close}/>
                    <EditBucketModal edit={this.state.showModalEdit} close={this.close} handleSubmit={this.handleSubmit} 
                    bucketName={this.state.previousBucketName} editStatusForm={this.state.editStatusForm} 
                    editBucketError={this.state.editBucketError}  handleChange={this.handleChange} />
                    <DeleteBucketModal deletableBucketName={this.state.deletableBucketName} handleSubmit={this.handleSubmit}
                    close={this.close} delete={this.state.showModalDelete}/>
                    <CreateActivityModal showActivityModal={this.state.showActivityModal} close={this.close} handleSubmit={this.handleSubmit}
                    createStatusActivityForm={this.state.createStatusActivityForm} createActivityError={this.state.createActivityError}
                    handleChange={this.handleChange}/>
                    <EditActivityModal handleChange={this.handleChange} showEditActivityModal={this.state.showEditActivityModal} close={this.close}
                    handleSubmit={this.handleSubmit} editActivityError={this.state.editActivityError} editStatusActivityForm={this.state.editStatusActivityForm}
                    previousActivityName={this.state.previousActivityName}/>
                    <DeleteActivityModal showDeleteActivityModal={this.state.showDeleteActivityModal} close={this.close}
                    handleSubmit={this.handleSubmit} deletableActivityName={this.state.deletableActivityName}
                    />
                </div>
            </div>
        );
    }
}
