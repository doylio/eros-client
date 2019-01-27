//Libraries
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Switch from 'react-switch';

//Local
import LoadingBox from './LoadingBox';
import {serverUrl} from './../config/config.json';
import './modal.css';

class Inventory extends Component {
	constructor(props) {
		super();
		this.state = {
			itemList: null,
			editModalOpen: false,
			editModalTarget: {
				name: '',
				IP_address: '',
				stackType: '',
				notes: '',
			},
			NSName: '',
			NSStack: '',
			NSNotes: '',
			createModalOpen: false,
			switchChecked: true,
			errorMsg: '',
			loading: true,
		};
	}
  
	render() {
		const modalStyle = {
			modal: 'card p-5 server-modal'
		}


		return (
		    <div className='rounded-bottom'>
		        <table className='table table-light table-hover mb-0'>
		        	<thead className='thead-dark'>
		        		<tr>
		        			<th scope='col'>#</th>
		        			<th scope='col'>Name</th>
		        			<th scope='col'>IP Address</th>
		        			<th scope='col'>Status</th>
		        		</tr>
		        	</thead>
		        	<tbody>
		        			{
		        				this.state.itemList === null ?
		        				<tr></tr> :
		        				this.state.itemList
		        			}
		        	</tbody>
		      	</table>
	      		<div className='bg-light p-2 d-flex justify-content-center'>
	      			<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
	      		</div>
	      		<div className='bg-light p-2 d-flex justify-content-center'>
        			<button className='btn btn-success m-auto' onClick={this.onOpenCreateModal}>
        				New Server
        			</button>
        		</div>

		      	<Modal open={this.state.editModalOpen} onClose={this.onCloseEditModal} classNames={modalStyle} center>
		      		<div>
		      			<div className='row'>
			      			<h2 className='col-9 card-title'>{this.state.editModalTarget.name}</h2>
			      			<div class="col-3">
								<Switch onChange={this.toggleSwitch} checked={this.state.switchChecked} aria-label='on/off-switch' />
							</div>
						</div>
		      			<h6>IP Address: {this.state.editModalTarget.IP_address}</h6>
		      			<h6>Stack Type:  {this.state.editModalTarget.stackType}</h6>
		      			<h6>Notes:</h6>
		      			<p className='border p-3'>{this.state.editModalTarget.notes}</p>
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
				      			<h2 className='col-8 card-title'>New Server</h2>
							</div>
			      			<div className='container border'>
			      				<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Name:</p>
				      				<input className='col-4' type='text' onChange={this.onNSNameChange} />
				      			</div>
				      			<div className='row py-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Select Stack Type:</p>
				      				<select onChange={this.onNSStackChange}>
				      						<option value=''>-</option>
				      						<option value='LAMP'>LAMP</option>
				      						<option value='MEAN'>MEAN</option>
				      						<option value='Ruby'>Ruby</option>
				      						<option value='Django'>Django</option>
				      				</select>
				      			</div>
				      			<div className='row pt-2'>
				      				<div className='col-1'></div>
				      				<p className='col-6'>Notes:</p>
				      			</div>
				      			<div className='row'>
				      				<div className='col-1'></div>
				      				<div className='col-10'>
				      					<textarea className='w-100' onChange={this.onNSNotesChange}></textarea>
				      				</div>
				      			</div>				      			
			      			</div>			      			
			      			<div className='d-flex justify-content-center' style={{marginTop: '40px'}}>
				      			<button className='btn btn-success' onClick={this.onNewServerButton} >Create Server</button>
			      			</div>
			      			<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
			      		</div>
			    </Modal>
		    </div>
    	);
	}

	componentDidMount() {
		this.retrieveInventory();
	}

	retrieveInventory = () => {
		this.setState({loading: true, errorMsg: ''});
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'GET',
			mode: 'cors',
			headers: {
				'x-auth': token,
			}
		}
		fetch(serverUrl + '/item', fetchData)
			.then(res => {
				if(res.status === 200) {
					return res.json();
				} else {
					throw new Error();
				}
			}).then(json => {
				let {items} = json;
				if(items.length === 0) {
					return this.setState({loading: false, errorMsg: 'No items found'})
				}
				let itemList = [];
				for(let i = 0; i < items.length; i++) {
					itemList.push(
						<tr style={{cursor: 'pointer'}} key={i + 1} onClick={() => this.onOpenEditModal(items[i])} >
		        			<th scope='row'>{i + 1}</th>
		        			<td>{items[i].name}</td>
		        			<td>{items[i].IP_address}</td>
		        			<td>{items[i].active ? 'Active' : 'Inactive'}</td>
		        		</tr>
		        	);
				}
				this.setState({itemList, loading: false});
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Unable to retrieve Inventory'});
			});
	}

	onNewServerButton = () => {
		if(this.state.NSName === '' || this.state.NSStack === '') {
			return this.setState({errorMsg: "Please select name and stack type"})
		}
		this.setState({loading: true, errorMsg: ''});
		let name = this.state.NSName;
		let notes = this.state.NSNotes;
		let stackType = this.state.NSStack;
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({name, stackType, notes}),
			headers: {
				'x-auth': token,
				'Content-Type': 'application/json'
			},
		}
		fetch(serverUrl + '/item', fetchData)
			.then(res => {
				if(res.status === 200) {
					return res.json();
				} else {
					throw new Error();
				}
			}).then(json => {
				let {item} = json;
				let {itemList} = this.state;
				itemList.push(
					<tr style={{cursor: 'pointer'}} key={itemList.length + 1} onClick={() => this.onOpenEditModal(item)} >
	        			<th scope='row'>{itemList.length + 1}</th>
	        			<td>{item.name}</td>
	        			<td>{item.IP_address}</td>
	        			<td>{item.active ? 'Active' : 'Inactive'}</td>
	        		</tr>
	        	);
	        	this.setState({loading: false, itemList, createModalOpen: false});
			}).catch(e => {
				this.setState({errorMsg: 'Unable to create server', loading: false});
			});
	}

	onOpenEditModal = (target) => {
		this.setState({editModalOpen: true, editModalTarget: target});
	}
	onCloseEditModal = () => {
		this.setState({editModalOpen: false});
	}
	onOpenCreateModal = () => {
		this.setState({createModalOpen: true, NSName: '', NSStack: '', NSNotes: ''});
	}
	onCloseCreateModal = () => {
		this.setState({createModalOpen: false});
	}

	toggleSwitch = (switchChecked) => {
		this.setState({switchChecked});
	}
	onNSNameChange = (e) => {
		this.setState({NSName: e.target.value});
	}
	onNSStackChange = (e) => {
		this.setState({NSStack: e.target.value});
	}
	onNSNotesChange = (e) => {
		this.setState({NSNotes: e.target.value});
	}
}

export default Inventory;
