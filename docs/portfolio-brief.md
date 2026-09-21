[PROFILE]
- 이름: 구본욱
- 가천대학교 AI·소프트웨어학부
- 관심 분야: Data Engineering, Data Quality, AI Service
- 강점: 업무 맥락을 데이터 기준으로 구체화하고, 검증 가능한 데이터 흐름을 설계하는 것

[CORE MESSAGE]
데이터를 쌓는 것보다, 믿고 사용할 수 있게 만드는 일을 합니다.

[EXPERIENCE 1 — Nudge Healthcare / Data Engineering Intern]
기간: 2026.04~2026.07

핵심 경험 A. AU/Churn 지표 구조 개선
- 기존 BETWEEN 범위 JOIN으로 과거 접속/미래 재방문 계산
- 장기 백필 시 fan-out 문제 확인
- UNIX_DATE + Window Function으로 리팩터링
- 기존 결과 40행 셀 단위 비교, mismatch 0
- 20일 백필 기준 slot_ms 약 14배 감소
- shuffle 약 7.8배 감소
- 핵심 메시지: 단순 속도 개선이 아니라 데이터 규모와 처리 조건에 맞는 구조로 개선

핵심 경험 B. Short-form commerce KPI pipeline
- 외부 API + commerce DB 기반
- clip exposure → purchase 전환 지표
- raw API 데이터를 GCS에 저장
- BigQuery / dbt 기반 mart 구성
- 주문 단위 쿠폰을 상품별 가격 비율로 배분
- 동일 데이터도 산출 기준에 따라 현업 판단이 달라질 수 있음을 경험
- 데이터 품질은 값의 정확성뿐 아니라 업무 맥락과 산출 기준까지 포함한다고 생각

[EXPERIENCE 2 — Arah / DK Techin RAG Chatbot]
기간: 2025.07~2025.08

- 사내 규정/FAQ 기반 RAG 챗봇
- 사내 문서가 제목 중심 구조임을 분석
- 약 50개 테스트 질문으로 여러 chunking 방식 비교
- 정답 문서 Top-k 포함 여부를 기준으로 제목 기반 chunking 적용
- 사용자 평가 + 문제 사유 저장하는 feedback 구조 설계
- 오래된 feedback weight가 신규 문서를 밀어내는 문제를 줄이기 위해
  시간 기반 weight decay 설계
- Airflow로 자동화
- DK Techin 우수 팀 선정
- 핵심 메시지: AI 서비스 품질은 한 번 튜닝하는 것이 아니라 지속적으로 관리해야 함

[EXPERIENCE 3 — GriDam]
기간: 2025.03~2025.06

- LLM 기반 감정 일기 서비스
- 일기 저장과 감정 분석 분리
- MySQL을 Source of Truth로 설정
- Binlog → Debezium → Kafka → Python Consumer → MongoDB
- DB commit과 event publish 시점 불일치 문제를 피하기 위해 log-based CDC 선택
- Schema Registry + Avro 적용
- MySQL / MongoDB / Redis 분리
- 인덱스/캐시 튜닝으로 조회 API 5초 → 1초
- 핵심 메시지: 단순 비동기 처리보다 데이터 일관성과 운영 구조를 고려

[EXPERIENCE 4 — Oracle Bio Data Expert Track]
- MIMIC-IV 기반 패혈증 사망 위험 예측
- IT 3명 + Bio 3명 협업
- '혈압', '생체신호' 같은 도메인 표현을 실제 table/column으로 매핑
- systolic / diastolic / mean 등 유사 변수 구분
- 단위 차이 정리
- 도메인 용어 ↔ table ↔ column ↔ datatype ↔ unit ↔ normal range 코드북 제작
- 핵심 메시지: 모호한 업무 요구를 실제 데이터 기준으로 구체화

[EXPERIENCE 5 — Wireless TCP Research]
기간: 2023.12~2025.06

- 무선 TCP slow start 연구
- 초기에 반복 횟수 위주 실험
- 이후 hypothesis-first 방식으로 변경
- 변수 / 조건 / 예상 결과 / 검증 방법을 먼저 정의
- iperf3 완료 시점 vs 실제 파일 수신 완료 비교
- 설정 delay vs observed RTT 검증
- 핵심 메시지: 실험도 반복보다 가설과 검증이 중요

[EXPERIENCE 6 — NET Challenge Camp]
- 터널 화재 대피 지원 플랫폼
- YOLO 화재 감지 + 센서 연동
- 차량 후미등 false positive 문제
- smoke sensor + detection region 조건 결합
- 은상 + KT 특별상

[TECH]
Data:
- BigQuery
- MySQL
- MongoDB
- Redis
- dbt
- Airflow
- Kafka
- Debezium
- GCS

Infra:
- AWS
- Docker
- Kubernetes

AI/Data:
- RAG
- LLM
- Vector Search

[SITE STRUCTURE]
1. Hero
2. About
3. Experience — Nudge Healthcare
4. Project — Arah
5. Project — GriDam
6. Other Experience
7. Working Principle
8. Contact

[DESIGN]
- Toss-like spacing and typography
- Large section headline
- Minimal cards
- White / light gray background
- Dark text
- One calm blue accent color
- subtle animation only
- mobile responsive

[IMPORTANT]
- Do not invent metrics.
- Do not invent architecture.
- Architecture/DAG images will be inserted later.
- Use placeholders for them.
- Each project should follow:
  Problem → Decision → Implementation → Verification → Result