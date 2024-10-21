import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, ProgressBar, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faBicycle } from '@fortawesome/free-solid-svg-icons';

function MainPage() {
  const [points, setPoints] = useState(0); // 초기 포인트 값 0으로 변경
  const [energy, setEnergy] = useState(0); // 초기 에너지 값 0으로 변경
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 데이터 불러오기
    fetch('/api/userData')
      .then((response) => response.json())
      .then((data) => {
        setPoints(data.points); // 데이터베이스에서 포인트 불러오기
        setEnergy(data.energy); // 데이터베이스에서 에너지 불러오기
      });
  }, []);

  // QR 코드 연결
  const handleBikeUsageClick = () => {
    // "자전거 이용하기" 클릭 시 UsingBycycle 페이지로 이동
    // 원래는 QRScanner 페이지로 이동하도록 설정할 것
    navigate('/UsingBycycle'); // 테스트를 위해 UsingBycycle 페이지로 이동
    // navigate('/QRScanner'); // 실제 QR 스캐너 페이지로 이동할 때 사용
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
                  {/* 에너지 상세보기 버튼 */}
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
                  {/* 포인트 전환 버튼 */}
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
              {/* "자전거 이용하기" 버튼 클릭 시 UsingBycycle 페이지로 이동 */}
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
                onClick={() => navigate('/FindBycycle')}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate('/FindBycycle');
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
