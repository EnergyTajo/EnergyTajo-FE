import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';
import './UsingBicycle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QRScannerPage() {
  const navigate = useNavigate();

  const handleScanSuccess = useCallback(
    async (decodedText) => {
      try {
        const response = await axios.get(
          `https://energytajo.site/api/qr_bicycle/${decodedText}`,
        );
        navigate('/UsingBicycle', { state: { qrData: response.data } });
      } catch (error) {
        toast.error(
          error.response?.data?.message || '자전거 정보를 불러오지 못했습니다.',
        );
      }
    },
    [navigate],
  );

  const handleScanError = () => {
    toast.error(
      'QR 스캔 중 오류가 발생했습니다. 카메라 접근 권한을 확인하세요.',
    );
  };

  useEffect(() => {
    // Browser 지원 여부 확인
    if (!('BarcodeDetector' in window)) {
      toast.error('이 브라우저에서는 BarcodeDetector가 지원되지 않습니다.');
      return undefined; // 명시적으로 반환값 설정
    }

    const html5QrCode = new Html5Qrcode('reader');
    html5QrCode
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: 250,
        },
        handleScanSuccess,
        handleScanError,
      )
      .catch(() => {
        toast.error('QR 코드 스캐너 시작에 실패했습니다.');
      });

    // 컴포넌트 언마운트 시 cleanup 함수 실행
    return () => {
      html5QrCode
        .stop()
        .then(() => {
          // eslint-disable-next-line
          console.log('QR 코드 스캐너 중지 성공');
        })
        .catch(() => {
          toast.error('QR 코드 스캐너 중지에 실패했습니다.');
        });
    };
  }, [handleScanSuccess]);

  return (
    <div className="qr-scanner-page">
      <div id="reader" style={{ width: '100%' }} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default QRScannerPage;
