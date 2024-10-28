import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // react-bootstrap에서 Form과 Button 가져오기
import './JoinPage.css';

function JoinPage() {
  const [userId, setUserId] = useState(''); // 아이디 설정
  const [password, setPassword] = useState(''); // 비밀번호 설정
  const [confirm, setConfirm] = useState(''); // 비밀번호 확인 설정
  const [userName, setUserName] = useState(''); // 이름 설정
  const [phone2, setPhone2] = useState(''); // 전화번호 두 번째 부분
  const [phone3, setPhone3] = useState(''); // 전화번호 세 번째 부분
  const [email, setEmail] = useState(''); // 이메일 설정

  const [idError, setIdError] = useState(''); // 아이디 오류 메시지
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지
  const [confirmError, setConfirmError] = useState(''); // 비밀번호 확인 오류 메시지

  const selectNum = ['010', '011', '016', '018', '019'];
  const [selectedPhone, setSelectedPhone] = useState(selectNum[0]); // 기본 선택된 전화번호

  const selectMail = ['@gmail.com', '@naver.com', '@nate.com', '@daum.com'];
  const [selectedMail, setSelectedMail] = useState(selectMail[0]); // 기본 선택된 이메일

  const [successNum, setSuccessNum] = useState(''); // 인증번호 설정
  const [phoneError, setPhoneError] = useState(''); // 전화번호 오류 메시지

  const data = [
    {
      id: 0,
      title: '서비스 이용약관 관련 전체동의',
      status: '(필수)',
    },
    {
      id: 1,
      title: '개인정보 수집 및 이용 동의',
      status: '(필수)',
    },
    {
      id: 2,
      title: '위치정보 수집 및 이용 동의',
      status: '(필수)',
    },
    {
      id: 3,
      title: '광고성 정보 수신 동의',
      status: '(선택)',
    },
  ];

  const [checkItems, setCheckItems] = useState([]); // 체크박스 상태

  // 체크박스 개별 선택하기
  const selectChecked = (checked, id) => {
    if (checked) {
      setCheckItems((item) => [...item, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택하기
  const allChecked = (checked) => {
    if (checked) {
      const itemList = data.map((el) => el.id);
      setCheckItems(itemList);
    } else {
      setCheckItems([]);
    }
  };

  const handleSelectPhone = (e) => {
    setSelectedPhone(e.target.value);
  };

  const handleSelectEmail = (e) => {
    setSelectedMail(e.target.value);
  };

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setUserId(idValue);
    // 여기에서 ID 체크 로직 구현 필요
    if (idValue.length < 4) {
      setIdError('아이디는 4자 이상이어야 합니다.');
    } else {
      setIdError('');
    }
  };

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setConfirm(value);
      if (value !== password) {
        setConfirmError('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmError('');
      }
    }
  };

  const signupHandler = (e) => {
    e.preventDefault();
    // 가입 로직 구현 (여기에서 서버에 데이터 전송 등)
    console.log('가입 정보:', {
      userId,
      password,
      userName,
      phone: `${selectedPhone}-${phone2}-${phone3}`,
      email: email + selectedMail,
      successNum,
      checkItems,
    });
  };

  return (
    <div className="join-page-app">
      <header className="join-page-header">
        <img src="./img/logo.png" alt="Header Logo" />
      </header>

      <main className="join-page-main">
        <Form onSubmit={signupHandler}>
          <div className="join-page-section">
            <div className="join-page-idpw">
              <div className="join-page-id">
                <label htmlFor="id">아이디</label>
                <Form.Control
                  onChange={onChangeIdHandler}
                  type="text"
                  id="id"
                  name="id"
                  value={userId}
                  placeholder="아이디 입력"
                />
                <button type="button" className="btn btn-id-check">
                  중복체크
                </button>
                {idError && <small className="text-danger">{idError}</small>}{' '}
                {/* 오류 메시지 표시 */}
              </div>
              <div className="join-page-pw">
                <label htmlFor="password">비밀번호</label>
                <Form.Control
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호 입력"
                />
                {passwordError && (
                  <small className="text-danger">{passwordError}</small>
                )}{' '}
                {/* 오류 메시지 표시 */}
              </div>
              <div className="join-page-pwcheck">
                <label htmlFor="confirm">비밀번호 재확인</label>
                <Form.Control
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="confirm"
                  name="confirm"
                  value={confirm}
                  placeholder="비밀번호 재입력"
                />
                {confirmError && (
                  <small className="text-danger">{confirmError}</small>
                )}{' '}
                {/* 오류 메시지 표시 */}
              </div>
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
                <select onChange={handleSelectPhone} value={selectedPhone}>
                  {selectNum.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <Form.Control
                  type="text"
                  id="phone2"
                  name="phone2"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  maxLength={4}
                  placeholder="전화번호 2"
                />
                <Form.Control
                  type="text"
                  id="phone3"
                  name="phone3"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  maxLength={4}
                  placeholder="전화번호 3"
                />
                <Button type="button" className="btn btn-phone-check">
                  인증번호 보내기
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
                <Button type="button" className="btn btn-success-check">
                  인증하기
                </Button>
                {phoneError && (
                  <small className="text-danger">{phoneError}</small>
                )}{' '}
                {/* 오류 메시지 표시 */}
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
            <div>
              <Button type="submit">가입하기</Button>
            </div>
          </div>
        </Form>
      </main>
    </div>
  );
}

export default JoinPage; // JoinPage로 이름 수정
