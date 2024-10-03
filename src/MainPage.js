import React, { useState } from 'react';
import './MainPage.css';
// Importing Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
  // eslint-disable-next-line no-unused-vars
  const [points, setPoints] = useState(1050); // 초기 포인트 설정
  // eslint-disable-next-line no-unused-vars
  const [energy, setEnergy] = useState(20); // 초기 에너지 설정

  return (
    <div className="main-page-app">
      {/* Header */}
      <header className="main-page-header">
        <h1>
          나의 지구 보존
          {' '}
          <img alt="leaf" src="path/to/leaf-image.png" className="leaf-image" />
          에너지
        </h1>
        <p>지구를 지키고 나를 지키고</p>
      </header>

      {/* Main content */}
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
              W
            </span>
            <div className="main-page-bar">
              <div className="main-page-fill" style={{ width: `${energy}%` }} />
            </div>
          </div>
          <div className="main-page-buttons">
            {/* Using Bootstrap buttons */}
            <button
              type="button" // Ensured type is defined
              className="btn btn-success"
              onClick={() => alert('에너지 상세보기')}
            >
              에너지 상세보기
            </button>
            <button
              type="button" // Ensured type is defined
              className="btn btn-success"
              onClick={() => alert('포인트 전환')}
            >
              포인트 전환
            </button>
          </div>
        </div>

        <div className="main-page-bike-section">
          {/* Adding images for the buttons */}
          <button type="button" className="btn btn-success">
            <img alt="QR code" src="./img/qrcode.png" className="bike-button-image" />
            자전거 이용하기
          </button>
          <button type="button" className="btn btn-success">
            <img alt="QR code" src="./img/qrcode.png" className="bike-button-image" />
            자전거 찾기
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="main-page-footer">
        {/* Buttons with images */}
        <button
          type="button" // Ensured type is defined
          className="footer-button"
          onClick={() => {
            /* code to show NavigationBar */
          }}
        >
          <img alt="menu" src="path/to/menu-image.png" className="footer-button-image" />
          전체메뉴
        </button>
        <button type="button" className="footer-button">
          <img alt="home" src="path/to/home-image.png" className="footer-button-image" />
          HOME
        </button>
        <button type="button" className="footer-button">
          <img alt="mypage" src="path/to/mypage-image.png" className="footer-button-image" />
          MYPAGE
        </button>
      </footer>
    </div>
  );
}

export default MainPage;
