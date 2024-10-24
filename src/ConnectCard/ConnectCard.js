import React, { useState } from 'react';
import './ConnectCard.css';
// import axios from 'axios';

function ConnectCard() {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountAlias, setAccountAlias] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isFormValid =
    bank && accountNumber && (accountAlias || accountAlias === '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 데이터베이스와 연동하는 로직 추가
    // console.log({ bank, accountNumber, accountAlias, termsAccepted });
  };

  return (
    <div className="connectcard-page-app">
      <div className="header-connectcard-section">
        <p className="connectcard-header-p">카드 등록</p>
      </div>
      <form onSubmit={handleSubmit} className="connectcard-form">
        <label htmlFor="bank">은행명</label>
        <select
          id="bank"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          required
        >
          <option value="">은행을 선택하세요</option>
          <option value="부산은행">부산은행</option>
          <option value="하나은행">하나은행</option>
          <option value="농협은행">농협은행</option>
          <option value="코나">코나</option>
        </select>

        <label htmlFor="accountNumber">계좌번호</label>
        <input
          id="accountNumber"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />

        <label htmlFor="accountAlias">계좌별칭 (선택)</label>
        <input
          id="accountAlias"
          type="text"
          value={accountAlias}
          onChange={(e) => setAccountAlias(e.target.value)}
        />

        <label className="terms-label">
          <input
            type="checkbox"
            id="termsAccepted"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <span>오픈뱅킹 약관 전체 동의</span>
        </label>

        <button
          className="connect-button"
          type="submit"
          style={{
            backgroundColor: isFormValid ? '#749f83' : '#ccc',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
          disabled={!isFormValid}
        >
          연결하기
        </button>
      </form>
    </div>
  );
}

export default ConnectCard;
