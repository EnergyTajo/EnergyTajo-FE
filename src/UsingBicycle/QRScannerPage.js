import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UsingBicycle.css';

// displayMessage 함수 정의 (기본 매개변수를 마지막으로 이동)
const displayMessage = (
  msg,
  onClose,
  type = 'info',
  confirmButtonText = 'OK',
) => {
  Swal.fire({
    title: '',
    text: msg,
    padding: '1em 0.3em',
    icon: type,
    confirmButtonText,
    background: '#fff',
    customClass: {
      popup: 'my-custom-swal',
      confirmButton: 'my-custom-swal-button',
    },
    buttonsStyling: false,
    didClose: onClose,
  });
};

function QRScannerPage() {
  const navigate = useNavigate();
  const [cameraId, setCameraId] = useState(null);
  const [isCameraErrorShown, setIsCameraErrorShown] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [html5QrCodeInstance, setHtml5QrCodeInstance] = useState(null);

  const handleScanSuccess = useCallback(
    async (decodedText) => {
      if (isAlertShown) return;

      if (typeof decodedText !== 'string') {
        // eslint-disable-next-line
        console.error('decodedText must be a string, received:', decodedText);
        return;
      }

      try {
        setIsAlertShown(true);
        const { data } = await axios.get(
          `https://energytajo.site/api/qr_bicycle/${decodedText}`,
        );

        // 정상적인 QR 코드의 자전거 정보 알림
        const bikeId = data.bicycleId;

        Swal.fire({
          text: `${bikeId}`,
          icon: 'success',
          confirmButtonText: '이용 시작하기',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/UsingBicycle', { state: { qrData: bikeId } });
          } else {
            // 사용자가 창을 닫았을 때 할 처리 (선택 사항)
            setIsAlertShown(false);
          }
        });
      } catch (error) {
        const displayMsg =
          error.response?.data?.message || '자전거 정보를 불러오지 못했습니다.';
        displayMessage(displayMsg, () => setIsAlertShown(false), 'error');
      }
    },
    [navigate, isAlertShown],
  );

  const handleScanError = useCallback(() => {
    const errorMsg =
      'QR 스캔 중 오류가 발생했습니다. 카메라 접근 권한을 확인하세요.';

    if (!isCameraErrorShown && !isAlertShown) {
      setIsAlertShown(true);
      displayMessage(
        errorMsg,
        () => {
          setIsCameraErrorShown(true);
          setIsAlertShown(false);
        },
        'error',
        'OK',
      );
    }
  }, [isCameraErrorShown, isAlertShown]);

  useEffect(() => {
    if (!cameraId) {
      // 클린업 함수로 빈 함수 반환
      return () => {};
    }

    const html5QrCode = new Html5Qrcode('reader');
    setHtml5QrCodeInstance(html5QrCode); // QR 코드 인스턴스 저장

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: 250,
          },
          async (decodedText) => {
            // QR 코드가 인식되면 즉시 스캔을 중단하고 자전거 ID만 보여주는 알림을 띄움
            if (html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) {
              try {
                await html5QrCode.stop();
                handleScanSuccess(decodedText);
              } catch (err) {
                // eslint-disable-next-line
                console.error(
                  'QR 코드 스캐너 중지 중 오류가 발생했습니다.',
                  err,
                );
              }
            }
          },
          handleScanError,
        );
      } catch {
        const errorMsg = 'QR 코드 스캐너 시작에 실패했습니다.';
        if (!isCameraErrorShown && !isAlertShown) {
          setIsAlertShown(true);
          displayMessage(
            errorMsg,
            () => {
              setIsCameraErrorShown(true);
              setIsAlertShown(false);
            },
            'error',
            'OK',
          );
        }
      }
    };

    startScanner();

    // 클린업 함수
    return () => {
      if (
        html5QrCode.getState() === Html5QrcodeScannerState.SCANNING ||
        html5QrCode.getState() === Html5QrcodeScannerState.PAUSED
      ) {
        html5QrCode
          .stop()
          .then(() => {
            // eslint-disable-next-line
            console.log('QR 코드 스캐너가 정상적으로 중지되었습니다.');
          })
          .catch(() => {
            // eslint-disable-next-line
            console.log('QR 코드 스캐너 중지 중 오류가 발생했습니다.');
          });
      }
    };
  }, [
    cameraId,
    handleScanSuccess,
    handleScanError,
    isCameraErrorShown,
    isAlertShown,
  ]);
  /* eslint-disable-next-line arrow-body-style */
  useEffect(() => {
    return () => html5QrCodeInstance?.clear() || setHtml5QrCodeInstance(null);
  }, [html5QrCodeInstance]);

  return (
    <div className="qr-scanner-page">
      <div id="reader" style={{ width: '100%' }} />
    </div>
  );
}

export default QRScannerPage;
