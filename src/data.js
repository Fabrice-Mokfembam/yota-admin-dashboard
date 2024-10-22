export const columnsProduct = [
  { field: '_id', headerName: 'ID', width: 100 },
  { field: 'user_id', headerName: 'User ID', width: 100 },
  { 
    field: 'items', 
    headerName: 'Items', 
    width: 130,
    valueGetter: (params) => params.value.length + '  items'
  },
  { field: 'total_price', headerName: 'Total Price', width: 110 },
  { field: 'shipping_id', headerName: 'Shipping ID', width: 110 },
  { field: 'order_status', headerName: 'Order Status', width: 150 },
  { field: 'order_date', headerName: 'Order Date', width: 150 },
  { field: 'delivery_date', headerName: 'Delivery Date', width: 150 }
];
export const rowsProduct = [
  {
    id: 1,
    _id: '1',
    user_id: 'user1',
    items: [
      {
        product_id: 'product1',
        quantities: 2,
        price: 10.99
      }
    ],
    total_price: 21.98,
    shipping_id: 12345,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-05')
  },
  {
    id: 2,
    _id: '2',
    user_id: 'user2',
    items: [
      {
        product_id: 'product2',
        quantities: 3,
        price: 15.99
      }
    ],
    total_price: 47.97,
    shipping_id: 54321,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-06')
  },
  {
    id: 6,
    _id: '2',
    user_id: 'user2',
    items: [
      {
        product_id: 'product2',
        quantities: 3,
        price: 15.99
      }
    ],
    total_price: 47.97,
    shipping_id: 54321,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-06')
  },
  {
    id: 5,
    _id: '2',
    user_id: 'user2',
    items: [
      {
        product_id: 'product2',
        quantities: 3,
        price: 15.99
      }
    ],
    total_price: 47.97,
    shipping_id: 54321,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-06')
  },
  {
    id: 0,
    _id: '2',
    user_id: 'user2',
    items: [
      {
        product_id: 'product2',
        quantities: 3,
        price: 15.99
      }
    ],
    total_price: 47.97,
    shipping_id: 54321,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-06')
  },
  {
    id: 3,
    _id: '2',
    user_id: 'user2',
    items: [
      {
        product_id: 'product2',
        quantities: 3,
        price: 15.99
      }
    ],
    total_price: 47.97,
    shipping_id: 54321,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-06')
  },
  {
    id: 8,
    _id: '2',
    user_id: 'user2',
    items: [
      {
        product_id: 'product2',
        quantities: 3,
        price: 15.99
      }
    ],
    total_price: 47.97,
    shipping_id: 54321,
    order_status: 'Not Delivered',
    order_date: new Date('2024-02-29'),
    delivery_date: new Date('2024-03-06')
  },
  // Add more rows here as needed
];


