import React, { useState, useEffect } from 'react';
import './EnergyDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Table } from 'react-bootstrap';

function EnergyDetail() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetch('/api/userData')
      .then((response) => response.json())
      .then((data) => {
        setTransactionHistory(data.transactionHistory); // 자전거 이용 내역
      });
    // .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="energydetail-page-app">
      <div className="header-energydetail-section">
        <p className="energydetail-header-p">자전거 이용 내역</p>
      </div>
      <Row className="mb-4">
        <Col className="energy-detail-section">
          {/* <Card.Title className="used-title h4">이용 내역</Card.Title> */}
          <Table striped bordered hover className="used-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>날짜</th>
                <th>이용시간</th>
                <th>전환포인트</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.length > 0 ? (
                transactionHistory.map((transaction) => (
                  <tr key={`${transaction.date}-${transaction.bicycle}`}>
                    <td>{transaction.bicycle_id}</td>
                    <td>{transaction.start_ride_date}</td>
                    <td>{transaction.time}</td>
                    <td>{transaction.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    이용 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default EnergyDetail;
