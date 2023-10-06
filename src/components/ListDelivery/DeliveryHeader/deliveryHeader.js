import React from 'react';
import { Link } from 'react-router-dom';

function DeliveryHeader() {
  return (
    <div className="container z-depth-1 subpages collection cardFiltro">
      <div className="row">
        <div className="col s12 pad-0">
          <h5 className="bot-20 sec-tit">Entregas</h5>
        </div>
      </div>
      <hr />

      <div className="btn-novo">
        <Link to="/deliveryRegistration" style={styles.button}>
          <button className="waves-effect waves-light btn brown lighten-2">
            Cadastrar Entrega
          </button>
        </Link>
      </div>
    </div>
  );
}
const styles = {
  button: {
    cursor: 'pointer',
  },
  buttonDisabled: {
    cursor: 'not-allowed',
  },
};

export default DeliveryHeader;
