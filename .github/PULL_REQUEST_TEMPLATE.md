## Remediation Pull Request Checklist

### Objective
- [ ] This PR has one clear remediation objective stated in 1-2 sentences.

### Scope
- [ ] This PR is intentionally narrow and single-purpose.
- [ ] Affected files are limited to what is required to complete the objective.
- [ ] Scope boundaries are documented below.

Scope boundaries:

### Exclusions
- [ ] No unrelated refactors are included.
- [ ] No opportunistic cleanup or feature expansion is included.
- [ ] Any intentionally deferred work is listed below.

Deferred work (if any):

### Testing Evidence
- [ ] Acceptance checks are listed and reproducible.
- [ ] Evidence for each check is provided (commands, screenshots, or logs).

Acceptance checks and evidence:

### Rollback Notes
- [ ] A rollback trigger is defined.
- [ ] A rollback approach is documented and limited to this PR's changes.

Rollback plan:

### Security/Performance Impact
- [ ] Security impact has been assessed and documented.
- [ ] Performance impact has been assessed and documented.

Impact notes:

### Reviewer Gate
- [ ] I confirm this PR should be rejected if scope is broad or unrelated refactors are detected.
