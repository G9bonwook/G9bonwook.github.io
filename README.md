# KOO BONWOOK Portfolio

프레임워크와 외부 라이브러리 없는 GitHub Pages용 정적 사이트입니다. 메인에서 대표 경험을 비교하고, 프로젝트별 상세 페이지에서 선택과 검증 과정을 읽습니다.

## 파일 구조

- `index.html`: 프로필 사진과 소개, 대표 프로젝트 3개 요약, About, 연구와 기타 경험, 원칙, 연락처
- `projects/nudge.html`: AU/Churn 계산 구조 개선과 커머스 KPI 파이프라인
- `projects/arah.html`: RAG chunking 실험, 피드백, weight decay, Airflow 자동화
- `projects/gridam.html`: log-based CDC 선택과 데이터 흐름, 조회 성능 최적화
- `css/style.css`: 공통 디자인 변수, 반응형 레이아웃, 접근성 스타일
- `js/main.js`: 모바일 메뉴, 현재 소제목 표시, 목차 이동, 등장 효과, 연락처 설정
- `portfolio-brief.md`: 콘텐츠 기준과 승인된 사이트 구조
- `assets/images/{nudge,arah,gridam,oracle,common}/`: 프로젝트 이미지와 프로필 사진
- `assets/docs/`: 공개 문서

## 미리보기 및 배포

루트에서 `python3 -m http.server 8000` 실행 후 `http://localhost:8000`을 엽니다.
GitHub Pages에서 사용할 브랜치의 `/ (root)`를 배포 대상으로 지정합니다. 별도 빌드가 없습니다.
파일 이동과 리소스 경로는 상대 경로로 작성되어 저장소 하위 경로에서도 사용할 수 있습니다.

## 콘텐츠와 연락처

화면의 요약은 `index.html`, 상세 설명은 해당 `projects/*.html`에서 수정합니다. 결과나 기간을 변경할 때 요약과 상세 페이지의 일치 여부를 확인합니다.
`js/main.js`의 `contactLinks`에 확인된 GitHub, `mailto:` 이메일, Blog URL을 넣습니다. 빈 값의 링크는 숨겨집니다.
미제공 검증 절차는 보완 예정으로 표시했습니다. 근거가 추가되면 해당 내용을 수정합니다.
기존 `docs/portfolio-brief.md`는 보존했습니다.

## 이미지 교체

메인 프로필 사진은 `assets/images/common/bonwook-profile.png`이며 원본 비율로 작게 표시합니다.
아키텍처/DAG는 상세 페이지의 `figure.visual-placeholder` 안에 있습니다. 파일을 assets 폴더에 넣은 뒤 내부의 `div.image-placeholder`를 다음 형태로 교체합니다.

```html
<img class="project-image" src="../assets/images/nudge/architecture.png" alt="실제 아키텍처 구성과 데이터 흐름에 대한 설명" width="1600" height="900" loading="lazy">
```

경로, alt, width/height는 실제 이미지에 맞게 수정합니다. figure는 그대로 사용할 수 있습니다.

## 목차 유지보수

- 데스크톱(1280px 이상): 고정 목차에서 프로젝트와 현재 페이지의 소제목을 구분합니다.
- 모바일/태블릿: 상단의 프로젝트명, 현재 소제목, 목차 선택 메뉴를 사용합니다. 선택 메뉴에서 다른 프로젝트로 이동할 수도 있습니다.
- 이전·다음 화살표는 현재 페이지의 소제목을 이동합니다. 상세 페이지 하단에는 이전·다음 프로젝트 링크가 별도로 있습니다.
- 각 페이지의 `.toc-list a[data-section]`이 스크롤 추적 대상입니다. `href`를 섹션 ID에 연결하고 `data-label`에 표시할 소제목을 작성합니다. HTML 순서는 본문 순서와 일치해야 합니다.
- `#section-select`에도 같은 앵커를 option으로 추가합니다. 다른 페이지로 이동하는 option에는 상대 파일 경로를 넣습니다.
- `.project-navigation`은 프로젝트 간 이동용입니다. 해당 페이지 링크에 `aria-current="page"`를 지정합니다.
- `data-nav`는 메인 페이지에서 상단 메뉴와 연결합니다. 상세 페이지에서는 상단 Projects 메뉴가 활성화됩니다.
- 직접 앵커 접속과 역방향 스크롤도 지원합니다. JavaScript가 비활성화되어도 본문과 일반 링크 목차를 사용할 수 있습니다.

## 페이지 / CSS / JavaScript 수정 후

배포 전에 `python3 scripts/update-asset-versions.py`를 실행합니다. 파일 내용의 해시를 CSS와 JavaScript URL의 `?v=` 값에 반영합니다. HTML 내용과 자산 버전을 바탕으로 프로젝트 간 이동 링크 및 모바일 선택 메뉴의 페이지 URL에도 버전을 붙여, 이전 HTML이 캐시에 남아 오래된 CSS를 다시 요청하는 문제를 방지합니다. 수정된 HTML도 함께 배포합니다. 별도 패키지 설치는 필요하지 않습니다.
