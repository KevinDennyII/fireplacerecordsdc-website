# Changelog

All notable changes to this project will be documented in this file.

## 2026-05-06

### Changed
- Refactored the `fireplace-records` frontend into modular section components for cleaner structure and easier maintenance.
- Replaced outdated event lineups with evergreen Instagram-first event update messaging.
- Removed mailing-list references from the website UI and updated calls-to-action to point to Instagram updates.
- Standardized frontend runtime/base URL handling for local and Replit compatibility.
- Improved accessibility and consistency in frontend navigation/components (including route-safe 404 navigation).

### Security
- Hardened API behavior with centralized error handling and explicit JSON 404 responses.
- Added lightweight per-IP rate limiting for mailing list and page-views write endpoints.
- Tightened request normalization/validation for mailing list submissions.
- Improved API middleware defaults (CORS handling, body-size limits, trust proxy in production).

### Tooling
- Fixed `scripts/post-merge.sh` workspace filter to correctly run DB push for `@workspace/db`.
- Added `.pnpm-store/` to `.gitignore`.
- Updated OpenAPI mailing-list constraints and regenerated API client + Zod schema artifacts to keep contracts in sync.
