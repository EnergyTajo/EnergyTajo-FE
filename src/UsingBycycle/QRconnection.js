import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import './UsingBycycle.css';

function QRconnection() {
  const [showScanner, setShowScanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지를 위한 상태 추가
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      navigate('/UsingBycycle', { state: { qrData: data } }); // B 페이지로 이동
    }
  };

  const handleError = (err) => {
    // 에러가 발생했을 때 에러 메시지를 설정
    setErrorMessage(
      'QR 스캐너에서 문제가 발생했습니다. 카메라 접근 권한을 확인하세요.',
    );
  };

  return (
    <div>
      <h1>A Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
      {/* 에러 메시지 표시 */}
      {showScanner ? (
        <QrScanner
          delay={300}
          onError={handleError} // 에러 발생 시 handleError 호출
          onScan={handleScan} // QR 코드 스캔 성공 시 handleScan 호출
          style={{ width: '100%' }}
        />
      ) : (
        <div>
          <p>QR 코드를 스캔하기 위해 카메라 접근 권한이 필요합니다.</p>
          <button type="button" onClick={() => setShowScanner(true)}>
            QR 코드 스캔하기
          </button>
        </div>
      )}
    </div>
  );
}

export default QRconnection;
