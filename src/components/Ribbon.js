//Libraries
import React, { Component } from 'react';

//Local
import logo from './bow-and-arrow.png';

class Ribbon extends Component {
  render() {
    return (
      <div className='fixed-top container-fluid px-4 py-2 d-inline-flex w-100' style={{backgroundColor: '#0F0E08'}}>
      	<div className='row justify-content-between w-100'>
	      	<div className='col-xl-11 col-lg-10 col-sm-9 col-xs-9 d-inline-flex'>
		        <img src={logo} height='60px'alt='Eros Logo'/>
		        <h2 className='text-light pt-2 px-4'>Eros Server Manager </h2>
		    </div>
		    <div className='col-xl-1 col-lg-2 col-sm-3 col-xs-3 pt-2 float-right'>
	        	<button className='btn btn-danger w-100'>Logout</button>
	       	</div>
	    </div>
      </div>
    );
  }
}

export default Ribbon;
