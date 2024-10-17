import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, ProgressBar, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faBicycle } from '@fortawesome/free-solid-svg-icons';

function MainPage() {
  const [points, setPoints] = useState(8040);
  const [energy, setEnergy] = useState(60);

  useEffect(() => {
    fetch('/api/userData')
      .then((response) => response.json())
      .then((data) => {
        setPoints(data.points);
        setEnergy(data.energy);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="main-page-app">
      <div className="header-section text-center mb-4">
        <Image
          src="/img/mainPageHeader.png"
          rounded
          fluid
          className="header-image"
        />
        <p className="header-text">지구를 지키고 나를 지키고</p>
      </div>

      <Row className="mb-4">
        <Col className="main-page-points-section-color">
          <Card className="h-100 main-page-points-section">
            <Card.Body>
              <Card.Title className="text-left">
                누적 포인트 및 에너지
              </Card.Title>
              <div className="main-page-points-display text-center">
                <span className="display-4 main-page-points">{points}</span>
                <span className="points-label">Points</span>
              </div>
              <ProgressBar
                now={energy}
                label={`${energy}%`}
                className="main-page-bar"
              />
              <Row>
                <Col xs={6}>
                  <Link to="/EnergyDetail">
                    <button type="button" className="common-button">
                      에너지
                      <br />
                      상세보기
                    </button>
                  </Link>
                </Col>
                <Col xs={6}>
                  <Link to="/PointConversion">
                    <button type="button" className="common-button">
                      포인트
                      <br />
                      전환
                    </button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 자전거 이용 및 찾기 카드 */}
      <Row className="main-page-bike-section">
        <Col className="d-flex">
          <Card className="h-75 text-center bike-card bike-card1">
            <Card.Body>
              <Link to="/UsingBycycle" className="card-title">
                <FontAwesomeIcon icon={faQrcode} className="fa-icon" />
                <Card.Title className="s-card-title">
                  자전거
                  <br />
                  이용하기
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex">
          <Card className="h-75 text-center bike-card bike-card2">
            <Card.Body>
              <Link to="/FindBycycle" className="card-title">
                <FontAwesomeIcon icon={faBicycle} className="fa-icon" />
                <Card.Title className="s-card-title">
                  자전거
                  <br />
                  찾기
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <footer className="footer">ⓒ ENERGYTAJO</footer>
    </div>
  );
}

export default MainPage;
