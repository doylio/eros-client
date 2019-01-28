//Libraries
import React from 'react';
import Modal from 'react-responsive-modal';
import Switch from 'react-switch';

//Local
import LoadingBox from './LoadingBox';
import {serverUrl} from './../config/config.json';

class EditMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editNoteMode: false,
			loading: false,
			errorMsg: '',
			deleteModal: false,
		}
	}
	componentWillMount() {
		const {item} = this.props;
		this.setState({item});
	}

	render() {
		let {item} = this.state;
		return (
			<div>
				<Modal open={true} onClose={this.props.onClose} classNames={{modal: 'card p-5 server-modal'}} center>
		      		<div>
		      			<div className='row'>
			      			<h2 className='col-9 card-title'>{item.name}</h2>
			      			<div className="col-3">
								<Switch onChange={this.onActiveSwitch} checked={item.active} aria-label='on/off-switch' />
							</div>
						</div>
		      			<h6>IP Address: {item.IP_address}</h6>
		      			<h6>Stack Type:  {item.stackType}</h6>
		      			<h6>Notes:</h6>
		      			{
		      				this.state.editNoteMode ?
		      				<textarea id='notes' className='border p-3 float-clear w-100' defaultValue={item.notes}></textarea> :
		      				<p className='border p-3 font-italic'>{item.notes}</p>
		      			}
		      			<br />
		      			<button onClick={this.onEditNotesBtn} className='btn btn-primary float-right'>
		      			{
		      				this.state.editNoteMode ?
		      				'Submit' : 'Edit Notes'
		      			}
		      			</button>
		      			<div className='float-none' style={{marginTop: '80px'}}>
			      			<button onClick={this.onRebootBtn} className='btn btn-warning'>Reboot</button>&nbsp;&nbsp;&nbsp;&nbsp;
			      			<button onClick={this.openDeleteModal} className='btn btn-danger'>Delete Item</button>
		      			</div>
		      		</div>
		      		<LoadingBox loading={this.state.loading} errorMsg={this.state.errorMsg} />
		      	</Modal>
		      	<Modal open={this.state.deleteModal} onClose={this.closeDeleteModal} >
		      		<br/>
		      		<h5>Are you sure you want to delete?</h5>
		      		<button onClick={this.onDeleteBtn} className='btn btn-danger'>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;
		      		<button onClick={this.closeDeleteModal} className='btn btn-secondary'>Cancel</button>
		      	</Modal>
		     </div>
		);
	}

	onEditNotesBtn = () => {
		if(this.state.editNoteMode) {
			let notes = document.querySelector('#notes').value;
			this.updateItem({notes})
				.then(() => {
					this.setState({editNoteMode: false});
				});
		} else {
			this.setState({editNoteMode: true});
		}	
	}

	onActiveSwitch = (active) => {
		this.updateItem({active});
	}

	onRebootBtn = () => {
		this.setState({loading: true, errorMsg: ''});
		let {_id} = this.state.item;
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'x-auth': token,
			},
		}
		fetch(serverUrl + `/reboot/${_id}`, fetchData)
			.then(res => {
				if(res.status === 200) {
					this.setState({loading: false, errorMsg: 'Reboot successful!'})
				} else {
					throw new Error();
				}
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Error:  Unable to reboot server'});
			})
	}

	onDeleteBtn = () => {
		this.setState({loading: true, errorMsg: ''});
		let {_id} = this.state.item;
		let token = localStorage.getItem('ErosToken');
		let fetchData = {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'x-auth': token,
			},
		}
		fetch(serverUrl + `/item/${_id}`, fetchData)
			.then(res => {
				if(res.status === 200) {
					this.setState({loading: false});
					this.props.deleteItem();
				} else {
					throw new Error();
				}
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Error:  Unable to delete item'});
			})
	}

	openDeleteModal = () => {
		this.setState({deleteModal: true});
	}

	closeDeleteModal = () => {
		this.setState({deleteModal: false});
	}

	updateItem = (changes) => {
		let {item} = this.state;
		this.setState({loading: true, errorMsg: ''});

		let {_id} = item;
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
		return fetch(serverUrl + `/item/${_id}`, fetchData)
			.then(res => {
				if(res.status !== 200) {
					throw new Error();
				}
				return res.json();
			}).then(json => {
				this.setState({loading: false, item: json.item});
				this.props.updateChanges(json.item);
			}).catch(e => {
				this.setState({loading: false, errorMsg: 'Error: Unable to update server'})
			})

	}
}

export default EditMenu;