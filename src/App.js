import React, { useEffect } from 'react'; // useEffect 임포트 추가
import { Route, Routes } from 'react-router-dom';
import './App.css';
import First from './main/Menu';
import Second from './main/MainPage';
import Nav from './main/Nav'; // Nav를 App 내부에서 렌더링

import PC1 from './PointConversion/PointConversion1';
import PC2 from './PointConversion/PointConversion2';

/* 추가 요소들 (페이지는 연결) 또는 임시 위치
 ** EnergyDetail은 따로 분리될 수도 있음
 */
import Third from './plus/MyPage';
import ED from './plus/EnergyDetail';

// QR 코드 관련 페이지
import APage from './UsingBycycle/QRconnection'; // A 페이지
import BPage from './UsingBycycle/UsingBycycle'; // B 페이지
import CPage from './UsingBycycle/UsageHistory'; // C 페이지

function App() {
  useEffect(() => {
    // Google Fonts에서 Jua 폰트를 추가
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Jua&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link); // head에 링크 추가
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'Jua, sans-serif' }}>
      <Routes>
        <Route path="/" element={<Second />} /> {/* 기본 경로 */}
        <Route path="/Menu" element={<First />} />
        <Route path="/MainPage" element={<Second />} />
        <Route path="/MyPage" element={<Third />} />
        <Route path="/PointConversion1" element={<PC1 />} />
        <Route path="/PointConversion2" element={<PC2 />} />
        <Route path="/EnergyDetail" element={<ED />} />
        {/* QR 코드 관련 경로 */}
        <Route path="/QRconnection" element={<APage />} /> {/* A 페이지 */}
        <Route path="/UsingBycycle" element={<BPage />} /> {/* B 페이지 */}
        <Route path="/UsageHistory" element={<CPage />} /> {/* C 페이지 */}
      </Routes>
      <Nav /> {/* Nav는 항상 표시됨 */}
    </div>
  );
}

export default App;
