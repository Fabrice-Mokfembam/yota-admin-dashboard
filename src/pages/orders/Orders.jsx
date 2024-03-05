import React from 'react'
import './Order.css';
import { DataGrid } from '@mui/x-data-grid';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';
import {columnsProduct} from '../../data.js'

const page = 'Orders'
function Orders({ orders}) {


  return (

   <div className="home-container">
      <PageDetail page={page} />
      <div className='productlist-header'> 
        <div className="all-products">
          All Orders
        </div>
      </div>
      <div className="productlist-container order">
        <DataGrid columns={columnsProduct} rows={orders} />
      </div>
    </div>

  )
}

export default Orders
