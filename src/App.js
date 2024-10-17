import React, { useEffect } from 'react'; // useEffect 임포트 추가
import { Route, Routes } from 'react-router-dom';
import './App.css';
import First from './main/Menu';
import Second from './main/MainPage';
import Third from './main/MyPage';
import Nav from './main/Nav'; // Nav를 App 내부에서 렌더링

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
      </Routes>
      <Nav /> {/* Nav는 항상 표시됨 */}
    </div>
  );
}

export default App;
