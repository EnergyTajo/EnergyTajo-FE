import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UsingBycycle.css';

function UsageHistory() {
  const location = useLocation();
  const { powerOutput } = location.state || {}; // UsingBycycle에서 전송된 powerOutput
  const navigate = useNavigate();

  return (
    <div>
      <h1>UsingHistory Page</h1>
      <p>모은 에너지: {powerOutput} W</p>
      <button type="button" onClick={() => navigate('/')}>
        홈으로
      </button>
    </div>
  );
}

export default UsageHistory;
