//Libraries
import React, { Component } from 'react';

//Local
import NavTabs from './NavTabs';
import Inventory from './Inventory';
import Settings from './Settings';
import Admin from './Admin';

class Contents extends Component {
	constructor(props) {
		super();
		this.state = {
			route: 'admin'
		}
	}

	render() {
    	return (
    		<div className='container mt-9' style={{marginTop: '150px'}}>
    			<NavTabs />
    			{this.state.route === 'inventory'
    				? <Inventory />
    				: (this.state.route === 'settings'
    					? <Settings />
    					: <Admin superuser={true}/>
    				)
    			}
    		</div>
    	);
  	}
}

export default Contents;
