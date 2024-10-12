import "./Order.css";
import { DataGrid } from "@mui/x-data-grid";
import PageDetail from "../../components/PageAlert/PageDetail.jsx";
import { useNavigate } from "react-router-dom";

// Define columns and an empty orders array initially
const columnsProduct = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "customerName", headerName: "Customer Name", width: 150 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "total", headerName: "Total", width: 110 },
  { field: "status", headerName: "Status", width: 130 },
];

// Initially empty orders array
const orders = [];

const page = "Orders";

function Orders() {
  const RouteTo = useNavigate();

  const handleRowClick = ({ row }) => {
    let order = orders.filter((item) => {
      return item.id === row.id;
    });
    console.log("Row clicked:", row.id, order[0]);

    RouteTo("/order-detail", { state: order[0] });
  };

  return (
    <div className="home-container">
      <PageDetail page={page} />

      <div className="productlist-header">
        <div className="all-products">All Orders</div>
      </div>

      <div className="productlist-container order">
        {orders.length === 0 ? (
          <div className="no-orders">Orders are not yet available</div>
        ) : (
          <DataGrid
            columns={columnsProduct}
            rows={orders}
            onRowClick={handleRowClick}
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
