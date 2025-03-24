import { useLocation } from 'react-router-dom';
import PageDetail from '../../components/PageAlert/PageDetail';

function OrderDetail() {
  const { state } = useLocation();

  return (
    <div className="home-container product-details">
      <PageDetail page={"Order detail"} />

      <div className="product-detail-wrapper">
        <div className="dt">
        <div className="detail-part1">
          <div className="imagges">
            Order ID
            <div className="selected-images">{state.id}</div>
          </div>

          {/* <div className="imagges">
            selected images
            <div className="selected-images">
                    {images.map((image) => {
                      return <img src={image} alt="" />;
                    })}
                  </div>
          </div> */}

          <div className="imagges">
            Customer ID
            <div className="selected-images"> {state.user_id}</div>
          </div>
          <div className="imagges">
            Items
              <div className="selected-images"> {state.items.map(item => {
                return (
                  <div>
                  <div>{ item.product_id}</div>
                  <div>{ item.quantities}</div>
                    <div>{item.price}</div>
                    </div>
              )
            })}</div>
          </div>
          <div className="imagges">
            Total Price
            <div className="selected-images">{state.total_price}</div>
          </div>
        </div>
        <div className="detail-part2 pd2">
          <div className="imagges">
            Order Date
              <div className="selected-images"> {state.order_date}</div>  
            
          </div>
          <div className="imagges">
            Order Status
            <div className="selected-images">{state.order_status}</div>
          </div>

          <div className="imagges">
            Shipping ID
            <div className="selected-images">{ state.shipping_id}</div>
          </div>

          <div className="imagges">
         Delivery Date
            <div className="selected-images">{state.delivery_date}</div>
          </div>
        
        </div>
        </div>
        </div>
      
    </div>
  );
}

export default OrderDetail;