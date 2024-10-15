import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가
import './Menu.css';

function Menu() {
  return (
    <div className="menu-container">
      <div className="top">
        <div className="top-userInfo">
          <h1 className="greeting">큐티쁘띠 님</h1>
          <button type="button" className="login-button">
            로그인
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
        <h2>내 정보</h2>
        <ul className="menu-list">
          <li>
            <Link to="/MainPage">개인정보 수정</Link>
          </li>
          <li>
            <Link to="/MainPage">비밀번호 변경</Link>
          </li>
        </ul>
        <h2>카드 관리</h2>
        <ul className="menu-list">
          <li>
            <Link to="/MainPage">카드 등록</Link>
          </li>
          <li>
            <Link to="/MainPage">카드 등록 해지</Link>
          </li>
          <li>
            <Link to="/MainPage">카드 정보 변경</Link>
          </li>
        </ul>
        <h2>나의 활동</h2>
        <ul className="menu-list">
          <li>
            <Link to="/MainPage">전체 에너지 생산 조회</Link>
          </li>
          <li>
            <Link to="/MainPage">전체 포인트 조회</Link>
          </li>
        </ul>
        <h2>기기 관리</h2>
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
