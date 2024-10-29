import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
  };

  const onChangePasswordHandler = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch(
        'https://www.energytajo.site/api/auth/sign-in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid: id, pw: password }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // 토큰을 localStorage에 저장
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        window.location.href = '/MainPage';
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로그인 중 오류 발생:', error);
    }
  };

  return (
    <div className="login-page-app">
      <header className="main-page-header">
        <img src="./img/logo.png" alt="Header Logo" />{' '}
      </header>

      <main className="login-page-main">
        <Form onSubmit={signupHandler}>
          <div className="login-page-section">
            <div className="login-page-idpw">
              <div className="login-page-id">
                <Form.Control
                  onChange={onChangeIdHandler}
                  type="text"
                  id="id"
                  name="id"
                  value={id}
                  placeholder="아이디를 입력하세요."
                />
              </div>
              <div className="login-page-pw">
                <Form.Control
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호를 입력하세요."
                />
              </div>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <Button type="submit" className="btn btn-login">
              LOGIN
            </Button>
            <div className="find-links">
              <a href="/find-id" className="find-id">
                ID 찾기
              </a>{' '}
              |{' '}
              <a href="/find-pw" className="find-pw">
                PW 찾기
              </a>
            </div>
          </div>
        </Form>

        <div className="sns-login-section">
          <span className="sns-login-text">
            <hr className="line" />
            간편 SNS 로그인
            <hr className="line" />
          </span>
          <div className="sns-icons">
            <img src="./img/sns_kakao.png" alt="Kakao Login" />
            <img src="./img/sns_google.png" alt="Google Login" />
            <img src="./img/sns_naver.png" alt="Naver Login" />
          </div>
        </div>

        <div className="register-section">
          <span>아직 회원이 아니십니까?</span>{' '}
          <a href="/JoinPage" className="register-link">
            계정 생성하기
          </a>
        </div>
        <footer className="footer">ⓒ ENERGYTAJO</footer>
      </main>
    </div>
  );
}

export default LoginPage;