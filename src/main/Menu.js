import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const [username, setUsername] = useState(''); // 사용자 이름 상태 저장
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 사용자 정보를 외부에서 받아오는 로직 (예: API 호출)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 예시로 실제 API 호출
        const response = await fetch('/api/user'); // 실제 API URL로 변경
        const data = await response.json();
        setUsername(data.username); // 응답 데이터에서 사용자 이름 설정
      } catch (error) {
        // console.error('사용자 정보를 불러오지 못했습니다:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="menu-container">
      <div className="top">
        <div className="top-userInfo">
          <p className="greeting">
            {username ? `${username} 님` : '로그인 전'}
          </p>
          <button type="button" className="login-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        <div className="top-search">
          <input
            type="text"
            placeholder="찾으시는 메뉴를 검색해보세요."
            className="search-input"
          />
          <button type="button" className="search-button">
            검색
          </button>
        </div>
      </div>
      <div className="list">
        <p>내 정보</p>
        <ul className="menu-list">
          <li>
            <Link to="/MainPage">개인정보 수정</Link>
          </li>
          <li>
            <Link to="/MainPage">비밀번호 변경</Link>
          </li>
        </ul>
        <p>카드 관리</p>
        <ul className="menu-list">
          <li>
            <Link to="/ConnectCard">카드 등록</Link>
          </li>
          <li>
            <Link to="/MainPage">카드 등록 해지</Link>
          </li>
          <li>
            <Link to="/MainPage">카드 정보 변경</Link>
          </li>
        </ul>
        <p>나의 활동</p>
        <ul className="menu-list">
          <li>
            <Link to="/EnergyDetail">전체 에너지 생산 및 포인트 조회</Link>
          </li>
          <li>
            <Link to="/PointConversion1">포인트 전환</Link>
          </li>
        </ul>
        <p>기기 관리</p>
        <ul className="menu-list">
          <li>
            <Link to="/MainPage">기기 고장 신고</Link>
          </li>
        </ul>
      </div>

      {/* 로그아웃 모달 */}
      {isModalOpen && (
        <div className="modal">
          <p>로그아웃 되었습니다.</p>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false); // 모달 닫기
              window.location.href = '/MainPage'; // 페이지 리다이렉트
            }}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
