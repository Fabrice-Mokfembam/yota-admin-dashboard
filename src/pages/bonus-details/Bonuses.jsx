import { useState, useContext, useEffect } from "react";
import { BsPencilSquare, BsTrash, BsPlus } from "react-icons/bs";
import PageDetail from "../../components/PageAlert/PageDetail";
import { useNavigate } from "react-router-dom";
import "./Bonuses.css";
import { bonusContext } from "../../context/bonusContext";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

function Bonuses() {
  const [activeTab, setActiveTab] = useState("bonuses");
  const { bonusArray, setBonusArray } = useContext(bonusContext);
  const [coupons, setCoupons] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  const routeTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(bonusArray)) {
      filterBonuses(bonusArray);
      filterCoupons(bonusArray);
    } else {
      console.error("bonusArray is not an array:", bonusArray);
    }
  }, [bonusArray]);

  function routeToBonusSetting() {
    activeTab === "bonuses"
      ? routeTo("/bonus-settings")
      : routeTo("/coupon-settings");
  }

  function filterCoupons(array) {
    if (!Array.isArray(array)) {
      console.error("Expected an array for filterCoupons, but got:", array);
      return;
    }
    const newArray = array.filter((item) => item.code !== "");
    setCoupons(newArray);
  }

  function filterBonuses(array) {
    if (!Array.isArray(array)) {
      console.error("Expected an array for filterBonuses, but got:", array);
      return;
    }
    const newArray = array.filter((item) => item.code === "");
    setBonuses(newArray);
  }

  function gotoBonusDetail(bonus) {
    routeTo("/bonus-detail", { state: bonus });
  }

  async function deleteBonus(id) {
    setIsLoading(true);
    const body = {
      id: id,
    };
    try {
      const { data } = await axios.post(
        "https://yotaperformanceshop.com/yps_server/admin/delete_bonus",
        body
      );
      console.log(data);
      setIsLoading(false);

     
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const renderBonusCard = (bonus) => (
    <div className="each_card" key={bonus.bonus_name}>
      <div
        className="c_info"
        onClick={() => {
          gotoBonusDetail(bonus);
        }}
      >
        <h3>{bonus.bonus_name}</h3>
        <div className="email_c">{bonus.endDate}</div>
      </div>
      <div
        className="editIcon"
        onClick={() => {
          gotoBonusDetail(bonus);
        }}
      >
        <BsPencilSquare className="editIconBtn" />
      </div>
      <div
        className="deleteIcon"
        onClick={() => {
          deleteBonus(bonus.id);
        }}
      >
        <BsTrash className="deleteIconBtn" />
      </div>
    </div>
  );

  const renderCouponCard = (coupon) => (
    <div className="each_card" key={coupon.bonus_name}>
      <div
        className="c_info"
        onClick={() => {
          gotoBonusDetail(coupon);
        }}
      >
        <h3>{coupon.bonus_name}</h3>
        <div className="email_c">{coupon.endDate}</div>
        <div className="coupon_code">Coupon: {coupon.code}</div>
      </div>
      <div
        className="editIcon"
        onClick={() => {
          gotoBonusDetail(coupon);
        }}
      >
        <BsPencilSquare className="editIconBtn" />
      </div>
      <div
        className="deleteIcon"
        onClick={() => {
          deleteBonus(coupon.id);
        }}
      >
        <BsTrash className="deleteIconBtn" />
      </div>
    </div>
  );

  return (
    <div className="home-container bonus">
      <PageDetail page={"Bonuses and Coupons "} />
      {isLoading && <Loader message={"deleting bonus"} />}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "bonuses" ? "active" : ""}`}
          onClick={() => setActiveTab("bonuses")}
        >
          Bonuses
        </div>
        <div
          className={`tab ${activeTab === "coupons" ? "active" : ""}`}
          onClick={() => setActiveTab("coupons")}
        >
          Coupons
        </div>
        <div
          className="underline"
          style={{
            transform: `translateX(${activeTab === "bonuses" ? 0 : 98}%)`,
          }}
        />
      </div>

      <div className="content">
        {activeTab === "bonuses" && (
          <div className="items">
            {bonuses.length
              ? bonuses.map(renderBonusCard)
              : "Bonuses Are not Available"}
          </div>
        )}
        {activeTab === "coupons" && (
          <div className="items">
            {coupons.length
              ? coupons.map(renderCouponCard)
              : "Coupons Are Not Available"}
          </div>
        )}
      </div>

      <div className="addButton" onClick={routeToBonusSetting}>
        <BsPlus className="plusIcon" />
      </div>
    </div>
  );
}

export default Bonuses;
