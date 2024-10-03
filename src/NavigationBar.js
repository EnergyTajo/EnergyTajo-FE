import React from 'react';
import './NavigationBar.css'; // CSS 파일 import

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <h2>홍길동님</h2>
      <input type="text" placeholder="찾으시는 메뉴를 검색해보세요." className="search-bar" />
      <button type="button" className="search-button">
        검색
      </button>

      <div className="menu-section">
        <h3>내 정보</h3>
        <ul>
          <li>개인정보 수정</li>
          <li>비밀번호 변경</li>
        </ul>
      </div>

      <div className="menu-section">
        <h3>카드 관리</h3>
        <ul>
          <li>카드 등록</li>
          <li>카드 등록 해지</li>
          <li>카드 정보 변경</li>
        </ul>
      </div>

      <div className="menu-section">
        <h3>나의 활동</h3>
        <ul>
          <li>전체 에너지 생산 조회</li>
          <li>전체 포인트 조회</li>
        </ul>
      </div>

      <div className="menu-section">
        <h3>기기 관리</h3>
        <ul>
          <li>기기 고장 신고</li>
        </ul>
      </div>

      <div className="navigation-footer">
        <button type="button" className="footer-button">
          전체메뉴
        </button>
        <button type="button" className="footer-button">
          HOME
        </button>
        <button type="button" className="footer-button">
          MYPAGE
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;
