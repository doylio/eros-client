//Libraries
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Switch from 'react-switch';

//Local
import './modal.css';
import LoadingBox from './LoadingBox';


class Admin extends Component {
	constructor(props) {
		super();
		this.state = {
			editModalOpen: true,
			createModalOpen: false,
			switchChecked: true,
			loading: false,
			errorMsg: '',
		}
	}

  	render() {
  		const modalStyle = {
			modal: 'card p-5 server-modal'
		}

  		if(this.props.superuser) {
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
			        		<tr style={{cursor: 'pointer'}}>
			        			<th scope='row'>1</th>
			        			<td>shawn.doyle</td>
			        			<td>Yes</td>
			        			<td>4/6/17</td>
			        		</tr>
			           		<tr style={{cursor: 'pointer'}}>
			        			<th scope='row'>2</th>
			        			<td>simon.gravel</td>
			        			<td>Yes</td>
			        			<td>9/10/18</td>
			        		</tr>
			        		<tr style={{cursor: 'pointer'}}>
			        			<th scope='row'>3</th>
			        			<td>luke.skywalker</td>
			        			<td>No</td>
			        			<td>7/3/12</td>
			        		</tr>
			        		<tr style={{cursor: 'pointer'}}>
			        			<th scope='row'>4</th>
			        			<td>han.solo</td>
			        			<td>No</td>
			        			<td>6/11/19</td>
			        		</tr>
			        		<tr style={{cursor: 'pointer'}}>
			        			<th scope='row'>5</th>
			        			<td>leia.organa</td>
			        			<td>No</td>
			        			<td>1/8/16</td>
			        		</tr>
			        	</tbody>
			      	</table>
	        		<div className='bg-light p-2 d-flex justify-content-center'>
	        			<button className='btn btn-success m-auto'>New User</button>
	        		</div>

			      	<Modal open={this.state.editModalOpen} onClose={this.onCloseEditModal} classNames={modalStyle} center>
			      		<div>
			      			<div className='row'>
				      			<h2 className='col-8 card-title'>shawn.doyle</h2>
				      			<div class="col-4">
				      				<label htmlFor='admin-switch'>
				      					<span style={{fontSize: '1.4em'}}>Admin&nbsp;</span>
										<Switch onChange={this.toggleSwitch} checked={this.state.switchChecked} id='admin-switch'/>
									</label>
								</div>
							</div>
			      			<h6>Last Login:  12/4/18</h6><br />
			      			<h6>Change Password:</h6>
			      			<div className='container border'>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Enter New Password:</p>
				      				<input className='col-4' type='password' />
				      			</div>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Confirm Password:</p>
				      				<input className='col-4' type='password' />
				      			</div>
				      			<div className='row mb-2'>
				      				<div className='col-7'></div>
				      				<button className='btn btn-info'>Change Pasword</button>
				      			</div>
			      			</div>			      			
			      			<div className='float-none' style={{marginTop: '40px'}}>
				      			<button className='btn btn-danger'>Delete User</button>
			      			</div>
			      			<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
			      		</div>
			      	</Modal>

			      	<Modal open={this.state.createModalOpen} onClose={this.onCloseCreateModal} classNames={modalStyle} center>
			      		<div>
			      			<div className='row'>
				      			<h2 className='col-8 card-title'>Create New User</h2>
							</div>
			      			<div className='container border'>
			      				<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Enter Username:</p>
				      				<input className='col-4' type='text' />
				      			</div>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Enter Password:</p>
				      				<input className='col-4' type='password' />
				      			</div>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Confirm Password:</p>
				      				<input className='col-4' type='password' />
				      			</div>
				      			<div className='row my-2'>
				      				<div className='col-7'></div>
				      				<p><input type='checkbox' />&nbsp;Administrator</p>
				      			</div>
			      			</div>			      			
			      			<div className='d-flex justify-content-center' style={{marginTop: '40px'}}>
				      			<button className='btn btn-success'>Create User</button>
			      			</div>
			      			<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
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

  	onOpenEditModal = () => {
  		this.setState({editModalOpen: true});
  	}

  	onCloseEditModal = () => {
  		this.setState({editModalOpen: false});
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
}

export default Admin;
