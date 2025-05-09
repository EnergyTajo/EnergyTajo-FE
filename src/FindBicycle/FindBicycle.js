import React, { useEffect } from 'react';
import './FindBicycle.css';

function FindBycycle() {
  useEffect(() => {
    // 카카오맵 API 스크립트 동적으로 추가
    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a7df89b50bf8fee55e6fbf4b72c5faae&libraries=services';
    script.async = true;
    script.onload = () => {
      // API 로드가 완료된 후 실행되는 콜백
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 컨테이너
        const options = {
          center: new window.kakao.maps.LatLng(35.152, 129.0365), // 지도의 중심 좌표 : 가야 2동 주민센터
          level: 7, // 지도의 확대 레벨 (숫자가 작을수록 확대됨)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도를 생성

        // 지도에 마커 추가
        const positions = [
          {
            title: '감고개공원',
            latlng: new window.kakao.maps.LatLng(35.149278, 129.03305),
          },
          {
            title: '가야2동주민센터',
            latlng: new window.kakao.maps.LatLng(35.149244, 129.031735),
          },
          {
            title: '개금1배수체육공원',
            latlng: new window.kakao.maps.LatLng(35.148804, 129.022516),
          },
          {
            title: '헬튼피트니스',
            latlng: new window.kakao.maps.LatLng(35.150238, 129.033732),
          },
        ];

        const imageSrc = './img/map_marker.png'; // 마커 이미지 주소

        // forEach를 사용하여 배열을 순회
        positions.forEach((position) => {
          // 마커 이미지의 이미지 크기
          const imageSize = new window.kakao.maps.Size(40, 50);
          // 마커 이미지 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
          );

          // 마커 생성 및 변수에 할당
          const marker = new window.kakao.maps.Marker({
            map, // 마커를 표시할 지도
            position: position.latlng, // 마커 표시 위치
            title: position.title, // 마커 타이틀 -> 마커에 마우스를 올리면 이름 뜸
            image: markerImage, // 마커 이미지
          });

          // 마커를 지도에 추가 (Optional: 추가 설정 필요 시 여기서 처리)
          marker.setMap(map);
        });
      });
    };

    // 문서의 head에 스크립트 추가
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="findbycycle-page-app">
      <div id="map" style={{ width: '100%', height: '93vh' }} />
    </div>
  );
}

export default FindBycycle;
