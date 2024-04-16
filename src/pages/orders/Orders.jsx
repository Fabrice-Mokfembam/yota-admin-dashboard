import React from 'react';
import './Order.css';
import { DataGrid } from '@mui/x-data-grid';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';
import { columnsProduct } from '../../data.js';
import { useNavigate } from 'react-router-dom';

const page = 'Orders';

function Orders({ orders }) {

  const RouteTo = useNavigate();

  const handleRowClick = ({ row }) => {
    let order = orders.filter(item => {
      return item.id === row.id;
     })
    console.log('Row clicked:', row.id, order[0]);
    
    RouteTo('/order-detail',{state:order[0]})
  };

  return (
    <div className="home-container">
      <PageDetail page={page} />
      <div className="productlist-header">
        <div className="all-products">All Orders</div>
      </div>
      <div className="productlist-container order">
        <DataGrid columns={columnsProduct} rows={orders} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}

export default Orders;