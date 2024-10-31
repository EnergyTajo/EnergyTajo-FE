import React, { useEffect, useState, useCallback } from 'react';
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

  // QR 데이터로 자전거 정보 가져오기
  useEffect(() => {
    const fetchBicycleData = async () => {
      if (!qrData) {
        // QR 데이터가 없으면 스캐너 페이지로 이동
        navigate('/QRScannerPage');
        return;
      }

      try {
        const response = await axios.get(
          `https://energytajo.site/api/qr_bicycle/${qrData}`,
        );
        const bicycleData = response.data;

        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem('token');

        // 이용 시작 API 호출
        const startRideResponse = await axios.post(
          `https://energytajo.site/api/qr_bicycle/start/${bicycleData.bicycleId}`,
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
        toast.error('자전거 정보를 불러오지 못했습니다. 다시 시도해 주세요.');
        navigate('/QRScannerPage');
      }
    };

    fetchBicycleData();
  }, [qrData, navigate]);

  // 시간 경과에 따른 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      if (elapsedTime < 120) {
        // 2시간(120분)까지 경과 시간 증가
        setElapsedTime((prev) => prev + 1);
      }
    }, 1000); // 1초마다 증가

    return () => clearInterval(interval);
  }, [elapsedTime]);

  const getPowerOutput = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.example.com/power/${qrData}`,
      );
      setPowerOutput(response.data.powerOutput); // 외부 API로부터 전력 출력 데이터 가져오기
      setCalorieConsumption(response.data.calorieConsumption); // 칼로리 소비량 데이터 추가
    } catch {
      toast.error('전력 출력 데이터를 불러오지 못했습니다.');
    }
  }, [qrData]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPowerOutput(); // 2초마다 데이터 업데이트
    }, 2000);

    return () => clearInterval(interval);
  }, [getPowerOutput]);

  const handleEndSession = async () => {
    try {
      // 로컬 스토리지에서 토큰 가져오기
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

      // 이용 내역 페이지로 이동, 반환된 데이터를 넘겨줌
      navigate('/UsageHistory', { state: { usageData: endRideResponse.data } });
    } catch (error) {
      toast.error('이용 종료에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const percentage = (elapsedTime / 120) * 100; // 최대 120분에 대한 퍼센트 계산

  return (
    <div className="usingbycycle-page-app">
      <div className="header-usingbycycle-section">
        <p className="usingbycycle-header-p">자전거 이용</p>
      </div>
      <div className="circularbar-section">
        <CircularProgressbar
          value={percentage}
          maxValue={100} // 최대 값 설정
          text={`${Math.floor(elapsedTime / 60)}H${elapsedTime % 60}M`} // HHMM 형식으로 표시
          styles={{
            path: {
              stroke: percentage < 100 ? '#ffeb3b' : '#ffd22f', // 색상 설정: 회색에서 노란색으로
            },
            text: {
              fill: '#000', // 텍스트 색상 검정색
              fontSize: '20px', // 텍스트 크기 조정
            },
            trail: {
              stroke: '#d6d6d6', // 배경 원형 바 색상
            },
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
