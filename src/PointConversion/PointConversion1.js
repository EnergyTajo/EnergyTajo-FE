import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PointConversion1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Table } from 'react-bootstrap';

function PointConversion1() {
  const [points, setPoints] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  // 사용자 포인트 데이터 가져오기
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch('https://energytajo.site/api/userData', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상적이지 않습니다');
        }
        return response.json();
      })
      .then((data) => {
        setPoints(data.points); // 사용자 포인트 설정
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('사용자 데이터 가져오기 오류:', error);
      });
  }, []);

  // 트랜잭션 기록 데이터 가져오기
  useEffect(() => {
    fetch('https://energytajo.site/api/charge', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactionHistory(data); // 트랜잭션 기록 설정
      })
      // eslint-disable-next-line
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="pointconversion1-page-app1">
      <Row className="mb-4">
        <Col className="pointconversion1-page-points-section1">
          <Card.Title className="text-left pointconversion1-title1">
            보유 포인트
          </Card.Title>
          <div className="pointconversion1-page-points-display1 text-center">
            <span className="display-4 pointconversion1-page-points1">
              {points}
            </span>
            <span className="points-label1">Points</span>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="pointconversion1-page-points-detail-section1">
          <Card.Title className="text-left pointconversion1-title1">
            포인트 이용 내역
          </Card.Title>
          <div className="table-container1">
            <Table striped bordered hover className="points-history-table1">
              <thead>
                <tr>
                  <th>충전일</th>
                  <th>
                    충전 카드
                    <br />
                    (마지막 4자리)
                  </th>
                  <th>충전 금액</th>
                  <th>포인트 잔액</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.length > 0 ? (
                  transactionHistory.map((transaction) => (
                    <tr
                      key={`${transaction.transactionDate}-${transaction.accountNumLastFourDigits}-${transaction.pointsSpent}`}
                    >
                      <td>{transaction.transactionDate}</td>
                      <td>{transaction.accountNumLastFourDigits || 'N/A'}</td>
                      <td>{transaction.pointsSpent}</td>
                      <td>{transaction.totalPointsAfterTransaction}</td>
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
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="pointconversion1-page-charge-button1">
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
