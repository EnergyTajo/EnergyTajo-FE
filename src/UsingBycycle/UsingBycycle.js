import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import './UsingBycycle.css';

function UsingBycycle() {
  const location = useLocation();
  const navigate = useNavigate(); // 먼저 navigate를 선언합니다.
  const { qrData } = location.state || {};

  useEffect(() => {
    if (!qrData) {
      alert('QR data not found. Redirecting to QR connection page.');
      navigate('/QRconnection'); // QR 데이터가 없으면 다시 A 페이지로 리디렉션
    }
  }, [qrData, navigate]);

  const [powerOutput, setPowerOutput] = useState(0);

  const getPowerOutput = async () => {
    try {
      const response = await axios.get(
        `https://api.example.com/power/${qrData}`,
      );
      setPowerOutput(response.data.powerOutput);
    } catch (error) {
      alert('Error fetching power output');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPowerOutput();
    }, 5000); // 5초마다 데이터 업데이트

    return () => clearInterval(interval);
  }, []);

  const handleEndSession = () => {
    navigate('/UsageHistory', { state: { powerOutput } }); // C 페이지로 이동
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
