import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"; // 기본 App 컴포넌트 import
import MainPage from "./MainPage"; // MainPage 컴포넌트 import

ReactDOM.render(
  <React.StrictMode>
    {/* App과 MainPage를 함께 렌더링 */}
    <div>
      {/* <App /> */}
      <MainPage />
    </div>
  </React.StrictMode>,
  document.getElementById("root") // index.html의 root div에 렌더링
);
