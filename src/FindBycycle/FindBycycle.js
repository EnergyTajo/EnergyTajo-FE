import React, { useEffect } from 'react';
import './FindBycycle.css';
import { latLng, marker } from 'leaflet';

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
            latlng: new window.kakao.maps.LatLng(35.1763, 129.0709),
          },
          {
            title: '가야2동주민센터',
            latlng: new window.kakao.maps.LatLng(35.152, 129.0365),
          },
          {
            title: '개금1배수체육공원',
            latlng: new window.kakao.maps.LatLng(35.1576, 129.0205),
          },
          {
            title: '헬트피트니스',
            latlng: new window.kakao.maps.LatLng(35.1631, 129.0559),
          },
        ];

        const imageSrc = './img/map_marker.png'; // 마커 이미지 주소

        for (let i = 0; i < positions.length; i += 1) {
          // '++'를 사용하지 않고 '+= 1'로 변경
          // 마커 이미지의 이미지 크기
          const imageSize = new window.kakao.maps.Size(40, 50);
          // 마커 이미지 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
          );
          // 마커 생성
          const mapMarker = new window.kakao.maps.Marker({
            // 'marker'를 'mapMarker'로 변경
            map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커 표시 위치
            title: positions[i].title, // 마커 타이틀 -> 마커에 마우스를 올리면 이름 뜸
            image: markerImage, // 마커 이미지
          });
        }

        // 마지막 마커가 지도 위에 표시되도록 설정합니다
        // mapMarker.setMap(map); // 이 줄은 불필요합니다. 루프 내에서 각 마커를 추가합니다.
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
