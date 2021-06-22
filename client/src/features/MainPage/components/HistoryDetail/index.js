import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import styled from "styled-components";

function HistoryDetail() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [historyDetail, setHistoryDetail] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) {
          setHistoryDetail(item);
        }
      });
    }
  }, [history, params.id]);

  if (historyDetail.length === 0) return null;

  const totalMoneyBiden = () => {
    let total = 0;
    historyDetail.cart.forEach((item) => (total += item.price * item.quantity));
    return total;
  };

  return (
    <HistoryDetailContainer>
      <h2>INFORMATION MY ORDER</h2>
      <HistoryPage>
        <thead style={{ background: "rgba(3,165,206,0.7" }}>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <HistoryItem>
            <th>{historyDetail.address.recipient_name}</th>
            <th>
              {historyDetail.address.line1 +
                " - " +
                historyDetail.address.city +
                " - " +
                historyDetail.address.state}
            </th>
            <th>{historyDetail.address.postal_code}</th>
            <th>{historyDetail.address.country_code}</th>
          </HistoryItem>
        </tbody>
      </HistoryPage>
      <br />

      <br />
      <HistoryPage style={{ margin: "30px 0px" }}>
        <thead style={{ background: "rgba(3,165,206,0.7" }}>
          <tr>
            <th>Thumbnail</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {historyDetail.cart.map((item) => (
            <HistoryItem key={item._id}>
              <th>
                <img src={item.images.url} alt="" />
              </th>
              <th>{item.title}</th>
              <th>{item.quantity}</th>
              <th style={{ color: "red" }}>{`$ ${
                item.price * item.quantity
              }`}</th>
            </HistoryItem>
          ))}
        </tbody>
      </HistoryPage>
      <Footer>
        <TotalMoney>
          <h3>Status: <span>{totalMoneyBiden() < 2000 ? 'PENDING' : 'CONFIRMED'}</span></h3>
        </TotalMoney>
        <TotalMoney>
          <h3>Total: {totalMoneyBiden()} Biden </h3>
        </TotalMoney>
      </Footer>
    </HistoryDetailContainer>
  );
}

const HistoryDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h2 {
    align-items: center;
    color: rgb(3, 165, 206);
    margin: 30px auto;
  }
`;

const HistoryPage = styled.table`
  margin: auto;
  width: 100%;
  > table {
    border: 1px solid #555;
    border-collapse: collapse;
  }
`;

const HistoryItem = styled.tr`
  > th,
  tr,
  td {
    border: 1px solid #555;
    border-collapse: collapse;
  }
  > th,
  td {
    text-align: center;
    padding: 10px;
    text-transform: capitalize;
    > a {
      color: rgb(3, 165, 206);
    }
    img {
      width: 50px;
      height: 70px;
    }
  }
`;

const TotalMoney = styled.div`
  height: 40px;
  width: 220px;
  border: 1px solid #888;
  margin-bottom: 30px;
  
  > h3 {
    margin-top: 8px;
    margin-left: 10px;
    display: flex;
  flex-direction:row;
  
    >span{
        margin-left: 5px;
        color: red;
    }
  }
`;

const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export default HistoryDetail;
