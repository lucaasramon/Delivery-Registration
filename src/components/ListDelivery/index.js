// DeliveryList.js
import React, { useEffect, useState } from "react";
import "../../App.css";
import api from "../../server/api";
import DeliveryItens from "./DeliveryItens/deliveryItens";
import MapModal from "./MapModal/mapModal";
import DeliveryHeader from './DeliveryHeader/deliveryHeader';

require("dotenv").config();

function DeliveryList() {
  const [allDelivery, setAllDelivery] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getDelivery() {
      const response = await api.get("/delivery");
      setAllDelivery(response.data);
    }
    getDelivery();
  }, []);

  const handleDeliveryClick = async (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  return (
    <>
      <DeliveryHeader />

      {selectedDelivery && (
        <MapModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          startPoint={selectedDelivery.startPoint}
          endPoint={selectedDelivery.endPoint}
        />
      )}

      <div className="container">
        <div className="section">
          <div className="row ">
            <div className="col divResponsive s12 pad-0">
              <table className="striped colored primary">
                <tbody>
                  {allDelivery.map((data, index) => (
                    <DeliveryItens
                      key={index}
                      data={data}
                      onClick={handleDeliveryClick}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryList;
