import React from 'react'
import './Animation.css'
import loadsvg from '../../assets/images/load.svg'

function Animation() {
  return (
   <div class="loading__animation">
			<div class="load__icon lds-dual-ring">
				<img src={loadsvg} alt="logo" width="78%" />
			</div>
	</div> 
  )
}

export default Animation
