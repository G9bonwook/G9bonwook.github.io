# KOO BONWOOK Portfolio

프레임워크와 외부 라이브러리 없는 GitHub Pages용 정적 사이트입니다.

- `index.html`: 소개, 경력, 프로젝트, 연구, 원칙, 연락처 및 SEO 메타데이터
- `css/style.css`: 디자인 변수, 반응형 레이아웃, 포커스와 모션 설정
- `js/main.js`: 모바일 메뉴, 스크롤 상태, 섹션 표시, 등장 효과, 연락처 설정
- `portfolio-brief.md`: 사용자가 제공한 콘텐츠 기준
- `assets/images/{nudge,arah,gridam,oracle,common}/`: 프로젝트 이미지
- `assets/docs/`: 공개 문서

## 미리보기 및 배포

루트에서 `python3 -m http.server 8000` 실행 후 `http://localhost:8000`을 엽니다.
GitHub Pages에서 사용할 브랜치의 `/ (root)`를 배포 대상으로 지정합니다. 별도 빌드가 없습니다.

## 수정

`js/main.js`의 `contactLinks`에 확인된 GitHub, `mailto:` 이메일, Blog URL을 넣습니다. 빈 값의 링크는 숨겨집니다.

이미지 파일을 해당 assets 폴더에 넣은 뒤, `figure.visual-placeholder` 내부의 `div.image-placeholder`를 다음 형태로 교체합니다. 경로와 alt는 실제 이미지에 맞게 수정합니다.

```html
<img class="project-image" src="assets/images/nudge/architecture.png" alt="실제 아키텍처 구성과 데이터 흐름에 대한 설명" width="1600" height="900" loading="lazy">
```

각 이미지의 실제 크기로 width/height를 지정합니다. placeholder의 figure는 그대로 사용할 수 있습니다.
미제공 검증 절차는 화면에 보완 예정으로 표시했습니다. 브리프에 근거가 추가되면 본문을 수정합니다.
기존 빈 `docs/portfolio-brief.md`는 보존했고, 기준 문서는 루트의 `portfolio-brief.md`입니다.
