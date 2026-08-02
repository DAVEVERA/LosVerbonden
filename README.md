# Los Verbonden

Mobile-first website voor Los Verbonden in Tilburg: persoonlijke begeleiding tijdens en na een scheiding, met gesprekken, muziek, kleine groepen en laagdrempelige wandelingen.

## Lokaal werken

Vereist Node.js 22.13 of nieuwer.

```bash
npm install
npm run dev
```

## Kwaliteitscontrole

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` bouwt de productieversie en controleert de gerenderde homepage, metadata, primaire contactroutes, mobile-first interactiehaakjes en projectassets.

## Architectuur

- Next.js/React via Vinext voor Cloudflare Workers en OpenAI Sites.
- Eén publieke marketingroute; er worden geen persoonsgegevens opgeslagen.
- Contact loopt rechtstreeks via e-mail of telefoon. Daardoor zijn Supabase, authenticatie en een database bewust niet nodig voor deze versie.
- Icons8 iOS-outlineiconen staan lokaal in `public/icons/icons8`; de verplichte bronvermelding staat in de footer.
- Gegenereerde fotografie en social preview zijn als geoptimaliseerde WebP-assets opgenomen.

## Publicatie

De Sites-configuratie staat in `.openai/hosting.json`. Gebruik de gevalideerde build uit `npm test` als publicatiebron.
