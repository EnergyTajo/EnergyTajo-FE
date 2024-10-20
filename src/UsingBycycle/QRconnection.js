import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import './UsingBycycle.css';

function QRconnection() {
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      navigate('/UsingBycycle', { state: { qrData: data } }); // B 페이지로 이동
    }
  };

  const handleError = () => {
    // 에러 핸들링을 위한 코드가 필요하다면 이곳에 추가하세요.
    // 현재는 에러를 무시하고 있습니다.
  };

  return (
    <div>
      <h1>A Page</h1>
      {showScanner ? (
        <QrScanner
          delay={300}
          onError={handleError} // 에러가 발생하면 handleError가 호출됩니다.
          onScan={handleScan} // QR 코드 스캔 성공 시 handleScan이 호출됩니다.
          style={{ width: '100%' }}
        />
      ) : (
        <button type="button" onClick={() => setShowScanner(true)}>
          QR 코드 스캔하기
        </button>
      )}
    </div>
  );
}

export default QRconnection;
