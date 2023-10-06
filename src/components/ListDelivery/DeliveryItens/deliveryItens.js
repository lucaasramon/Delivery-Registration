import React from "react";
import Moment from "react-moment";

function EntregaItem({ data, onClick }) {
  return (
    <tr onClick={() => onClick(data)}>
      <td>{data.nameClient}</td>
      <td>
        <Moment format="DD/MM/YYYY">{data.deliveryDate}</Moment>
      </td>
      <td>{data.startPoint}</td>
      <td>{data.endPoint}</td>
    </tr>
  );
}

export default EntregaItem;
