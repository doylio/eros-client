//Libraries
import React, { Component } from 'react';
import {ClipLoader} from 'react-spinners';

//Local
import logo from './bow-and-arrow.png';
import {serverUrl} from './../config/config.json';

class Login extends Component {
	constructor(props) {
		super();
		this.state = {
			loading: false,
			username: '',
			password: '',
			errorMsg: '',
		};
	}

	render() {
	    return (
		    <div className='w-100' style={{position: 'fixed', top: '180px'}}>
		      	<div className='container-fluid'>
			        <div className='card m-auto rounded' style={{backgroundColor: '#0F0E08', maxWidth: '500px'}}>
			        	<div className='d-inline-flex mx-auto my-4'>
			        		<img src={logo} height='100px'alt='Eros logo' />
			        		<h1 className='text-light' style={{fontSize:'77px'}}>EROS</h1>
			        	</div>
			        	<div className='container px-5 pb-5 w-75'>
							<div className="form-group">
							    <label className='text-light' htmlFor="username-input">Username</label>
							    <input onChange={this.onEnterUsername} type="email" className="form-control" id="username-input" placeholder="Username" />
							</div>
							<div className="form-group">
							    <label className='text-light' htmlFor="password-input">Password</label>
							    <input onChange={this.onEnterPassword} type="password" className="form-control" id="password-input" placeholder="Password" />
							</div>
						 	<button onClick={this.onLoginButton} className="btn btn-danger">Login</button>
						 	<div className='container pt-2'>
						 		<div className='d-flex justify-content-center'>
							 		<ClipLoader 
							 			loading={this.state.loading} 
							 			color={'#eee'}
							 		/>
							 		<h6 className='text-danger text-monospace'>{this.state.errorMsg}</h6>
						 		</div>
						 	</div>
			        	</div>
			        </div>
		        </div>
		    </div>
	    );
	}

	onEnterUsername = (evt) => {
		this.setState({username: evt.target.value})	;
	}

	onEnterPassword = (evt) => {
		this.setState({password: evt.target.value})	;
	}


	onLoginButton = () => {
		let {username, password} = this.state;
		let fetchData = {
			method: 'POST',
			body: JSON.stringify({username, password}),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			}
		}
		this.setState({loading: true, errorMsg: ''}, () => {
			fetch(serverUrl + '/login', fetchData)
				.then(res => {
					if(res.status === 200) {
						let token = res.headers.get('x-auth');
						localStorage.setItem('ErosToken', token);
						this.setState({loading: false});
						this.props.login();
					} else {
						this.setState({
							loading: false,
							errorMsg: 'Username or password is incorrect'
						});
					}
				}).catch(e => {
					this.setState({
						loading: false,
						errorMsg: 'Whoops!  Something went wrong'
					});
				});
		})
	}

}

export default Login;
