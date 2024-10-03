import React, { useState } from 'react';
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
  const [points, setPoints] = useState(1050); // 초기 포인트 설정
  const [energy, setEnergy] = useState(20); // 초기 에너지 설정
  const [showEnergyAlert, setShowEnergyAlert] = useState(false); // 에너지 알림 상태
  const [showPointAlert, setShowPointAlert] = useState(false); // 포인트 전환 알림 상태

  const handleEnergyAlert = () => {
    setShowEnergyAlert(true);
    setTimeout(() => setShowEnergyAlert(false), 3000); // 3초 후 자동으로 알림 숨김
  };

  const handlePointAlert = () => {
    setShowPointAlert(true);
    setTimeout(() => setShowPointAlert(false), 3000); // 3초 후 자동으로 알림 숨김
  };

  // 포인트 증가 함수
  const handleIncreasePoints = () => {
    setPoints((prevPoints) => prevPoints + 100); // 예시: 포인트 100 증가
  };

  // 에너지 증가 함수
  const handleIncreaseEnergy = () => {
    setEnergy((prevEnergy) => Math.min(prevEnergy + 10, 100)); // 예시: 에너지 10 증가 (최대 100까지)
  };

  return (
    <div className="main-page-app">
      <header className="main-page-header">
        <h1>
          나의 지구 보존
          <img alt="leaf" src="path/to/leaf-image.png" className="leaf-image" />
          에너지
        </h1>
        <p>지구를 지키고 나를 지키고</p>
      </header>

      <main className="main-page-main">
        <div className="main-page-points-section">
          <h2>누적 포인트</h2>
          <div className="main-page-points-display">
            <span className="main-page-points">{points}</span>
            <span className="main-page-points-label">Points</span>
          </div>
          <div className="main-page-energy-bar">
            <span className="main-page-energy-text">
              {energy}
              <br />
              <span>W</span>
            </span>
            <div className="main-page-bar">
              <div className="main-page-fill" style={{ width: `${energy}%` }} />
            </div>
          </div>
          <div className="main-page-buttons">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleEnergyAlert();
                handleIncreaseEnergy(); // 에너지 증가 함수 호출
              }}
            >
              에너지 상세보기
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handlePointAlert();
                handleIncreasePoints(); // 포인트 증가 함수 호출
              }}
            >
              포인트 전환
            </button>
          </div>
          {showEnergyAlert && (
            <div className="alert alert-info">에너지 상세보기</div>
          )}
          {showPointAlert && (
            <div className="alert alert-info">포인트 전환</div>
          )}
        </div>

        <div className="main-page-bike-section">
          <button type="button" className="btn btn-success">
            <img
              alt="QR code"
              src="./img/qrcode.png"
              className="bike-button-image"
            />
            자전거 이용하기
          </button>
          <button type="button" className="btn btn-success">
            <img
              alt="QR code"
              src="./img/qrcode.png"
              className="bike-button-image"
            />
            자전거 찾기
          </button>
        </div>
      </main>

      <footer className="main-page-footer">
        <button
          type="button"
          className="footer-button"
          onClick={() => {
            /* code to show NavigationBar */
          }}
        >
          <img
            alt="menu"
            src="path/to/menu-image.png"
            className="footer-button-image"
          />
          전체메뉴
        </button>
        <button type="button" className="footer-button">
          <img
            alt="home"
            src="path/to/home-image.png"
            className="footer-button-image"
          />
          HOME
        </button>
        <button type="button" className="footer-button">
          <img
            alt="mypage"
            src="path/to/mypage-image.png"
            className="footer-button-image"
          />
          MYPAGE
        </button>
      </footer>
    </div>
  );
}

export default MainPage;
