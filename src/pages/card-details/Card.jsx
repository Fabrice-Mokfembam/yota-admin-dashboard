import React from 'react'
import './Card.css'
import { DataGrid } from '@mui/x-data-grid';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';

import {columnsProduct} from '../../data.js'
import { rowsProduct } from '../../data.js'


function Card () {
  return (
     <div className="home-container">
      <PageDetail />
      <div className='productlist-header'> 
        <div className="all-products">
          card details
        </div>
        <button className="add-product">
          Card
        </button>
      </div>
      <div className="productlist-container order">
        <DataGrid columns={columnsProduct} rows={rowsProduct} />
      </div>
    </div>

  )
}

export default Card