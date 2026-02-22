# Developer Tooling Dashboard

## Summary

I built a dashboard to centralize CI visibility for a 25+ engineer team.

## Problem

Test failures were spread across multiple tools, and on-call engineers spent too much time finding the right owner.

## Approach

- Aggregated CI status via provider APIs.
- Grouped failures by service and team owner.
- Added trend tracking for flaky suites.

## Stack

- Frontend: React + TypeScript
- Backend: Node.js + PostgreSQL
- Infra: Docker + GitHub Actions

## Outcome

- 38% reduction in median CI triage time over six weeks.
- Faster assignment of failures to accountable teams.
