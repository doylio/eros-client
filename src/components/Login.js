//Libraries
import React, { Component } from 'react';

//Local
import logo from './bow-and-arrow.png';


class Login extends Component {
  render() {
    return (
      <div className='w-100' style={{position: 'fixed', top: '180px'}}>
      	<div className='container-fluid'>
	        <div className='card m-auto rounded' style={{backgroundColor: '#0F0E08', maxWidth: '500px'}}>
	        	<div className='d-inline-flex mx-auto my-4'>
	        		<img src={logo} height='100px'/>
	        		<h1 className='text-light' style={{fontSize:'77px'}}>EROS</h1>
	        	</div>
	        	<div className='container px-5 pb-5 w-75'>
					<div class="form-group">
					    <label className='text-light' for="username-input">Username</label>
					    <input type="email" class="form-control" id="username-input" placeholder="Username" />
					</div>
					<div class="form-group">
					    <label className='text-light' for="password-input">Password</label>
					    <input type="password" class="form-control" id="password-input" placeholder="Password" />
					</div>
				 	<button class="btn btn-danger">Submit</button>
	        	</div>
	        </div>
        </div>
      </div>
    );
  }
}

export default Login;
