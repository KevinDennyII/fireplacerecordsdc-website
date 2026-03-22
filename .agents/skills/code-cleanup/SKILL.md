---
name: code-cleanup
description: Execute a thorough code cleanup pass on the project. Use when the user says "execute code clean up", "run code cleanup", "clean up the code", or any similar phrase.
---

# Code Cleanup

When triggered, audit every source file in the project and apply the principles below. Fix issues in place — do not just report them. After cleanup, summarize what changed and why.

---

## 1 — Josh Comeau: CSS & React

### CSS
- **Use custom properties (CSS variables) for all repeated values** — colors, spacing, radii, durations. Never hard-code a value more than once.
- **Fluid typography with `clamp()`** — avoid fixed `px` font sizes; use `clamp(minRem, vw-expression, maxRem)`.
- **Logical properties** — prefer `padding-inline`, `margin-block`, `border-start` over directional shorthands where layout may change with writing mode.
- **No magic numbers** — every unitless constant should be a named variable or have a comment explaining its derivation.
- **Avoid global selector pollution** — scope styles to the component; never add styles that bleed into children you don't own.
- **Respect `prefers-reduced-motion`** — wrap any animation/transition in a `@media (prefers-reduced-motion: no-preference)` guard.
- **Use `gap` not margins** for flex/grid children spacing.
- **Rems for text-related sizing, px for border/shadow hairlines.**

### React
- **Composition over prop drilling** — if a component receives more than 3–4 pass-through props, refactor with `children` or a context.
- **One responsibility per component** — if you can't name it without "and", split it.
- **Custom hooks for stateful logic** — any `useState` + `useEffect` combination that appears twice should become a `use*` hook.
- **Derive, don't synchronize** — never copy props into state; compute values from the source of truth.
- **Stable references** — wrap callbacks in `useCallback` and expensive computations in `useMemo` only when there is a measurable performance reason (not preemptively).
- **Keys must be stable and unique** — never use array index as a key if the list can reorder.
- **Avoid `useEffect` for data transformations** — transform in the render path, not effects.
- **Accessible by default** — every interactive element needs a discernible label; images need meaningful `alt` or `alt=""` for decorative ones.

---

## 2 — Clean Code (Robert C. Martin)

- **Meaningful names** — variables, functions, and files should reveal intent. Rename anything that requires a comment to understand.
- **Small functions** — if a function is longer than ~20 lines, look for natural extraction points.
- **Do one thing** — functions and modules should have a single reason to change.
- **DRY** — if logic appears twice, extract it. If it appears three times, it's a module.
- **No magic literals** — replace bare strings and numbers with named constants.
- **Prefer positive conditionals** — `if (isValid)` over `if (!isInvalid)`.
- **Fail loudly** — don't swallow errors silently; log and/or rethrow with context.
- **Delete dead code** — commented-out blocks, unused imports, unreachable branches — remove them.
- **Consistent abstraction levels** — a function should operate at one level of abstraction; don't mix high-level business logic with low-level DOM manipulation in the same function.
- **No side effects in pure functions** — functions named `get*` or `calculate*` must not mutate state.

---

## 3 — Steve Gibson: Security (Security Now / TWIT TV)

- **Never trust input** — validate and sanitize every value that crosses a trust boundary (HTTP request, URL param, form field, environment variable).
- **No secrets in source** — API keys, tokens, passwords must live in environment variables, never in code or committed config files.
- **Principle of least privilege** — database users, API tokens, and service accounts should have only the permissions they actually need.
- **Parameterized queries only** — never concatenate user input into SQL. Use Drizzle's parameterized query builder; raw template literals with user data are a critical defect.
- **Output encoding against XSS** — React's JSX escapes by default; never use `dangerouslySetInnerHTML` without explicit sanitization.
- **Secure HTTP headers** — ensure the Express server sets `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: same-origin`.
- **Error messages must not leak internals** — API error responses sent to clients must not include stack traces, file paths, or database schema details. Log the full error server-side only.
- **Defense in depth** — don't rely on a single control; layer validation (client → server → database).
- **Dependency hygiene** — flag any package that appears unused or suspiciously broad in scope.
- **HTTPS everywhere** — all external URLs in code must use `https://`; flag any `http://` references.
- **Rate limiting on sensitive endpoints** — mailing list signups, auth endpoints, and any write route should have rate limiting middleware.

---

## Cleanup Execution Process

1. `grep` the codebase for common anti-patterns (magic numbers, `console.log` left in, `http://`, `dangerouslySetInnerHTML`, raw SQL strings, unused imports).
2. Read each modified file in full before editing.
3. Apply all applicable principles from sections 1–3.
4. Run `tsc --noEmit` / typecheck after edits to confirm no type regressions.
5. Restart affected workflows.
6. Report a concise summary: what was found, what was fixed, and any issues that require human decisions (e.g., secrets that need to move to env vars).
