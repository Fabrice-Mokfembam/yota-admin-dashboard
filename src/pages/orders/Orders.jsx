import React from 'react';
import './Order.css';
import { DataGrid } from '@mui/x-data-grid';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';
import { useNavigate } from 'react-router-dom';

// Define columns and orders arrays within the same file
const columnsProduct = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'customerName', headerName: 'Customer Name', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'total', headerName: 'Total', width: 110 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const orders = [
  { id: 1, customerName: 'John Doe', date: '2024-07-01', total: '$150.00', status: 'Completed' },
  { id: 2, customerName: 'Jane Smith', date: '2024-07-02', total: '$200.00', status: 'Pending' },
  { id: 3, customerName: 'Sam Johnson', date: '2024-07-03', total: '$100.00', status: 'Shipped' },
  { id: 4, customerName: 'Chris Lee', date: '2024-07-04', total: '$250.00', status: 'Cancelled' },
  { id: 5, customerName: 'Patricia Brown', date: '2024-07-05', total: '$300.00', status: 'Completed' },
];

const page = 'Orders';

function Orders() {
  const RouteTo = useNavigate();

  const handleRowClick = ({ row }) => {
    let order = orders.filter(item => {
      return item.id === row.id;
    });
    console.log('Row clicked:', row.id, order[0]);

    RouteTo('/order-detail', { state: order[0] });
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
