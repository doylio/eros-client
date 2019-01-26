//Libraries
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

//Local
import Ribbon from './Ribbon';
import Contents from './Contents';
import './modal.css';

class Home extends Component {
	constructor(props) {
		super();
		this.state = {
			modalOpen: false,
			modalMsg: '',
		}
	}

	render() {
		const modalStyle = {
			modal: 'card p-5 server-modal'
		}
    	return (
     		<div className='w-100'>
        		<Ribbon logout={this.props.logout} />
        		<Contents />
        		<Modal open={this.state.modalOpen} onClose={this.onCloseModal} classNames={modalStyle} center>
		      		<div>
		      			<h3>Uh oh!</h3>
		      			<h5>{this.state.modalMsg}</h5>
		      		</div>
		      	</Modal>
      		</div>
    	);
	}

	onCloseModal = () => {
		this.setState({modalOpen: false});
	}

	sendModalMessage = (modalMsg) => {
		this.setState({modalOpen: true, modalMsg});
	}
}

export default Home;
