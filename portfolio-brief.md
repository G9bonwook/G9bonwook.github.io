# 구본욱 포트폴리오 브리프

사용자가 제공한 사실과 구현 기준.
공개 연락처: g9bonwook@gmail.com / 010-4096-6039. GitHub 주소는 사용자 요청으로 표시하지 않음.

## Profile
- 구본욱 / 가천대학교 AI·소프트웨어학부
- 관심 분야: Data Engineering, Data Quality, AI Service
- 강점: 업무 맥락을 데이터 기준으로 구체화하고, 검증 가능한 데이터 흐름을 설계
- 핵심 메시지: 데이터를 쌓는 것보다, 믿고 사용할 수 있게 만드는 일을 합니다.

## Nudge Healthcare / Data Engineering Intern
2026.04~2026.07

### AU/Churn 지표 구조 개선
- 기존 BETWEEN 범위 JOIN으로 과거 접속/미래 재방문 계산
- 장기 백필 시 fan-out 문제 확인
- UNIX_DATE + Window Function으로 리팩터링
- 기존 결과 40행 셀 단위 비교, mismatch 0
- 20일 백필 기준 slot_ms 약 14배 감소 / shuffle 약 7.8배 감소
- 단순 속도 개선이 아니라 데이터 규모와 처리 조건에 맞는 구조로 개선

### KPI 과소집계 문제 해결
- 사용자 추가 제공 사실: 인턴 기간 KPI 과소집계 문제 해결 경험
- 대상 지표, 원인, 해결 방식과 검증 수치는 아직 제공되지 않음. 기존 두 Case와의 연관성을 임의로 단정하지 않음.

### Short-form commerce KPI pipeline
- 외부 API + commerce DB 기반 clip exposure → purchase 전환 지표
- raw API 데이터를 GCS에 저장 / BigQuery + dbt mart 구성
- 주문 단위 쿠폰을 상품별 가격 비율로 배분
- 동일 데이터도 산출 기준에 따라 현업 판단이 달라질 수 있음
- 데이터 품질은 값의 정확성뿐 아니라 업무 맥락과 산출 기준까지 포함

## Arah / DK Techin RAG Chatbot
2025.07~2025.08
- 사내 규정/FAQ 기반 RAG 챗봇
- 사내 문서의 제목 중심 구조 분석
- 약 50개 테스트 질문으로 여러 chunking 방식 비교
- 정답 문서 Top-k 포함 여부 기준으로 제목 기반 chunking 적용
- 사용자 평가 + 문제 사유 저장 feedback 구조 설계
- 오래된 feedback weight가 신규 문서를 밀어내는 문제를 줄이기 위해 시간 기반 weight decay 설계
- Airflow 자동화 / DK Techin 우수 팀 선정
- AI 서비스 품질은 지속적으로 관리해야 함

## GriDam
2025.03~2025.06
- LLM 기반 감정 일기 서비스 / 일기 저장과 감정 분석 분리
- MySQL Source of Truth
- Binlog → Debezium → Kafka → Python Consumer → MongoDB
- DB commit과 event publish 시점 불일치 문제를 피하기 위해 log-based CDC 선택
- Schema Registry + Avro 적용 / MySQL, MongoDB, Redis 분리
- 인덱스/캐시 튜닝으로 조회 API 5초 → 1초 (CDC의 성과로 표현하지 않음)
- 데이터 일관성과 운영 구조 고려

## Oracle Bio Data Expert Track
- MIMIC-IV 기반 패혈증 사망 위험 예측 / IT 3명 + Bio 3명
- 혈압, 생체신호 등 도메인 표현을 실제 table/column에 매핑
- systolic / diastolic / mean 구분, 단위 차이 정리
- domain term ↔ table ↔ column ↔ datatype ↔ unit ↔ normal range 코드북
- 모호한 업무 요구를 실제 데이터 기준으로 구체화

## Wireless TCP Research
2023.12~2025.06
- 무선 TCP slow start 연구
- 반복 횟수 위주 실험에서 hypothesis-first 방식으로 변경
- 변수 / 조건 / 예상 결과 / 검증 방법을 먼저 정의
- iperf3 완료 시점과 실제 파일 수신 완료 비교
- configured delay와 observed RTT 검증

## NET Challenge Camp
- 터널 화재 대피 지원 플랫폼
- YOLO 화재 감지 + 센서 연동
- 차량 후미등 false positive 문제에 smoke sensor + detection region 조건 결합
- 은상 / KT 특별상

## Tech
- Data: BigQuery, MySQL, MongoDB, Redis, dbt, Airflow, Kafka, Debezium, GCS
- Infra: AWS, Docker, Kubernetes
- AI/Data: RAG, LLM, Vector Search

## Site structure and design
메인: Hero → 대표 프로젝트 요약(Nudge / Arah / GriDam) → About → Other Experience → Working Principles → Contact.
상세: projects/nudge.html, projects/arah.html, projects/gridam.html.
역할·기간과 핵심 결과를 먼저 제시하고, 문제 → 선택 → 구현 → 검증 → 결과 순서로 상세 설명.
프로젝트별 탐색과 본문 소제목 목차를 구분하며, 스크롤에 따라 현재 소제목 표시.
큰 타이포그래피와 여백, 최소한의 카드, white/light gray, dark text. Blue는 탐색과 링크에 유지. 분야 표시와 검증·성과 영역은 채도를 낮춘 브라운과 연한 샌드 배경 사용.
미세한 애니메이션과 반응형. HTML/CSS/최소 Vanilla JS, GitHub Pages 호환.
경력, 수치, 아키텍처 창작 금지. 이미지는 나중에 추가할 placeholder.
프로젝트 흐름: Problem → Decision → Implementation → Verification → Result.
