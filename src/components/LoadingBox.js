//Libraries
import React from 'react';
import {ClipLoader} from 'react-spinners';

const LoadingBox = ({loading, errorMsg, color}) => {
	return (
		<div className='container pt-2'>
	 		<div className='d-flex justify-content-center'>
		 		<ClipLoader 
		 			loading={loading}
		 			color={color} 
		 		/>
		 		<h6 className='text-danger text-monospace'>{errorMsg}</h6>
	 		</div>
	 	</div>
	);
};

export default LoadingBox;