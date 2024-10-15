import { Route, Routes } from 'react-router-dom';
import './App.css';
import First from './main/Menu';
import Second from './main/MainPage';
import Third from './main/MyPage';
import Nav from './main/Nav'; // Nav를 App 내부에서 렌더링

function App() {
  return (
    <div className="App">
      <Nav /> {/* Nav는 항상 표시됨 */}
      <Routes>
        <Route path="/" element={<Second />} /> {/* 기본 경로 */}
        <Route path="/Menu" element={<First />} />
        <Route path="/MainPage" element={<Second />} />
        <Route path="/MyPage" element={<Third />} />
      </Routes>
    </div>
  );
}

export default App;
