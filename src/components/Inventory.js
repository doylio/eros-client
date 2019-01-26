//Libraries
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Switch from 'react-switch';

//Local
import './modal.css';

class Inventory extends Component {
	constructor(props) {
		super();
		this.state = {
			editModalOpen: true,
			createModalOpen: false,
			switchChecked: true,
		};
	}
  
	render() {
		const modalStyle = {
			modal: 'card p-5 server-modal'
		}


		return (
		    <div className='rounded-bottom'>
		        <table className='table table-light table-hover'>
		        	<thead className='thead-dark'>
		        		<tr>
		        			<th scope='col'>#</th>
		        			<th scope='col'>Name</th>
		        			<th scope='col'>IP Address</th>
		        			<th scope='col'>Status</th>
		        		</tr>
		        	</thead>
		        	<tbody>
		        		<tr style={{cursor: 'pointer'}}>
		        			<th scope='row'>1</th>
		        			<td>Delta</td>
		        			<td>23.123.44.0</td>
		        			<td>Active</td>
		        		</tr>
		           		<tr style={{cursor: 'pointer'}}>
		        			<th scope='row'>2</th>
		        			<td>Gamma</td>
		        			<td>34.14.220.40</td>
		        			<td>Active</td>
		        		</tr>
		        		<tr style={{cursor: 'pointer'}}>
		        			<th scope='row'>3</th>
		        			<td>Epsilon</td>
		        			<td>12.4.20.142</td>
		        			<td>Active</td>
		        		</tr>
		        		<tr style={{cursor: 'pointer'}}>
		        			<th scope='row'>4</th>
		        			<td>Theta</td>
		        			<td>90.41.119.164</td>
		        			<td>Active</td>
		        		</tr>
		        		<tr style={{cursor: 'pointer'}}>
		        			<th scope='row'>5</th>
		        			<td>Omega</td>
		        			<td>8.57.204.93</td>
		        			<td>Active</td>
		        		</tr>
		        	</tbody>
		      	</table>
		      	<Modal open={this.state.editModalOpen} onClose={this.onCloseEditModal} classNames={modalStyle} center>
		      		<div>
		      			<div className='row'>
			      			<h2 className='col-9 card-title'>Delta</h2>
			      			<div class="col-3">
								<Switch onChange={this.toggleSwitch} checked={this.state.switchChecked} aria-label='on/off-switch' />
							</div>
						</div>
		      			<h6>IP Address: 123.43.74.2</h6>
		      			<h6>Stack Type:  LAMP</h6>
		      			<h6>Notes:</h6>
		      			<p className='border p-3'>This server is broken.</p>
		      			<button className='btn btn-info float-right'>Edit notes</button>
		      			<div className='float-none' style={{marginTop: '80px'}}>
			      			<button className='btn btn-warning'>Reboot</button>&nbsp;&nbsp;&nbsp;&nbsp;
			      			<button className='btn btn-danger'>Reset</button>
		      			</div>
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

			      		</div>
			      	</Modal>
		    </div>
    	);
	}

	onOpenModal = () => {
		this.setState({editModalOpen: true});
	}
	onCloseEditModal = () => {
		this.setState({editModalOpen: false});
	}
	toggleSwitch = (switchChecked) => {
		this.setState({switchChecked});
	}
}

export default Inventory;
