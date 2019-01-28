//Libraries
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

//Local
import LoadingBox from './LoadingBox';
import EditMenu from './EditMenu';
import {serverUrl} from './../config/config.json';
import './modal.css';

class Inventory extends Component {
	constructor(props) {
		super();
		this.state = {
			itemList: null,
			editModalItem: null,
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
		        				this.state.itemList.map((item, i) => {
		        					return (
										<tr style={{cursor: 'pointer'}} key={i + 1} onClick={() => this.openEditModal(item)} >
						        			<th scope='row'>{i + 1}</th>
						        			<td>{this.state.itemList[i].name}</td>
						        			<td>{this.state.itemList[i].IP_address}</td>
						        			<td>{this.state.itemList[i].active ? 'Active' : 'Inactive'}</td>
						        		</tr>
						        	);
		        				})
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

			    {
			    	this.state.editModalItem === null ?
			    	<div></div> :
			    	<EditMenu item={this.state.editModalItem} onClose={this.onCloseEditModal} updateChanges={this.updateChanges} deleteItem={this.deleteItem} />
			    }
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
				this.setState({itemList: items, loading: false});
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Unable to get Inventory'});
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
				itemList.push(item);
	        	this.setState({loading: false, itemList, createModalOpen: false});
			}).catch(e => {
				this.setState({errorMsg: 'Unable to create server', loading: false});
			});
	}

	openEditModal = (item) => {
		this.setState({editModalItem: item});
	}
	onCloseEditModal = () => {
		this.setState({editModalItem: null});
	}
	onOpenCreateModal = () => {
		this.setState({createModalOpen: true, NSName: '', NSStack: '', NSNotes: ''});
	}
	onCloseCreateModal = () => {
		this.setState({createModalOpen: false});
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

	updateChanges = (item) => {
		let {itemList} = this.state;
		itemList = itemList.map(n => {
			if(n._id === item._id) {
				return item;
			}
			return n;
		})
		this.setState({itemList});
	}

	deleteItem = () => {
		let {_id} = this.state.editModalItem;
		let {itemList} = this.state;
		itemList = itemList.filter(item => item._id !== _id);
		this.setState({itemList, editModalItem: null});
	}
}

export default Inventory;
