# Project Rules - Moon Project (Frontend - user_nextjs)

## 1. Architecture Patterns
- **Layered Architecture**: Follow the pattern: `Page (Route)` -> `Component` -> `Service`.
- **Components**: 
    - `components/[feature]`: Feature-specific components.
    - `components/ui`: Shared/reusable UI library (shadcn/ui-inspired).
- **Services**: Contain API communication logic and data transformation. Stateless and reusable.
- **Store/Hooks**: Use for global state management and complex data fetching (e.g., Auth, Cart).

## 2. Naming Conventions
- **Directories**:
    - `app/[resource]`: Next.js App Router segments.
    - `components/[resource]`: Feature-specific components.
    - `services`: API service classes/functions.
    - `types`: TypeScript interface definitions.
- **Files**:
    - Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`).
    - Services: `[resource].service.ts` (e.g., `product.service.ts`).
    - Types: `[resource].ts` (e.g., `product.ts`).

## 3. Frontend Development Rules

### 3.1 Services
- **API Interaction**: Use `lib/axios.ts` for all API calls. Do not use `fetch` directly.
- **Business Logic**: Keep logic out of components. Services should handle request formatting and response handling.
- **Consistency**: Align with `api_php` endpoints (e.g., `detail`, `update`, `delete`).

### 3.2 Components & UI
- **Styling**: Prefer TailwindCSS for consistency and speed.
- **Reusability**: Build modular, stateless components. Use `children` for composition.
- **Internationalization**: Use `lib/i18n.ts` (if available) or standard i18n patterns for text translation. All user-facing strings MUST be translated.

### 3.3 State Management
- **Auth**: Use `store/` or context providers for managing the authentication state.
- **Data Fetching**: Prefer React Query or similar patterns for server-state synchronization (if implemented), or custom hooks using `useEffect`/`useMemo` for simple cases.

### 3.4 Types
- **Strict Typing**: All API responses and form data MUST have corresponding TypeScript interfaces in `types/`. Avoid `any`.

## 4. API Communication
- **Standardized Endpoints**: Match the backend standard (`/api/user/...`).
- **Error Handling**: Use consistent toast notifications for errors. Centralize error handling in `lib/axios.ts`.

## 5. Coding Style
- **Clean Code**: Keep functions and components short and focused on a single responsibility.
- **Comments**: Use TSDoc/JSDoc for public functions and complex logic.
- **Language**: Default to English, but support the i18n system for all UI text.
