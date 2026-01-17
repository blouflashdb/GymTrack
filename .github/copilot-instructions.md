# GymTrack Copilot Instructions

## Project Overview

- **Framework**: Nuxt 4 (Source in `app/`).
- **Language**: TypeScript (`.ts`, `.vue`).
- **UI Architecture**: Client-side only (Local First) using `@vueuse/nuxt` `useLocalStorage`.
- **UI Library**: `@nuxt/ui` (v3+), Tailwind CSS, Iconify.
- **Styling**: Tailwind utility classes, CSS variables in `app/assets/css/main.css`.

## Architecture & State Management

- **Data Model**: Records (Hash Maps) are preferred over Arrays for collections (Trainings, Exercises, Sets) to simplify ID-based updates.
  - Pattern: `Record<string, Entity>` where string is `UUID`.
- **Store**: `composables/useTrainings.ts` serves as the primary data store.
  - Uses `useLocalStorage` for persistence.
  - Exposes reactive `trainings` object and crud methods (`add`, `update`, `delete`).
- **IDs**: Use `crypto.randomUUID()` for generating unique IDs for all entities.
- **Project Structure**:
  - `app/` is the root for source code.
  - `components/`: Pure UI components.
  - `composables/`: Business logic and state.
  - `types/`: Shared TypeScript interfaces (`Training`, `Exercise`, `Set`).

## Development Patterns

### Components

- Use `<script setup lang="ts">`.
- Use `defineModel` for two-way binding.
- Leverage Nuxt UI components (`UButton`, `UCard`, `UForm`, `UFormField`).
- Use `i-heroicons-*` for icons (e.g., `icon="i-heroicons-plus"`).

### Forms & Validation

- Wrap forms in `<UForm>`.
- Use `UFormField` for inputs with labels.
- Date handling: Use `@internationalized/date` (e.g., `today(getLocalTimeZone())`).

### Type Definitions

- Import types from `~/types`: `import type { Training } from '~/types'`.
- Ensure strict typing for `Record` keys and values.

## Coding Conventions

- **Linting**: Follow `@antfu/eslint-config`. Run `npm run lint:fix` to format.
- **Reactivity**: Use `ref`, `computed`, and `reactive` natively (auto-imported by Nuxt).

## Key Files to Reference

- `app/types/index.ts`: Core data schemas.
- `app/composables/useTrainings.ts`: Data persistence and logic.
- `app/components/TrainingForm.vue`: Example of form handling, `defineModel`, and Nuxt UI usage.
- `nuxt.config.ts`: Module configuration and app settings.
