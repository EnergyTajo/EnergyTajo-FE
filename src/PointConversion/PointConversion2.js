import React, { useState, useEffect } from 'react';
import './PointConversion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function PointConversion2() {
  const [points, setPoints] = useState(0);
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [chargeAmount, setChargeAmount] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch('https://energytajo.site/api/userData', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setPoints(data.points))
      // eslint-disable-next-line
      .catch((error) => console.error('사용자 데이터 가져오기 오류:', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch('https://energytajo.site/api/account', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setAccountList(data))
      // eslint-disable-next-line
      .catch((error) => console.error('계좌 리스트 가져오기 오류:', error));
  }, []);

  const displayMessage = (msg, type = 'success') =>
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

  const handleCharge = () => {
    if (!selectedAccount || !chargeAmount) {
      displayMessage('계좌와 충전할 금액을 입력하세요.', 'error');
      return;
    }

    const requestBody = {
      account_num: selectedAccount.accountNum,
      bank_name: selectedAccount.bankName,
      amount: parseInt(chargeAmount, 10),
    };

    const token = localStorage.getItem('accessToken');
    fetch('https://energytajo.site/api/account/point_to_cash', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) throw new Error('충전 요청에 실패했습니다.');
        return response.text();
      })
      .then((message) =>
        displayMessage(message, 'success').then(() => setChargeAmount('')),
      )
      .then(() =>
        fetch('https://energytajo.site/api/userData', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
      )
      .then((response) => response.json())
      .then((data) => setPoints(data.points))
      .catch((error) => displayMessage(`충전 오류: ${error.message}`, 'error'));
  };

  return (
    <div className="pointconversion2-page-app">
      <div className="header-account-section">
        <p className="account-label">충전 계좌</p>
        <select
          onChange={(e) => {
            const selected = accountList.find(
              (account) => account.accountNum === e.target.value,
            );
            setSelectedAccount(selected);
          }}
          className="account-select"
        >
          <option value="">계좌를 선택하세요</option>
          {accountList.map((account) => (
            <option key={account.accountNum} value={account.accountNum}>
              {account.bankName}({account.accountNum.slice(-4)})
            </option>
          ))}
        </select>
      </div>

      <div className="pointconversion2-page-mypoints">
        <h2 className="mypoints-label">보유 포인트 🌱</h2>
        <h1 className="mypoints">{points}</h1>
        <p className="mypoints-label-p">P</p>
      </div>

      <div className="pointconversion2-page-points-input2">
        <input
          type="number"
          placeholder="충전할 포인트를 입력하세요."
          min="0"
          step="1"
          value={chargeAmount}
          onChange={(e) => setChargeAmount(e.target.value)}
          className="point-input2"
        />
        <span className="point-unit">P</span>
      </div>

      <button type="submit" className="charge-button" onClick={handleCharge}>
        충전하기
      </button>
    </div>
  );
}

export default PointConversion2;
