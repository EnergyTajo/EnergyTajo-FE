import React from 'react';
import './ConnectCard.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

function ConnectCard() {
  const navigate = useNavigate(); 

  return (
    <div className="card-check-app">
      <div className="header-question">
        <h2>잠깐, 혹시 동백전이 없나요?</h2>
      </div>
      <motion.div
        className="card-motion"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FontAwesomeIcon icon={faCreditCard} className="fa-card-icon" />
      </motion.div>
      <div className="cardcheck-button">
        <button
          type="button"
          className="connectcard-button"
          onClick={() => navigate('/ConnectCard')}
        >
          있어요! 계좌 연결하기
        </button>
        <button
          type="button"
          className="makecard-button"
          onClick={() => {
            window.location.href =
              'https://busandong100.kr/userGuide/cardreqinfo';
          }}
        >
          없어요! 동백전 만들기
        </button>
      </div>
    </div>
  );
}

export default ConnectCard;
