//Libraries
import React, { Component } from 'react';

//Local

class NavTabs extends Component {
	constructor(props) {
		super();
	}

	render() {
    	return (
    		<div>
	    		<ul className='nav nav-tabs nav-fill bg-dark' style={{cursor: 'pointer'}}>
	    			<li className='nav-item'>
	    				<p onClick={this.tabSelect} className='nav-link active' value='inventory' >Inventory</p>
	    			</li>
	    			<li className='nav-item'>
	    				<p onClick={this.tabSelect} className='nav-link text-primary' value='settings' >Settings</p>
	    			</li>
	    			<li className='nav-item'>
	    				<p onClick={this.tabSelect} className='nav-link text-primary' value='admin' >Admin Settings</p>
	    			</li>
	    		</ul>
    		</div>
    	);
  	}

  	tabSelect = (evt) => {
  		let links = document.querySelectorAll('.nav-link');
  		links.forEach(link => {
  			link.classList.remove('active');
  			link.classList.add('text-primary');
  		})
  		evt.target.classList.add('active');
  		this.props.changeRoute(evt.target.getAttribute('value'));
  	}
}

export default NavTabs;
