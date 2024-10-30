import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Menu.css';

function Menu() {
  const [username, setUsername] = useState(''); // 사용자 이름 상태 저장
  const navigate = useNavigate();

  const displayMessage = (msg, type = 'success') => {
    Swal.fire({
      title: '',
      text: msg,
      padding: '1em 0.3em',
      icon: type === 'error' ? 'warning' : type,
      confirmButtonText: 'OK',
      background: '#fff',
      customClass: {
        popup: 'my-custom-swal',
        confirmButton: 'my-custom-swal-button',
      },
      buttonsStyling: false,
    });
  };

  // 사용자 정보를 불러오는 로직
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('https://energytajo.site/api/userData', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.name); // 사용자 이름 설정
        } else {
          // SweetAlert로 오류 메시지 표시
          displayMessage('사용자 정보를 불러오지 못했습니다.', 'error');
        }
      } catch (error) {
        // SweetAlert로 오류 메시지 표시
        displayMessage(
          `사용자 정보를 불러오지 못했습니다: ${error.message}`,
          'error',
        );
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch('https://energytajo.site/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        localStorage.removeItem('accessToken');
        displayMessage('로그아웃 되었습니다.', 'success');
        navigate('/');
      } else {
        const errorData = await response.json();
        displayMessage(`로그아웃 실패: ${errorData.message}`, 'error');
      }
    } catch (error) {
      displayMessage(`로그아웃 중 오류 발생: ${error.message}`, 'error');
    }
  };

  return (
    <div className="menu-container">
      <div className="top">
        <div className="top-userInfo">
          <p className="greeting">{username} 님</p>
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
            <Link to="/CardCheck">카드 등록</Link>
          </li>
          <li>
            <Link to="/MainPage">카드 등록 해지</Link>
          </li>
          <li>
            <Link to="/ConnectCard">카드 정보 변경</Link>
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
    </div>
  );
}

export default Menu;
