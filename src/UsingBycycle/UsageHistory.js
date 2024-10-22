import { faLeaf, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './UsingBycycle.css';

function UsageHistory() {
  const location = useLocation();
  const { powerOutput } = location.state || {}; // UsingBycycle에서 전송된 powerOutput

  // 사용자 정보를 저장할 상태
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 데이터베이스에서 사용자 정보를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://api.example.com/userdata'); // 사용자 데이터 API 호출
      setUserInfo(response.data); // 사용자 데이터 상태 설정
    } catch (error) {
      // console.error('사용자 데이터 로드 실패:', error);
    } finally {
      setLoading(false); // 로딩 상태 업데이트
    }
  };

  useEffect(() => {
    fetchUserData(); // 컴포넌트 마운트 시 데이터 로드
  }, []);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className="usagehistory-page-app">
      <div className="header-usagehistory-section">
        <p className="usagehistory-header-p">이용 내역</p>
      </div>
      <div className="top-user-section">
        {/* 이름, 이미지, 글자, 포인트 게이지 바 */}
        <div className="profile-details">
          <h1 className="profile-name">
            {userInfo?.name || ''} 님 {/* 사용자 이름 표시, null일 경우 공백 */}
            <FontAwesomeIcon icon={faLeaf} className="fa-icon-leaf" />
          </h1>
          <p className="profile-status">
            포인트 전환까지{' '}
            <strong>{userInfo?.remainingPower || ''} 전력</strong> 남았습니다{' '}
            {/* 남은 전력 표시 */}
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${userInfo ? (userInfo.remainingPower / userInfo.goalPower) * 100 : 0}%`,
              }} // 게이지 바
            />
          </div>
        </div>
        <FontAwesomeIcon
          icon={faFaceSmile}
          style={{ color: '#B197FC' }}
          className="profile-image"
        />
      </div>
      {/* 상세 정보, 포인트 정보 */}
      <div className="info-section">
        {/* 첫 번째 섹션 */}
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
                  <td className="right">
                    {userInfo?.generatorNumber || ''}
                  </td>{' '}
                  {/* 자가발전기 번호 */}
                </tr>
                <tr>
                  <td className="left">탑승 일자</td>
                  <td className="right">{userInfo?.rideDate || ''}</td>{' '}
                  {/* 탑승 일자 */}
                </tr>
                <tr>
                  <td className="left">탑승 시간</td>
                  <td className="right">{userInfo?.rideTime || ''}</td>{' '}
                  {/* 탑승 시간 */}
                </tr>
                <tr>
                  <td className="left">총 이용 시간</td>
                  <td className="right">
                    {userInfo?.totalUsageTime || ''}
                  </td>{' '}
                  {/* 총 이용 시간 */}
                </tr>
                <tr>
                  <td className="left">소모 칼로리(거리)</td>
                  <td className="right">
                    <span style={{ color: '#00b050' }}>
                      {userInfo?.calories || ''} Kcal
                    </span>{' '}
                    ({userInfo?.distance || ''} KM) {/* 소모 칼로리 */}
                  </td>
                </tr>
                <tr>
                  <td className="left">생성 전력량</td>
                  <td className="right">{powerOutput || ''} W</td>{' '}
                  {/* 생성 전력량 */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 두 번째 섹션 */}
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
                    {userInfo?.previousPower || ''} W
                  </td>{' '}
                  {/* 기존 전력량 */}
                </tr>
                <tr>
                  <td className="left">생성 전력량</td>
                  <td className="right">{powerOutput || ''} W</td>{' '}
                  {/* 생성 전력량 */}
                </tr>
                <tr>
                  <td className="left">누적 전력량</td>
                  <td className="right" style={{ color: '#f39c12' }}>
                    {userInfo?.totalPower || ''} W {/* 누적 전력량 */}
                  </td>
                </tr>
                <tr>
                  <td className="left">자동 전환 포인트</td>
                  <td className="right" style={{ color: 'red' }}>
                    {userInfo?.automaticPoints || ''} P {/* 자동 전환 포인트 */}
                  </td>
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
