# TaskCreate

## 정의

구조화된 태스크 리스트 항목을 생성하여 진행 상황 추적, 복잡한 태스크 정리, 사용자에게 작업 진행 상황 표시에 사용합니다.

## 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `subject` | string | 예 | 짧은 태스크 제목, 명령형 사용 (예: "Fix authentication bug") |
| `description` | string | 예 | 상세 설명, 컨텍스트와 수락 기준 포함 |
| `activeForm` | string | 아니오 | 진행 중 표시할 현재 진행형 텍스트 (예: "Fixing authentication bug") |
| `metadata` | object | 아니오 | 태스크에 첨부할 임의의 메타데이터 |

## 사용 시나리오

**적합한 경우:**
- 복잡한 다단계 태스크 (3단계 이상)
- 사용자가 여러 할 일 항목을 제공한 경우
- 계획 모드에서 작업 추적
- 사용자가 명시적으로 todo 리스트 사용을 요청

**적합하지 않은 경우:**
- 단일 간단한 태스크
- 3단계 이내의 간단한 작업
- 순수 대화 또는 정보 조회

## 주의사항

- 모든 새 태스크의 초기 상태는 `pending`
- `subject`는 명령형 ("Run tests"), `activeForm`은 현재 진행형 ("Running tests") 사용
- 생성 후 TaskUpdate로 의존 관계 (blocks/blockedBy) 설정 가능
- 생성 전 TaskList를 호출하여 중복 태스크가 없는지 확인해야 함

## cc-viewer에서의 의의

TaskCreate는 Claude Code 내부의 태스크 관리 작업이며, 독립적인 API 요청을 생성하지 않습니다. 다만 Chat Mode에서 모델이 이 도구를 호출한 tool_use block을 확인할 수 있습니다.
