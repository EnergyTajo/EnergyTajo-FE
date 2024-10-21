import React from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import './UsingBycycle';

function QRScannerPage() {
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      // QR 스캔 성공 시 UsingBycycle 페이지로 이동
      navigate('/UsingBycycle', { state: { qrData: data } });
    }
  };

  const handleError = () => {
    alert('QR 스캔 중 오류가 발생했습니다. 카메라 접근 권한을 확인하세요.');
  };

  const previewStyle = {
    height: '100%',
    width: '100%',
  };

  const videoConstraints = {
    facingMode: 'environment', // 후방 카메라 설정
  };

  return (
    <div className="qr-scanner-page">
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
        constraints={{ video: videoConstraints }} // 후방 카메라 적용
      />
    </div>
  );
}

export default QRScannerPage;
