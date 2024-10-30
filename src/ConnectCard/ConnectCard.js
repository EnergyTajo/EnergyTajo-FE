import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectCard.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function ConnectCard() {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountAlias, setAccountAlias] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [accountNumberError, setAccountNumberError] = useState('');
  const navigate = useNavigate();

  const isFormValid =
    bank && accountNumber.length >= 10 && (accountAlias || accountAlias === '');

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

  const handleAccountNumberChange = (e) => {
    const { value } = e.target;
    setAccountNumber(value);

    // 계좌번호 길이 검사
    if (value.length < 10) {
      setAccountNumberError('⚠️ 계좌번호는 10자 이상이어야 합니다.');
    } else {
      setAccountNumberError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
    try {
      const response = await axios.post(
        'https://www.energytajo.site/api/account/create',
        {
          account_num: accountNumber,
          bank_name: bank,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // 성공적으로 요청이 완료된 경우
      displayMessage('계좌가 성공적으로 등록되었습니다!', 'success');
      navigate('/MainPage');
    } catch (error) {
      if (error.response) {
        displayMessage(
          error.response.data.message || '계좌 등록에 실패했습니다.',
          'error',
        );
      } else {
        displayMessage('계좌 등록 중 문제가 발생했습니다.', 'error');
      }
    }
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
          onChange={handleAccountNumberChange}
          required
        />
        {accountNumberError && (
          <small className="connectcard-text-error">
            {accountNumberError || ' '}
          </small>
        )}

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
