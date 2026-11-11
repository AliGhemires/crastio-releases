# Security policy

Thank you for helping keep Crastio and its users safe.

## Reporting a vulnerability

Report it **privately** through GitHub:
[github.com/AliGhemires/crastio-releases/security/advisories/new](https://github.com/AliGhemires/crastio-releases/security/advisories/new)
(you need a GitHub account; only the maintainer sees the report). Include:
- what you found and where (app version, operating system, the feature or endpoint);
- steps to reproduce, and what an attacker could do with it;
- your name or handle if you'd like to be credited.

Please don't open a public issue, post details publicly, or access other people's data while
testing. Use your own accounts. We'll acknowledge your report within **3 working days**, keep you
informed, and tell you when it's fixed. We don't take legal action against good-faith research that
follows this policy.

## Supported versions

Only the latest release receives security fixes. Crastio updates itself (signed updates); keep
automatic updates on.

## Scope

In scope: the Crastio desktop app, its cloud services (sync, collaboration, Watchers, the MCP
server) and the website. Out of scope: denial-of-service, spam, social engineering, physical access
to an unlocked computer, and vulnerabilities in third-party services we use (report those to the
provider; tell us if it affects Crastio).

## How Crastio is protected (summary)

Access rules enforced by the database for every request, server-side permission checks for shared
projects, encrypted storage of connected-account credentials, a strict Content Security Policy in
the app, signed updates, dependency and secret scanning on every change. No system is perfectly
secure; confirmed issues are fixed by severity.
