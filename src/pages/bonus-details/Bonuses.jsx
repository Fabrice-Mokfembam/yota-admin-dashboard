import React from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import PageDetail from '../../components/PageAlert/PageDetail';
import { useNavigate } from 'react-router-dom';

function Bonuses() {

    const routeTo = useNavigate();
    function gotoBonusDetail() {
        routeTo('/bonus-detail');
    }

  return (
    <div className='home-container main-customer-container'>
      <PageDetail page={'bonuses Available'} />

      <div className="customers bonuses">
        <div className="each_customer">
          <div className="c_info">
            <h3>Black Friday</h3>
            <div className="email_c">20/07/2024</div>
          </div>
          <div className="editIcon" onClick={gotoBonusDetail}><BsPencilSquare  className='editbonus'/></div>
          <div className="deleteIcon"><BsTrash  className='deletebonus'/></div>
        </div>
      </div>
    </div>
  );
}

export default Bonuses;