import { Route, Routes } from 'react-router-dom';
import './App.css';
import First from './Menu';
import Second from './MainPage';
import Third from './MyPage';
import Nav from './Nav'; // Nav를 App 내부에서 렌더링

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
