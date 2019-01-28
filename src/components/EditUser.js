//Libraries
import React from 'react';
import Modal from 'react-responsive-modal';
import Switch from 'react-switch';

//Local
import LoadingBox from './LoadingBox';
import {serverUrl} from './../config/config.json';

class EditUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			errorMsg: '',
			deleteModal: false,
			password: '',
			confirmPw: '',
		}
	}
	componentWillMount() {
		const {user} = this.props;
		this.setState({user});
	}

	render() {
		let {user} = this.state;
		return (
			<div>
				<Modal open={true} onClose={this.props.onClose} classNames={{modal: 'card p-5 server-modal'}} center>
		      		<div>
		      			<div className='row'>
			      			<h2 className='col-8 card-title'>{user.username}</h2>
			      			<div className="col-4">
			      				<label htmlFor='admin-switch'>
			      					<span style={{fontSize: '1.4em'}}>Admin&nbsp;</span>
									<Switch onChange={this.onAdminSwitch} checked={user.superuser} id='admin-switch'/>
								</label>
							</div>
						</div>
		      			<h6>Last Login:  {user.lastLogin}</h6><br />
		      			<h6>Change Password:</h6>
		      			<div className='container border'>
			      			<div className='row py-2'>
			      				<div className='col-1'></div>
			      				<p className='col-6'>Enter New Password:</p>
			      				<input className='col-4' type='password' onChange={this.onPasswordChange} />
			      			</div>
			      			<div className='row py-2'>
			      				<div className='col-1'></div>
			      				<p className='col-6'>Confirm Password:</p>
			      				<input className='col-4' type='password' onChange={this.onConfirmPwChange} />
			      			</div>
			      			<div className='row mb-2'>
			      				<div className='col-7'></div>
			      				<button className='btn btn-info' onClick={this.onChangePwBtn} >Change Pasword</button>
			      			</div>
		      			</div>			      			
		      			<div className='float-none' style={{marginTop: '40px'}}>
			      			<button className='btn btn-danger' onClick={this.onOpenDeleteModal} >Delete User</button>
		      			</div>
		      			<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
		      		</div>
		      	</Modal>
		      	<Modal open={this.state.deleteModal} onClose={this.onCloseDeleteModal} classNames={{modal: 'rounded'}} >
		      		<br/>
		      		<h5>Are you sure you want to delete?</h5>
		      		<button onClick={this.onDeleteBtn} className='btn btn-danger'>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;
		      		<button onClick={this.closeDeleteModal} className='btn btn-secondary'>Cancel</button>
		      	</Modal>
		     </div>
		);
	}
	onPasswordChange = (evt) => {
		this.setState({password: evt.target.value});
	}

	onConfirmPwChange = (evt) => {
		this.setState({confirmPw: evt.target.value});
	}

	onChangePwBtn = () => {
		let {password, confirmPw} = this.state;
		if(password === '' || confirmPw === '') {
			return this.setState({errorMsg: 'Please enter new password and confirm'});
		}
		if(password !== confirmPw) {
			return this.setState({errorMsg: 'Passwords do not match'});
		}
		this.updateUser({password})
			.then(() => this.setState({errorMsg: 'Password changed'}));
	}

	onOpenDeleteModal = () => {
		this.setState({deleteModal: true});
	}

	onCloseDeleteModal = () => {
		this.setState({deleteModal: false});
	}

	onDeleteBtn = () => {
		this.setState({loading: true, errorMsg: ''});
		let {_id} = this.state.user;
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'x-auth': token,
			},
		}
		fetch(serverUrl + `/user/${_id}`, fetchData)
			.then(res => {
				if(res.status === 200) {
					this.setState({loading: false});
					this.props.deleteUser();
				} else {
					throw new Error();
				}
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Error:  Unable to delete user'});
			})
	}

	onAdminSwitch = (superuser) => {
		this.updateUser({superuser});
	}

	updateUser = (changes) => {
		let {user} = this.state;
		this.setState({loading: true, errorMsg: ''});

		let {_id} = user;
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				'x-auth': token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(changes),
		}
		return fetch(serverUrl + `/user/${_id}`, fetchData)
			.then(res => {
				if(res.status !== 200) {
					throw new Error();
				}
				return res.json();
			}).then(json => {
				this.setState({loading: false, user: json.user});
				this.props.updateChanges(json.user);
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Error: Unable to update user'})
			})

	}
}

export default EditUser;