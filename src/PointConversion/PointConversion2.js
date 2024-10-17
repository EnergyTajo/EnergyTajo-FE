import React, { useState, useEffect } from 'react';
import './PointConversion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PointConversion2() {
  const [points, setPoints] = useState(8040);
  const [accountInfo, setAccountInfo] = useState('동백전(8021)'); // 초기값 설정

  useEffect(() => {
    // 포인트와 계좌 정보를 가져오는 API 요청
    fetch('/api/userData')
      .then((response) => response.json())
      .then((data) => {
        setPoints(data.points);
        setAccountInfo(data.accountInfo); // 외부 데이터베이스에서 카드 정보를 설정
      });
    // .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="pointconversion2-page-app">
      <div className="header-account-section">
        <span className="account-label">충전 계좌</span>
        <span className="account-info">{accountInfo}</span>
      </div>
      <div className="pointconversion2-page-mypoints">
        <span className="mypoints-label">보유 포인트</span>
        <span className="mypoints">{points}</span>
        <span className="mypoints-label-span">P</span>
      </div>
      <div className="pointconversion2-page-points-input">
        <div className="points-input-all">
          <input
            type="number"
            placeholder="충전할 포인트를 입력하세요."
            min="0"
            step="1"
            className="point-input"
          />
          <p className="point-input-all-p">P</p>
        </div>
        <button type="submit" className="charge-button">
          충전하기
        </button>
      </div>
    </div>
  );
}

export default PointConversion2;
