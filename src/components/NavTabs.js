//Libraries
import React, { Component } from 'react';

//Local

class NavTabs extends Component {
	constructor(props) {
		super();
		this.state = {
			route: 'inventory'
		}
	}

	render() {
    	return (
    		<div>
	    		<ul className='nav nav-tabs nav-fill bg-dark'>
	    			<li className='nav-item'>
	    				<a className='nav-link active' href='#'>Inventory</a>
	    			</li>
	    			<li className='nav-item'>
	    				<a className='nav-link' href='#'>Settings</a>
	    			</li>
	    			<li className='nav-item'>
	    				<a className='nav-link' href='#'>Admin Settings</a>
	    			</li>
	    		</ul>
    		</div>
    	);
  	}
}

export default NavTabs;
