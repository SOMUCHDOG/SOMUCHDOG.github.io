# Realtime Notes App

## Summary

A side project to explore collaborative editing and data synchronization patterns.

## Goals

- Keep editing latency under 100ms in normal network conditions.
- Support offline edits with conflict resolution on reconnect.

## Implementation

- CRDT-based document model.
- WebSocket channel for presence and updates.
- Local persistence for offline-first behavior.

## Lessons Learned

- Operational transforms are not always necessary for small docs.
- Presence features significantly improve collaboration UX.
- Sync edge cases require robust integration tests.
