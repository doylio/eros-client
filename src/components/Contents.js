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
			route: 'inventory'
		}
	}

	render() {
    	return (
    		<div className='container mt-9' style={{marginTop: '150px'}}>
    			<NavTabs changeRoute={this.changeRoute} />
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

    changeRoute = (route) => {
        this.setState({route});
    }
}

export default Contents;
