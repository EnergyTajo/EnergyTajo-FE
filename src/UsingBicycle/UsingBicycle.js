import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UsingBicycle.css';

function UsingBycycle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { qrData } = location.state || {}; // QR 데이터

  const [powerOutput, setPowerOutput] = useState(0);
  const [calorieConsumption, setCalorieConsumption] = useState(0); // 칼로리 소비량 상태 추가
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 상태 추가
  const [rideId, setRideId] = useState(null); // 이용 ID 상태 추가

  // 페이지 로드 시 자전거 이용 시작 API 호출
  useEffect(() => {
    const startRide = async () => {
      if (!qrData) {
        // QR 데이터가 없으면 스캐너 페이지로 이동
        navigate('/QRScanner');
        return;
      }

      try {
        const token = localStorage.getItem('token');

        // 이용 시작 API 호출
        const startRideResponse = await axios.post(
          `https://energytajo.site/api/qr_bicycle/start/${qrData}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // 이용 시작 ID 저장
        setRideId(startRideResponse.data.id);
      } catch (error) {
        toast.error('자전거 이용을 시작하지 못했습니다. 다시 시도해 주세요.');
        navigate('/QRScanner');
      }
    };

    startRide();
  }, [qrData, navigate]);

  // 시간 경과에 따른 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev < 3599) {
          return prev + 1;
        }
        return 0; // 1시간이 되면 다시 0으로 초기화
      });
      // 경과 시간에 따라 칼로리 및 전력량 업데이트
      // 거리 계산 (1초마다 5m 증가)
      const distanceCovered = (elapsedTime + 1) * 5;

      // 칼로리 소모량 계산 (20m당 1kcal 소모)
      const burnedCalories = Math.floor(distanceCovered / 20);

      // 1.6kcal 당 1 전력량 증가
      const generatedPower = Math.floor(burnedCalories / 1.6);

      setCalorieConsumption(burnedCalories);
      setPowerOutput(generatedPower);
    }, 1000);

    return () => clearInterval(interval);
  }, [elapsedTime]);

  // 이용 종료 처리 함수
  const handleEndSession = async () => {
    try {
      const token = localStorage.getItem('token');

      // 이용 종료 API 호출
      const endRideResponse = await axios.post(
        `https://energytajo.site/api/qr_bicycle/end/${rideId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate('/UsageHistory', { state: { usageData: endRideResponse.data } });
    } catch (error) {
      toast.error('이용 종료에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const percentage = (elapsedTime % 3600) / 36; // 1시간 = 3600초, 퍼센트 계산

  return (
    <div className="usingbycycle-page-app">
      <div className="header-usingbycycle-section">
        <p className="usingbycycle-header-p">자전거 이용</p>
      </div>
      <div className="circularbar-section">
        <CircularProgressbar
          value={percentage}
          maxValue={100}
          text={`${Math.floor(elapsedTime / 3600)}H ${Math.floor((elapsedTime % 3600) / 60)}M ${elapsedTime % 60}S`}
          styles={{
            path: { stroke: percentage < 100 ? '#ffeb3b' : '#ffd22f' },
            text: { fill: '#000', fontSize: '15px' },
            trail: { stroke: '#d6d6d6' },
          }}
        />
      </div>
      <Row className="number-section">
        <Col className="d-flex all-card">
          <Card className="text-center power-card">
            <Card.Body>
              <h1 style={{ color: '#ffe300' }}>
                {powerOutput.toFixed(2)} <span>W</span>
              </h1>
              <h2 style={{ color: 'black' }}>생산 전력</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex all-card">
          <Card className="text-center calorie-card">
            <Card.Body>
              <h1 style={{ color: '#749f83' }}>
                {calorieConsumption.toFixed(2)} <span>Kcal</span>
              </h1>
              <h2 style={{ color: 'black' }}>소모 칼로리</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <button
        type="button"
        className="finish-button"
        onClick={handleEndSession}
      >
        종료
      </button>
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

export default UsingBycycle;
