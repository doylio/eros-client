//Libraries
import React, { Component } from 'react';

//Local
import './color-button.css'

class Settings extends Component {
  render() {
    return (
      <div className='bg-light p-5 container rounded-bottom'>
      	<div className='row'>
      		<h5 className='col-4'>Background Color</h5>
      		<div className='col-4'>
      			<button className='color-button' onClick={() => this.changeBackground("#275E88")} style={{backgroundColor: '#275E88'}}>&nbsp;</button>
      			<button className='color-button' onClick={() => this.changeBackground("#20a327")} style={{backgroundColor: '#20a327'}}>&nbsp;</button>
      			<button className='color-button' onClick={() => this.changeBackground("#cc8c2c")} style={{backgroundColor: '#cc8c2c'}}>&nbsp;</button>
      			<button className='color-button' onClick={() => this.changeBackground("#7b40c4")} style={{backgroundColor: '#7b40c4'}}>&nbsp;</button>
      		</div>
      	</div>
      	<br/><br/><br/>
      	<div className='row'>
			<div className='col'>      	
      			<h5>More settings to come later!</h5>
      		</div>
      	</div>
      </div>
    );
  }

  changeBackground = (hexValue) => {
    document.querySelector('body').style.backgroundColor = hexValue;
  }
}

export default Settings;
