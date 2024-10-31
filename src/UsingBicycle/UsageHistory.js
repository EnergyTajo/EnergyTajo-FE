import React from 'react';
import { useLocation } from 'react-router-dom';
import { faLeaf, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UsingBicycle.css';

function UsageHistory() {
  const location = useLocation();
  const { usageData } = location.state || {}; // UsingBycycle에서 전송된 이용 종료 데이터

  if (!usageData) {
    return <p>이용 내역 데이터를 불러오지 못했습니다. 다시 시도해 주세요.</p>;
  }

  return (
    <div className="usagehistory-page-app">
      <div className="header-usagehistory-section">
        <p className="usagehistory-header-p">이용 내역</p>
      </div>
      <div className="top-user-section">
        <div className="profile-details">
          <h1 className="profile-name">
            {usageData.userId} 님 {/* 사용자 이름 표시 */}
            <FontAwesomeIcon icon={faLeaf} className="fa-icon-leaf" />
          </h1>
          <p className="profile-status">
            포인트 전환까지{' '}
            <strong>{usageData.finalPowerGenerated} 전력</strong> 남았습니다
          </p>
          <div className="progress-bar">
            <FontAwesomeIcon
              icon={faFaceSmile}
              style={{ color: '#B197FC' }}
              className="profile-image"
            />
          </div>
        </div>
      </div>
      <div className="info-section">
        {/* 첫 번째 섹션: 상세 정보 */}
        <div className="detail-info">
          <div className="detail-info-header">
            상세 정보
            <FontAwesomeIcon icon={faLeaf} className="fa-icon-leaf" />
          </div>
          <div className="detail-info-content">
            <table className="usage-table">
              <tbody>
                <tr>
                  <td className="left">자가발전기 번호</td>
                  <td className="right">{usageData.bicycleId}</td>
                </tr>
                <tr>
                  <td className="left">탑승 일자</td>
                  <td className="right">{usageData.startRideDate}</td>
                </tr>
                <tr>
                  <td className="left">탑승 시작 시간</td>
                  <td className="right">{usageData.startTime}</td>
                </tr>
                <tr>
                  <td className="left">탑승 종료 시간</td>
                  <td className="right">{usageData.endTime}</td>
                </tr>
                <tr>
                  <td className="left">총 이용 시간</td>
                  <td className="right">{usageData.duration}</td>
                </tr>
                <tr>
                  <td className="left">소모 칼로리(거리)</td>
                  <td className="right">
                    <span style={{ color: '#00b050' }}>
                      {usageData.caloriesBurned} Kcal
                    </span>{' '}
                    ({usageData.distance} M)
                  </td>
                </tr>
                <tr>
                  <td className="left">생성 전력량</td>
                  <td className="right">{usageData.powerGenerated} W</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 두 번째 섹션: 포인트 정보 */}
        <div className="point-info">
          <div className="point-info-header">
            포인트 정보
            <FontAwesomeIcon icon={faLeaf} className="fa-icon-leaf" />
          </div>
          <div className="point-info-content">
            <table className="usage-table">
              <tbody>
                <tr>
                  <td className="left">기존 전력량</td>
                  <td className="right">
                    {usageData.previousPowerGenerated} W
                  </td>
                </tr>
                <tr>
                  <td className="left">생성 전력량</td>
                  <td className="right">{usageData.powerGenerated} W</td>
                </tr>
                <tr>
                  <td className="left">누적 전력량</td>
                  <td className="right" style={{ color: '#f39c12' }}>
                    {usageData.totalPowerGenerated} W
                  </td>
                </tr>
                <tr>
                  <td className="left">자동 전환 포인트</td>
                  <td className="right" style={{ color: 'red' }}>
                    {usageData.convertedPoints} P
                  </td>
                </tr>
                <tr>
                  <td className="left">배터리 상태</td>
                  <td className="right">{usageData.batteryStat}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsageHistory;
