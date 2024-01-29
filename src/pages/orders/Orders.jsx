import React from 'react'
import './Order.css';
import { DataGrid } from '@mui/x-data-grid';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';

import {columnsProduct} from '../../data.js'
import {rowsProduct} from '../../data.js'

function Orders() {
  return (

   <div className="home-container">
      <PageDetail />
      <div className='productlist-header'> 
        <div className="all-products">
          All Orders
        </div>
        <button className="add-product">
          Add Product
        </button>
      </div>
      <div className="productlist-container order">
        <DataGrid columns={columnsProduct} rows={rowsProduct} />
      </div>
    </div>

  )
}

export default Orders
