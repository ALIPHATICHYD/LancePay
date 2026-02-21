# Pull Request: fix(security): Ensure auto-swap upsert is per-user (#178)

## Summary
This PR ensures that auto-swap rules are unique per user and that the upsert operation uses the authenticated user's `userId` as the identifier. This prevents a shared/static identifier from being used, which would allow one user to overwrite another's auto-swap rule.

Branch: `fix/178-autoswap-userid-upsert`

## Problem
Previously, the upsert operation for `autoSwapRule` could omit the `userId` constraint in its `where` clause causing rules to be updated/created in a non-user-scoped manner. That allowed multiple users to end up sharing the same auto-swap configuration.

## Changes
- Verified and enforced that the POST upsert uses `where: { userId: user.id }` and `create: { userId: user.id, ... }` in `app/api/routes-d/auto-swap/rules/route.ts`.
- The code also validates that the `bankAccount` belongs to the authenticated user before saving.

Files changed
- `app/api/routes-d/auto-swap/rules/route.ts` — ensure `upsert` is scoped to the authenticated user's `userId`.

## Security impact
- Severity: Medium — prevents users from accidentally or maliciously overwriting other users' auto-swap settings.
- Fix: Uses the user's `userId` as the unique identifier in the `upsert` operation.

## How to validate locally
1. Checkout the branch:
   ```bash
   git checkout fix/178-autoswap-userid-upsert
   ```
2. Start the app and authenticate as different users.
3. For user A, create or update an auto-swap rule.
4. For user B, create or update an auto-swap rule.
5. Verify both users have their own distinct auto-swap configurations in the DB.

## Notes
- The Prisma schema already enforces `userId` as unique on the `AutoSwapRule` model, so `upsert` with `where: { userId }` is the correct approach.
- No DB migrations are required.

---

If you'd like, I can push this branch to the remote and open a PR on GitHub.