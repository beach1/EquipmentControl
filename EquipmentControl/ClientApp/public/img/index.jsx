import React from 'react';

import './menu.css';

export const Menu = (props) => (
	<div className="menu">
		<p className='menu-label'>Just do</p>
		<div className='menu-h1'>
			<p>Priority</p>
			<img
				src='./img/arrow_down.png'
				alt='1'
			/>
		</div>
		<p
			className={props.selected===5?'underline-paragraph':''} 
			onClick={()=>props.onAction(5)}
		>
			All
		</p>
		<p 
			className={props.selected===0?'underline-paragraph':''} 
			onClick={()=>props.onAction(0)}
		>
			Urgently
		</p>
		<p
			className={props.selected===1?'underline-paragraph':''} 
			onClick={()=>props.onAction(1)}
		>
			Important
		</p>
		<p
			className={props.selected===2?'underline-paragraph':''} 
			onClick={()=>props.onAction(2)}
		>
			Normal
		</p>
		<p
			className={props.selected===3?'underline-paragraph':''} 
			onClick={()=>props.onAction(3)}
		>
			Neutral
		</p>
		<img
			className='add-img'
			src='img/ic_add.png'
			alt='2'
		/>
	</div>
);