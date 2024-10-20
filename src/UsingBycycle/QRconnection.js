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

  const handleError = (err) => {};

  return (
    <div>
      <h1>A Page</h1>
      {showScanner ? (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
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
