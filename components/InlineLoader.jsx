import React from 'react';
import Progress from './Progress';

export default function InlineLoader(){
	return(
		<div style={{
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<Progress color="#fff" size={25}/>
		</div>
		)
}