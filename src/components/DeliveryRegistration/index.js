import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../server/api";
import "../../App.css";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

function DeliveryRegistration() {
  const history = useHistory();
  const [nameClient, setNameClient] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [searchBox, setSearchBox] = useState("");
  const [searchBoxEnd, setSearchBoxEnd] = useState("");

  function toBack(e) {
    e.preventDefault();
    window.history.back();
  }

  async function NovoCadastroSubmit(e) {
    e.preventDefault();

    if (
      nameClient === "" ||
      deliveryDate === "" ||
      startPoint === "" ||
      endPoint === ""
    ) {
      alert("Tem um campo vazio");
    } else {
      await api.post("/delivery", {
        nameClient,
        deliveryDate,
        startPoint,
        endPoint,
      });
      alert("Cadastro realizado com sucesso!");

      // Limpa os campos preenchidos
      setNameClient("");
      setDeliveryDate("");
      setStartPoint("");
      setEndPoint("");
      history.push("/");
    }
  }
  const onLoad = (ref) => {
    setSearchBox(ref);
  };
  const onLoadEnd = (ref) => {
    setSearchBoxEnd(ref);
  };
  

  return (
    <>
      <div className="container z-depth-1 subpages collection  cardFiltro">
        <div className="row ">
          <div className="col s12 pad-0">
            <h5 className="bot-20 sec-tit">Cadastro de Entrega</h5>
          </div>
        </div>
        <form onSubmit={NovoCadastroSubmit}>
          <div className="row">
            <div className="input-field col s10 divTamanho ">
              <input
                value={nameClient}
                onChange={(e) => setNameClient(e.target.value)}
                id="name3"
                type="text"
                className="validate"
              />
              <label className="active" htmlFor="name3">
                Nome do Cliente
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s10 divTamanho ">
              <input
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                id="iptdeliveryDate"
                type="date"
                className="validate"
              />
              <label className="active" htmlFor="iptdeliveryDate">
                Data de entrega
              </label>
            </div>
          </div>

         
            <div className="row">
              <div className="input-field col s10 divTamanho ">
                <StandaloneSearchBox
                  onLoad={onLoad}
                  onPlacesChanged={() =>
                    setStartPoint(searchBox.getPlaces()[0].formatted_address)
                  }
                >
                  <input
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    id="iptstartPoint"
                    type="text"
                    className="validate"
                  />
                </StandaloneSearchBox>
                <label className="active" htmlFor="iptstartPoint">
                  Ponto de Partida
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s10 divTamanho ">
                <StandaloneSearchBox
                  onLoad={onLoadEnd}
                  onPlacesChanged={() =>
                    setEndPoint(searchBoxEnd.getPlaces()[0].formatted_address)
                  }
                >
                  <input
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                    id="iptendPoint"
                    type="text"
                    className="validate"
                  />
                </StandaloneSearchBox>
                <label className="active" htmlFor="iptendPoint">
                  Ponto de Destino
                </label>
              </div>
            </div>

          <div className="row grupoBotao">
            <div>
              <button
                type="submit"
                className="waves-effect waves-light btn bg-primary"
              >
                Salvar
              </button>
            </div>
            <div className="modal-footer">
              <button
                onClick={toBack}
                className="waves-effect waves-light btn brown lighten-2 btnVoltar"
              >
                Voltar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeliveryRegistration;
