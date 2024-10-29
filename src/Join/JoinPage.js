import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './JoinPage.css';

function JoinPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [userName, setUserName] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [email, setEmail] = useState('');
  const [successNum, setSuccessNum] = useState('');
  const [idError, setIdError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState(null); // UI 메시지 상태 추가
  const [messageType, setMessageType] = useState(null); // 성공/오류 메시지 유형 상태 추가

  const selectedPhone = '010';
  const selectMail = ['@gmail.com', '@naver.com', '@nate.com', '@daum.com'];
  const [selectedMail, setSelectedMail] = useState(selectMail[0]);

  const handleSelectEmail = (e) => setSelectedMail(e.target.value);
  const PASSWORD_REGEX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=\\S+$).{8,20}$/;

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value);

      // 비밀번호가 정규식 조건을 충족하지 않을 경우 에러 메시지 설정
      if (!PASSWORD_REGEX.test(value)) {
        setPasswordError(
          '⚠️ 특수문자, 대소문자, 숫자를 포함한 8~20자여야 합니다.',
        );
      } else {
        setPasswordError('');
      }
    } else {
      setConfirm(value);
      setConfirmError(
        value !== password ? '⚠️ 비밀번호가 일치하지 않습니다.' : '',
      );
    }
  };

  const displayMessage = (msg, type = 'success') => {
    Swal.fire({
      title: type === 'success' ? 'Success' : 'Error',
      text: msg,
      icon: type,
      confirmButtonText: 'OK',
      background: '#fff',
      customClass: {
        popup: 'my-custom-swal',
      },
    });
  };
  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;

    // 한글이 포함된 경우의 정규식
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (hasKorean.test(idValue)) {
      setIdError('⚠️ 아이디에 한글을 포함할 수 없습니다.');
    } else if (idValue.length < 4) {
      setIdError('⚠️ 아이디는 4자 이상이어야 합니다.');
    } else {
      setIdError(''); // 조건을 만족하면 에러 메시지 제거
    }

    setUserId(idValue);
  };

  const checkIdDuplicate = async () => {
    if (!userId.trim()) {
      // userId가 비어 있는지 확인
      displayMessage('아이디를 입력해주세요.', 'error'); // 에러 메시지 표시
      return;
    }
    if (userId.length < 4) {
      displayMessage('아이디는 4자 이상이어야 합니다.', 'error');
      return;
    }
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (hasKorean.test(userId)) {
      displayMessage('아이디에 한글을 포함할 수 없습니다.', 'error');
      return;
    }

    try {
      const response = await fetch(
        `https://www.energytajo.site/api/auth/check-id?uuid=${userId}`,
      );
      if (response.ok) {
        const successMessage = await response.text();
        displayMessage(successMessage, 'success');
      } else {
        const errorData = await response.json();
        displayMessage(errorData.message, 'error');
      }
    } catch (error) {
      displayMessage('ID 중복 체크 중 오류가 발생했습니다.', 'error');
    }
  };

  const sendVerificationCode = async () => {
    const phoneNum = `${selectedPhone}${phone2}${phone3}`;
    try {
      const response = await fetch(
        'https://www.energytajo.site/api/auth/verify/send-code',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNum }),
        },
      );

      if (response.ok) {
        displayMessage('인증 번호가 성공적으로 전송되었습니다.', 'success');
      } else {
        const errorData = await response.json();
        displayMessage(`오류: ${errorData.message}`, 'error');
      }
    } catch (error) {
      displayMessage('인증 번호 전송 중 오류 발생', 'error');
    }
  };

  const verifyCode = async () => {
    const phoneNum = `${selectedPhone}${phone2}${phone3}`;
    try {
      const response = await fetch(
        'https://www.energytajo.site/api/auth/verify/check-code',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNum, verificationCode: successNum }),
        },
      );

      if (response.ok) {
        const successMessage = await response.text(); // 변수 이름 변경
        displayMessage(successMessage, 'success');
      } else {
        const errorData = await response.json();
        displayMessage(errorData.message, 'error');
      }
    } catch (error) {
      displayMessage('SMS 인증 코드 확인 중 오류 발생', 'error');
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (passwordError) {
      displayMessage('비밀번호 조건을 만족해야 합니다.', 'error');
      return;
    }

    try {
      const phoneNum = `${selectedPhone}${phone2}${phone3}`;
      const signupData = {
        uuid: userId,
        pw: password,
        name: userName,
        email: `${email}${selectedMail}`,
        phone_num: phoneNum,
        consent_status: termsAccepted,
      };

      const response = await fetch(
        'https://www.energytajo.site/api/auth/sign-up',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData),
        },
      );

      if (response.ok) {
        displayMessage('회원가입 성공', 'success');
        // 필요 시 로그인 페이지 또는 메인 페이지로 이동
      } else {
        const errorData = await response.json();
        displayMessage(errorData.message, 'error');
      }
    } catch (error) {
      displayMessage('회원가입 중 오류 발생', 'error');
    }
  };
  return (
    <div className="join-page-app">
      <header className="join-page-header">
        <img src="./img/logo.png" alt="Header Logo" className="header-img" />
      </header>

      <main className="join-page-main">
        {message && <div className="alert-message">{message}</div>}
        <Form onSubmit={signupHandler}>
          <div className="join-page-section">
            <div className="join-page-idpw">
              <div className="join-page-id">
                <label htmlFor="id">아이디</label>
                <Form.Control
                  type="text"
                  id="id"
                  name="id"
                  value={userId}
                  placeholder="영어로 4글자 이상 입력하시오"
                  onChange={onChangeIdHandler}
                />
                <button
                  type="button"
                  className="btn btn-id-check"
                  onClick={checkIdDuplicate}
                >
                  중복체크
                </button>
              </div>
              <small className="text-error">{idError || ' '} </small>
              <div className="join-page-pw">
                <label htmlFor="password">비밀번호</label>
                <Form.Control
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="특수문자, 대소문자, 숫자 포함 8~20 글자"
                />
              </div>
              <small className="text-error">{passwordError || ' '}</small>

              <div className="join-page-pwcheck">
                <label
                  htmlFor="confirm"
                  style={{ fontSize: '13px', marginTop: '0px' }}
                >
                  비밀번호 재확인
                </label>
                <Form.Control
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="confirm"
                  name="confirm"
                  value={confirm}
                  placeholder="비밀번호 재입력"
                />
              </div>
              <small className="text-error">{confirmError || ' '}</small>
            </div>

            <div className="join-page-info">
              <div className="join-page-name">
                <label htmlFor="name">이름</label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="이름 입력"
                />
              </div>

              <div className="join-page-phone">
                <label htmlFor="phone">전화번호</label>
                <span style={{ fontSize: '20px' }}>{selectedPhone}</span> -
                <Form.Control
                  type="text"
                  id="phone2"
                  name="phone2"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  maxLength={4}
                />{' '}
                -
                <Form.Control
                  type="text"
                  id="phone3"
                  name="phone3"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  maxLength={4}
                />
                <Button
                  type="button"
                  className="btn btn-phone-check"
                  onClick={sendVerificationCode}
                >
                  인증번호
                </Button>
              </div>

              <div className="join-page-success">
                <label htmlFor="success_num">인증번호</label>
                <Form.Control
                  type="text"
                  id="success_num"
                  name="success_num"
                  value={successNum}
                  onChange={(e) => setSuccessNum(e.target.value)}
                  placeholder="인증번호 입력"
                />
                <Button
                  type="button"
                  className="btn btn-success-check"
                  onClick={verifyCode}
                >
                  인증하기
                </Button>
              </div>

              <div className="join-page-email">
                <label htmlFor="email">E-mail</label>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email 입력"
                />
                <select onChange={handleSelectEmail} value={selectedMail}>
                  {selectMail.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="term-label">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span>약관 전체 동의</span>
            </label>

            <div className="btn-join">
              <Button type="submit">가입하기</Button>
            </div>
          </div>
        </Form>
      </main>
    </div>
  );
}

export default JoinPage;
