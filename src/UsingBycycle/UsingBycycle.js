import React, { useEffect, useState, useCallback } from 'react'; // useCallback을 추가합니다.
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import './UsingBycycle.css';

function UsingBycycle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrData } = location.state || {};

  // qrData가 없을 경우 navigate를 사용하여 리디렉션합니다.
  useEffect(() => {
    if (!qrData) {
      navigate('/QRconnection');
    }
  }, [qrData, navigate]);

  const [powerOutput, setPowerOutput] = useState(0);

  // getPowerOutput 함수를 useCallback으로 감싸서 의존성 배열에 추가합니다.
  const getPowerOutput = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.example.com/power/${qrData}`,
      );
      setPowerOutput(response.data.powerOutput);
    } catch {
      // 오류를 무시합니다.
      // 대신 오류를 처리하는 방법을 고려하세요 (예: 사용자에게 알림).
    }
  }, [qrData]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPowerOutput(); // 5초마다 데이터 업데이트
    }, 5000);

    return () => clearInterval(interval);
  }, [getPowerOutput]); // 의존성 배열에 getPowerOutput 추가

  const handleEndSession = () => {
    navigate('/UsageHistory', { state: { powerOutput } }); // 세션 종료 시 사용량 페이지로 이동
  };

  return (
    <div>
      <h1>UsingBycycle Page</h1>
      <CircularProgressbar
        value={powerOutput}
        maxValue={100} // 최대 전력 생산량 설정
        text={`${powerOutput.toFixed(2)} W`}
      />
      <button type="button" onClick={handleEndSession}>
        세션 종료
      </button>
    </div>
  );
}

export default UsingBycycle;
