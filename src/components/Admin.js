//Libraries
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

//Local
import './modal.css';
import LoadingBox from './LoadingBox';
import EditUser from './EditUser';
import {serverUrl} from './../config/config';


class Admin extends Component {
	constructor(props) {
		super();
		this.state = {
			users: null,
			createModalOpen: false,
			switchChecked: true,
			loading: false,
			errorMsg: '',
			newUserUsername: '',
			newUserPassword: '',
			confirmPassword: '',
			editUser: null,
			superuser: true,
		}
	}

  	render() {
  		const modalStyle = {
			modal: 'card p-5 server-modal'
		}
 
  		if(this.state.superuser) {
  			return (
			    <div>
					<table className='table table-light table-hover mb-0'>
			        	<thead className='thead-dark'>
			        		<tr>
			        			<th scope='col'>#</th>
			        			<th scope='col'>Username</th>
			        			<th scope='col'>Administrator</th>
			        			<th scope='col'>Last Login</th>
			        		</tr>
			        	</thead>
			        	<tbody>
			        		{
			        			this.state.users === null ?
			        			<tr></tr> :
			        			this.state.users.map((user, i) => {
			        				return (
				        				<tr style={{cursor: 'pointer'}} key={i + 1} onClick={() => this.onOpenEditModal(user)} >
						        			<th scope='row'>{i + 1}</th>
						        			<td>{user.username}</td>
						        			<td>{user.superuser ? 'Yes' : 'No'}</td>
						        			<td>{user.lastLogin}</td>
						        		</tr>
						        	);
			        			})
			        		}
			        	</tbody>
			      	</table>
	        		<div className='bg-light p-2 d-flex justify-content-center'>
	        			<button onClick={this.onOpenCreateModal} className='btn btn-success m-auto'>New User</button>
	        		</div>
	        		<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />

			      	{
			      		this.state.editUser === null ?
			      		<div></div> :
			      		<EditUser user={this.state.editUser} onClose={this.onCloseEditModal} updateChanges={this.updateChanges} deleteUser={this.deleteUser} />
			      	}

			      	<Modal open={this.state.createModalOpen} onClose={this.onCloseCreateModal} classNames={modalStyle} center>
			      		<div>
			      			<div className='row'>
				      			<h2 className='col-8 card-title'>Create New User</h2>
							</div>
			      			<div className='container border'>
			      				<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Enter Username:</p>
				      				<input className='col-4' type='text' onChange={this.onNewUserNameChange} />
				      			</div>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Enter Password:</p>
				      				<input className='col-4' type='password' onChange={this.onNewUserPasswordChange} />
				      			</div>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Confirm Password:</p>
				      				<input className='col-4' type='password' onChange={this.onConfirmPasswordChange} />
				      			</div>
				      			<div className='row my-2'>
				      				<div className='col-7'></div>
				      				<p><input id='su-check' type='checkbox' />&nbsp;Administrator</p>
				      			</div>
			      			</div>			      			
			      			<div className='d-flex justify-content-center' style={{marginTop: '40px'}}>
				      			<button className='btn btn-success' onClick={this.onNewUserBtn} >Create User</button>
			      			</div>
  				      		<div className='bg-light p-2 d-flex justify-content-center'>
				      			<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
				      		</div>
			      		</div>
			      	</Modal>
			    </div>
		    );
  		} else {
  			return (
  				<div className='bg-light container p-5 text-center rounded-bottom'>
  					<h5>You must be an administrator to access these settings</h5>
  				</div>
  			);
  		}
  	}

  	componentDidMount = () => {
  		this.retrieveUsers();
  	}

  	retrieveUsers = () => {
  		this.setState({loading: true, errorMsg: ''});
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'GET',
			mode: 'cors',
			headers: {
				'x-auth': token,
			}
		}
		fetch(serverUrl + '/user', fetchData)
			.then(res => {
				if(res.status === 200) {
					return res.json();
				} else if(res.status === 401) {
					return this.setState({superuser: false});
				} else {
					throw new Error();
				}
			}).then(json => {
				let {users} = json;
				if(users.length === 0) {
					return this.setState({loading: false, errorMsg: 'No items found'});
				}
				this.setState({users, loading: false});
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Unable to get user data'});
			});
  	}

  	onOpenEditModal = (user) => {
  		this.setState({editUser: user});
  	}

  	onCloseEditModal = () => {
  		this.setState({editUser: null});
  	}

  	onOpenCreateModal = () => {
  		this.setState({createModalOpen: true});
  	}

  	onCloseCreateModal = () => {
  		this.setState({createModalOpen: false});
  	}

  	toggleSwitch = (switchChecked) => {
  		this.setState({switchChecked});
  	}

  	onNewUserNameChange = (evt) => {
  		this.setState({newUserUsername: evt.target.value});
  	}

  	onNewUserPasswordChange = (evt) =>{
  		this.setState({newUserPassword: evt.target.value});
  	}

  	onConfirmPasswordChange = (evt) => {
  		this.setState({confirmPassword: evt.target.value});
  	}

  	onNewUserBtn = () => {
  		let {newUserUsername, newUserPassword, confirmPassword} = this.state;
  		if(newUserPassword === '' || newUserUsername === '' || confirmPassword === '') {
  			return this.setState({errorMsg: 'Please enter a username and password'});
  		}
  		if(newUserPassword !== confirmPassword) {
  			return this.setState({errorMsg: 'Passwords do not match'});
  		}
  		this.setState({loading: true, errorMsg: ''});
  		let superuser = document.querySelector('#su-check').checked;
  		let token = localStorage.getItem('ErosToken');
  		let newUser = {
  			username: newUserUsername,
  			password: newUserPassword,
  			superuser
  		}
		let fetchData = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'x-auth': token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser),
		};
		return fetch(serverUrl + '/user', fetchData)
			.then(res => {
				if(res.status === 200) {
					return res.json();
				}
			}).then(json => {
				let {user} = json;
				let {users} = this.state;
				users.push(user);
				this.setState({users, loading: false, createModalOpen: false});
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Error: Unable to create user'});
			})
  	}

  	updateChanges = (user) => {
		let {users} = this.state;
		users = users.map(n => {
			if(n._id === user._id) {
				return user;
			}
			return n;
		})
		this.setState({users});
	}

	deleteUser = () => {
		let {_id} = this.state.editUser;
		let {users} = this.state;
		users = users.filter(user => user._id !== _id);
		this.setState({users, editUser: null});
	}
}

export default Admin;
