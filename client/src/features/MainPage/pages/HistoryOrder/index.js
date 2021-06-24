import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

function HistoryOrder() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const response = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          // console.log(response)
          setHistory(response.data);
        } else {
          const response = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          // console.log(response)
          setHistory(response.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <HistoryOrderContainer>
      <h2>History Order</h2>

      <h4>You have {history.length} ordered</h4>

      <HistoryPage>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <HistoryItem key={item._id}>
              <td>{item.paymentID}</td>
              <td>{new Date(item.createdAt).toLocaleString("en-GB")}</td>
              <td>
                <Link to={`/history/${item._id}`}>View</Link>
              </td>
            </HistoryItem>
          ))}
        </tbody>
      </HistoryPage>
    </HistoryOrderContainer>
  );
}

const HistoryOrderContainer = styled.div`
  
  overflow-x: auto;

  > h2,
  > h4 {
    text-align: center;
    margin: 20px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }
`;

const HistoryPage = styled.table`

  margin: auto;
  width: 100%;
  > table {
    border: 1px solid #ddd;
    border-collapse: collapse;
  }
`;

const HistoryItem = styled.tr`

  > th,
  tr,
  td {
    border: 1px solid #ddd;
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
  }
`;

export default HistoryOrder;
