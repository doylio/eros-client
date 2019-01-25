//Libraries
import React, { Component } from 'react';

//Local
import Ribbon from './Ribbon';
import Contents from './Contents';

class Home extends Component {
  render() {
    return (
      <div className='w-100'>
        <Ribbon />
        <Contents />
      </div>
    );
  }
}

export default Home;
