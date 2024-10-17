import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PointConversion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Table } from 'react-bootstrap';

function PointConversion1() {
  const [points, setPoints] = useState(8040);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetch('/api/userData')
      .then((response) => response.json())
      .then((data) => {
        setPoints(data.points);
        setTransactionHistory(data.transactionHistory);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="pointconversion1-page-app">
      <Row className="mb-4">
        <Col className="pointconversion1-page-points-section">
          <Card.Title className="text-left pointconversion1-title">
            보유 포인트
          </Card.Title>
          <div className="pointconversion1-page-points-display text-center">
            <span className="display-4 pointconversion1-page-points">
              {points}
            </span>
            <span className="points-label">Points</span>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="pointconversion1-page-points-detail-section">
          <Card.Title className="text-left pointconversion1-title">
            포인트 내역
          </Card.Title>
          <Table striped bordered hover className="points-history-table">
            <thead>
              <tr>
                <th>충전일</th>
                <th>충전 카드</th>
                <th>충전 금액</th>
                <th>포인트 잔액</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.length > 0 ? (
                transactionHistory.map((transaction) => (
                  <tr key={`${transaction.date}-${transaction.card}`}>
                    <td>{transaction.date}</td>
                    <td>{transaction.card}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.balance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    포인트 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="pointconversion1-page-charge-button">
          <Link to="/PointConversion2">
            <button type="button" className="charge-button">
              동백전 충전
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default PointConversion1;
