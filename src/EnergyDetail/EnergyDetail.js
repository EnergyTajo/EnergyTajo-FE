import React, { useState, useEffect } from 'react';
import './EnergyDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Table } from 'react-bootstrap';

function EnergyDetail() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetch('https://energytajo.site/api/ride', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactionHistory(data);
      })
      // eslint-disable-next-line
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="energydetail-page-app">
      <div className="header-energydetail-section">
        <p className="energydetail-header-p">자전거 이용 내역</p>
      </div>
      <Row className="mb-4">
        <Col className="energy-detail-section">
          <div className="table-responsive">
            <Table striped bordered hover className="used-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>날짜</th>
                  <th>이용 시간</th>
                  <th>전환포인트</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.length > 0 ? (
                  transactionHistory.map((transaction) => (
                    <tr key={transaction.bicycleId}>
                      <td>{transaction.bicycleId}</td>
                      <td>{transaction.startRideDate}</td>
                      <td>{transaction.duration}</td>
                      <td>{transaction.convertedPoints}</td>
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EnergyDetail;
