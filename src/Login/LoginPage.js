import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // react-bootstrap에서 Form과 Button 가져오기
import './LoginPage.css';

function LoginPage() {
  const [id, setId] = useState(''); // 아이디 설정
  const [password, setPassword] = useState(''); // 비밀번호 설정
  // const [idError, setIdError] = useState(''); // 아이디 오류 메시지
  // const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능 여부 상태
  // const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    // idCheckHandler(idValue);
  };

  const onChangePasswordHandler = (e) => {
    const { value } = e.target;
    setPassword(value);
    // 비밀번호 검증 로직을 여기에 추가할 수 있습니다.
  };

  const signupHandler = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
  };

  return (
    <div className="login-page-app">
      <header className="main-page-header">
        <img src="./img/logo.png" alt="Header Logo" />{' '}
        {/* <image> 태그 대신 <img> 사용 */}
      </header>

      <main className="login-page-main">
        <Form onSubmit={signupHandler}>
          <div className="login-page-section">
            <div className="login-page-idpw">
              <div className="login-page-id">
                <Form.Control // react-bootstrap의 Form.Control 사용
                  onChange={onChangeIdHandler}
                  type="text"
                  id="id"
                  name="id"
                  value={id}
                  placeholder="아이디를 입력하세요."
                />
              </div>
              <div className="login-page-pw">
                <Form.Control // react-bootstrap의 Form.Control 사용
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호를 입력하세요."
                />
              </div>
            </div>
            <Button type="submit" className="btn btn-login">
              {' '}
              {/* <button> 대신 <Button> 사용 */}
              LOGIN
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
}

export default LoginPage;
