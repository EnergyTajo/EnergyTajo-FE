import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import First from './main/Menu';
import Second from './main/MainPage';
import Nav from './main/Nav';
import PC1 from './PointConversion/PointConversion1';
import PC2 from './PointConversion/PointConversion2';
import Third from './MyPage/MyPage';
import ED from './EnergyDetail/EnergyDetail';
import BPage from './UsingBicycle/UsingBicycle';
import CPage from './UsingBicycle/UsageHistory';
import QRScannerPage from './UsingBicycle/QRScannerPage';
import FB from './FindBicycle/FindBicycle';
import CC from './ConnectCard/ConnectCard';
import CardCheck from './ConnectCard/CardCheck';
import Join from './Join/JoinPage';
import Login from './Login/LoginPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Jua&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const noNavRoutes = ['/', '/Login', '/JoinPage'];

  return (
    <div className="App" style={{ fontFamily: 'Jua, sans-serif' }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/JoinPage" element={<Join />} />
        <Route path="/Menu" element={<First />} />
        <Route path="/MainPage" element={<Second />} />
        <Route path="/MyPage" element={<Third />} />
        <Route path="/PointConversion1" element={<PC1 />} />
        <Route path="/PointConversion2" element={<PC2 />} />
        <Route path="/EnergyDetail" element={<ED />} />
        <Route path="/UsingBicycle" element={<BPage />} />
        <Route path="/UsageHistory" element={<CPage />} />
        <Route path="/QRScanner" element={<QRScannerPage />} />
        <Route path="/FindBicycle" element={<FB />} />
        <Route path="/ConnectCard" element={<CC />} />
        <Route path="/CardCheck" element={<CardCheck />} />
      </Routes>
      {!noNavRoutes.includes(location.pathname) && <Nav />}
    </div>
  );
}

export default App;
