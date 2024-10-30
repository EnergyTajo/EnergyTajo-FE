import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const [nameError, setNameError] = useState('');
  const [message] = useState(null);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const [isVerificationFieldEnabled, setIsVerificationFieldEnabled] =
    useState(false);

  const selectedPhone = '010';
  const selectMail = ['@gmail.com', '@naver.com', '@nate.com', '@daum.com'];
  const [selectedMail, setSelectedMail] = useState(selectMail[0]);

  const PASSWORD_REGEX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,20}$/;
  const NAME_REGEX = /^(?!.*[ㄱ-ㅎㅏ-ㅣa-zA-Z])[가-힣]{2,10}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+$/;

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

  const handleSelectEmail = (e) => setSelectedMail(e.target.value);

  const onChangeEmailHandler = (e) => {
    const emailValue = e.target.value;

    // 이메일 형식 유효성 검사
    if (!EMAIL_REGEX.test(emailValue)) {
      setEmailError('⚠️ 유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }

    setEmail(emailValue);
  };
  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value);

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
  const onChangeIdHandler = (e) => {
    setIsIdChecked(false);
    const idValue = e.target.value;
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (hasKorean.test(idValue)) {
      setIdError('⚠️ 아이디에 한글을 포함할 수 없습니다.');
    } else if (idValue.length < 4) {
      setIdError('⚠️ 아이디는 4자 이상이어야 합니다.');
    } else {
      setIdError('');
    }

    setUserId(idValue);
  };
  const onChangeNameHandler = (e) => {
    const nameValue = e.target.value;

    if (!NAME_REGEX.test(nameValue)) {
      if (nameValue.length < 2 || nameValue.length > 10) {
        setNameError('⚠️ 이름은 한글로 2~10자여야 합니다.');
      } else if (/[ㄱ-ㅎㅏ-ㅣ]/.test(nameValue)) {
        setNameError('⚠️ 자음 또는 모음만 사용할 수 없습니다.');
      } else if (/[a-zA-Z]/.test(nameValue)) {
        setNameError('⚠️ 한글로 입력해주세요.');
      } else {
        setNameError('');
      }
    } else {
      setNameError('');
    }

    setUserName(nameValue);
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
        setIsIdChecked(true);
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
        setIsVerificationFieldEnabled(true);
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
        const successMessage = await response.text();
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

    if (!isIdChecked) {
      displayMessage('ID 중복체크가 완료되지 않았습니다.', 'error');
      return;
    }
    if (!password) {
      displayMessage('비밀번호가 입력되지 않았습니다.', 'error');
      return;
    }
    if (passwordError) {
      displayMessage('비밀번호 조건을 만족해야 합니다.', 'error');
      return;
    }
    if (password !== confirm) {
      displayMessage('비밀번호가 일치하지 않습니다.', 'error');
      return;
    }
    if (!userName || nameError) {
      displayMessage('이름을 올바르게 작성해주세요.', 'error');
      return;
    }
    if (!isVerificationFieldEnabled) {
      displayMessage('전화번호 인증이 완료되지 않았습니다.', 'error');
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
        displayMessage('🌱 회원가입 성공', 'success');
        setTimeout(() => navigate('/'), 2000);
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
              <div className="join-page-name">
                <label htmlFor="name">이름</label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={userName}
                  onChange={onChangeNameHandler}
                  placeholder="성과 이름을 모두 입력하시오."
                />
              </div>
              <small className="text-error">{nameError || ' '}</small>
            </div>

            <div className="join-page-info">
              <div className="join-page-phone">
                <label htmlFor="phone">전화번호</label>
                <span style={{ fontSize: '17px' }}>{selectedPhone}</span> -
                <Form.Control
                  type="text"
                  id="phone2"
                  name="phone2"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  maxLength={4}
                  placeholder="1234"
                />{' '}
                -
                <Form.Control
                  type="text"
                  id="phone3"
                  name="phone3"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  maxLength={4}
                  placeholder="5678"
                />
                <Button
                  type="button"
                  className="btn btn-phone-check"
                  onClick={sendVerificationCode}
                  disabled={
                    !phone2 || !phone3 || phone2.length < 4 || phone3.length < 4
                  }
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
                  disabled={!isVerificationFieldEnabled}
                />
                <Button
                  type="button"
                  className="btn btn-success-check"
                  onClick={verifyCode}
                  disabled={!isVerificationFieldEnabled}
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
                  onChange={onChangeEmailHandler}
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
              <small className="text-error">{emailError || ' '}</small>
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
