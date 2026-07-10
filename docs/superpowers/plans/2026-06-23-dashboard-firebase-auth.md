# Dashboard Firebase Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace dashboard Basic Auth with a built-in Firebase email/password sign-in screen that shows the manager UI only for signed-in users.

**Architecture:** Keep all dashboard data editing client-side. Extend the existing Firebase client with Auth, remove the Basic Auth proxy gate, and add one client-side auth gate component that handles loading, sign-in, and sign-out around the existing dashboard UI.

**Tech Stack:** Next.js App Router, React 19, Firebase Auth, Firebase Firestore, Node test runner, TypeScript

---

### Task 1: Lock the auth change with a failing regression

**Files:**
- Modify: `tests/responsive-ui.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("dashboard uses firebase auth instead of basic auth", async () => {
  const firebaseClient = await read("../src/lib/firebase-client.ts");
  const proxy = await read("../src/proxy.ts");
  const dashboardAccess = await read("../src/app/dashboard/DashboardAccess.tsx");

  assert.match(firebaseClient, /getAuth/);
  assert.match(firebaseClient, /auth =/);
  assert.match(dashboardAccess, /onAuthStateChanged/);
  assert.match(dashboardAccess, /signInWithEmailAndPassword/);
  assert.match(dashboardAccess, /signOut/);
  assert.doesNotMatch(proxy, /DASHBOARD_BASIC_AUTH/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: FAIL because the repo still uses Basic Auth in `src/proxy.ts` and has no dashboard auth gate component yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export const auth = firebaseApp ? getAuth(firebaseApp) : null
```

```tsx
const unsubscribe = onAuthStateChanged(auth, (nextUser) => setUser(nextUser))
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/responsive-ui.test.mjs src/lib/firebase-client.ts src/proxy.ts src/app/dashboard/DashboardAccess.tsx
git commit -m "test(dashboard): lock firebase auth access flow"
```

### Task 2: Add the dashboard auth gate and sign-in form

**Files:**
- Create: `src/app/dashboard/DashboardAccess.tsx`
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Write the failing test**

```js
assert.match(dashboardAccess, /Email address/);
assert.match(dashboardAccess, /Password/);
assert.match(dashboardAccess, /Sign in to dashboard/);
assert.match(dashboardAccess, /Signed in as/);
assert.match(dashboardAccess, /Sign out/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: FAIL because the sign-in screen and signed-in shell do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
if (!user) {
  return (
    <form onSubmit={handleSignIn}>
      <input type="email" />
      <input type="password" />
    </form>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/DashboardAccess.tsx src/app/dashboard/page.tsx tests/responsive-ui.test.mjs
git commit -m "feat(dashboard): add firebase sign-in gate"
```

### Task 3: Connect sign-out to the existing manager UI

**Files:**
- Modify: `src/app/dashboard/DashboardClient.tsx`

- [ ] **Step 1: Write the failing test**

```js
const dashboard = await read("../src/app/dashboard/DashboardClient.tsx");
assert.match(dashboard, /onSignOut/);
assert.match(dashboard, /Sign out/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: FAIL because the manager UI does not yet accept a sign-out action.

- [ ] **Step 3: Write minimal implementation**

```tsx
export default function DashboardClient({ onSignOut, ...props }) { ... }
```

```tsx
<button type="button" onClick={onSignOut}>Sign out</button>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/DashboardClient.tsx tests/responsive-ui.test.mjs
git commit -m "feat(dashboard): add sign-out control"
```

### Task 4: Final verification

**Files:**
- No code changes required unless verification fails

- [ ] **Step 1: Run targeted regression**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with no errors

- [ ] **Step 3: Run typecheck**

Run: `npx tsc --noEmit`
Expected: PASS with no errors
