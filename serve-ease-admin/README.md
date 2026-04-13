
# ServEase Admin

ServEase admin portal aligned to the shared FE multi-app template.

## Stack

- Next.js app router
- TypeScript
- Tailwind CSS
- Jest

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Notes

- Routing is handled through the Next app router entrypoints in `src/app`.
- A small compatibility layer in `src/lib/react-router-compat.tsx` keeps the existing admin pages working while the legacy routing assumptions are phased out.
- Build-time lint and type blocking are temporarily relaxed in `next.config.ts` because some legacy admin screens still use data shapes that do not fully match the typed store yet.
