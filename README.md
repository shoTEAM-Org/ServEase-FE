# ServEase FE Multi Repo

Frontend monorepo for the ServEase customer and admin applications, aligned to the shared FE multi-app template structure.

## Apps
- `serve-ease` - provider-facing frontend
- `serve-ease-admin` - admin portal frontend

## Includes
- `.github/workflows/fe-pipeline-caller.yml`
- Per-app Next.js config, ESLint, Jest, Docker, TypeScript, and app-router structure
- Root `sonar-project.properties` for multi-app scanning
- Shared performance tests under `tests/performance`

## Required Repository Variable

`FE_MULTI_SYSTEMS_JSON`

Example:

```json
[
  {
    "name": "ServEase Provider",
    "dir": "serve-ease",
    "image": "serve-ease",
    "vercel_project_secret": "VERCEL_PROJECT_ID_SERVE_EASE"
  },
  {
    "name": "ServEase Admin",
    "dir": "serve-ease-admin",
    "image": "serve-ease-admin",
    "vercel_project_secret": "VERCEL_PROJECT_ID_SERVE_EASE_ADMIN"
  }
]
```

## Required Repository Secrets
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- Vercel project ID secrets referenced in `FE_MULTI_SYSTEMS_JSON`
- `SONAR_TOKEN`
- `SONAR_ORGANIZATION`
- `SONAR_PROJECT_KEY`
- `GH_PR_TOKEN`

## Local Check

Run per app:

```bash
cd serve-ease && npm install && npm run lint && npm run test && npm run build
cd serve-ease-admin && npm install && npm run lint && npm run test && npm run build
```
