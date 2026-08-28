# Runnable Core Path Design

## Goal

Restore a truthful, completable beginner learning path: every runnable lesson's maintained answer must pass its own tests, while the twelve browser-incompatible lab lessons remain visible without blocking the graduation projects.

## Scope

This change covers two release-blocking areas only:

1. Correct the ten runnable lessons whose maintained answers currently fail their public tests.
2. Treat chapters 24–27 as optional labs that are visible in the course map but excluded from the required learning path until their runtimes are implemented safely.

It does not redesign the output-only judge, rewrite hints, add animations, or restructure the broader curriculum. Those remain follow-up work.

## Curriculum Classification

Chapters 24–27 will carry explicit curriculum metadata:

- `optional: true`
- `availability: 'in-development'`

All other chapters, including the final projects chapter, remain required. Runtime detection continues to prevent unsafe or unavailable Python from executing. Optional status is curriculum policy; runtime mode is execution capability. The two concerns remain separate.

## Main-Path Behaviour

- Required chapters unlock from the previous required chapter, skipping optional chapters in between.
- After the final required lesson in chapter 23, the next destination is the first graduation project in chapter 9.
- Finishing the final graduation project opens the graduation screen.
- Chapters 24–27 become visible optional labs after chapter 23 is complete. Opening them shows the existing unavailable-lab feedback; they cannot be falsely completed.
- The dashboard's “continue learning” action searches required lessons first and never gets stuck on an unavailable optional lab.
- Graduation progress, required lesson totals, and the “all done” badge count required lessons only.
- The course map continues to show all 104 lessons. Optional chapters display a clear “Optional lab · In development” label and keep their own 0/3 progress.

Existing save data remains valid because chapter IDs, lesson IDs, and stored completion records do not change.

## Navigation Boundary

Curriculum path calculations will live in `src/utils/curriculumNavigation.js`, rather than duplicating index arithmetic in React components. The module will expose helpers for:

- required chapter and lesson inventory;
- previous required chapter lookup;
- chapter unlock checks based on supplied progress/completion state;
- next required destination;
- required-only graduation progress.

`CourseMap`, `Dashboard`, `Lesson`, `Graduation`, and lesson-completion statistics will consume these helpers.

## Broken Lesson Corrections

The maintained answer remains the source of truth. Public expected output will be corrected to match real Python behaviour where the lesson answer is pedagogically correct:

- do not expect stdin to echo automatically;
- compare file output without an extra `print()` newline mismatch;
- print deterministic sorted collection output instead of raw set representation;
- preserve Python float and string representations;
- preserve tuple representation returned by SQLite.

For collection lessons, the maintained answer will be adjusted when deterministic output is necessary for reliable judging. Tests must never depend on hash/set iteration order.

## Automated Protection

Tests will be added before implementation and must initially fail for the current behaviour.

1. Curriculum contract tests assert chapters 24–27 are optional/in-development and every required lesson is runnable.
2. Navigation tests assert required progression skips optional chapters and graduation totals exclude them.
3. Source contracts assert the dashboard, course map, lesson guard, and graduation screen use the central path helpers.
4. A Pyodide-backed audit runs every runnable maintained answer against its public test cases and fails if any answer is rejected.
5. Existing unit, curriculum validation, build, security, and targeted UI checks must remain green.

## Completion Criteria

- All 92 required/runnable lessons' maintained answers pass their tests.
- The 12 optional lab lessons remain visible but do not affect required progress or graduation.
- A fresh player can progress from chapter 23 to the final projects and then graduate.
- Existing save IDs and review records remain compatible.
- No fake execution or simulated Python output is introduced.
