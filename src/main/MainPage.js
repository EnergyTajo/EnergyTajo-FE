import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, ProgressBar, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faBicycle, faLeaf } from '@fortawesome/free-solid-svg-icons';

function MainPage() {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 데이터 불러오기
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
        setPoints(data.points);
        setEnergy(data.totPowerGen);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('사용자 데이터 가져오기 오류:', error);
      });
  }, []);

  // QR 코드 연결
  const handleBikeUsageClick = () => {
    navigate('/QRScanner');
  };
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
                <FontAwesomeIcon icon={faLeaf} className="fa-icon-leaf" />
              </Card.Title>
              <div className="main-page-points-display text-center">
                <span className="display-4 main-page-points">{points}</span>
                <span className="points-label">Points</span>
              </div>
              <ProgressBar
                now={energy} // 에너지 진행 정도
                max={100} // 최대값 100
                className="main-page-bar"
              />
              <Row>
                <Col xs={6}>
                  <button
                    type="button"
                    className="common-button"
                    onClick={() => navigate('/EnergyDetail')}
                  >
                    에너지
                    <br />
                    상세보기
                  </button>
                </Col>
                <Col xs={6}>
                  <button
                    type="button"
                    className="common-button"
                    onClick={() => navigate('/PointConversion1')}
                  >
                    포인트
                    <br />
                    전환
                  </button>
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
              <div
                className="card-title"
                onClick={handleBikeUsageClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleBikeUsageClick();
                  }
                }}
                role="button"
                tabIndex="0"
              >
                <FontAwesomeIcon icon={faQrcode} className="fa-icon" />
                <Card.Title className="s-card-title">
                  자전거
                  <br />
                  이용하기
                </Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex">
          <Card className="h-75 text-center bike-card bike-card2">
            <Card.Body>
              <div
                className="card-title"
                onClick={() => navigate('/FindBicycle')}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate('/FindBicycle');
                  }
                }}
              >
                <FontAwesomeIcon icon={faBicycle} className="fa-icon" />
                <Card.Title className="s-card-title">
                  자전거
                  <br />
                  찾기
                </Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="footer">ⓒ ENERGYTAJO</footer>
    </div>
  );
}

export default MainPage;
