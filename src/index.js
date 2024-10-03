import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // 기본 App 컴포넌트 import
import MainPage from './MainPage'; // MainPage 컴포넌트 import

// index.html의 root div를 선택
const container = document.getElementById('root');

// React 18의 createRoot() 함수를 사용하여 렌더링
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    {/* App과 MainPage를 함께 렌더링 */}
    <div>
      {/* <App /> */}
      <MainPage />
    </div>
  </React.StrictMode>,
);
