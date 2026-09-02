# Bootcamp Landing — Angular

Landing page para promocionar el bootcamp de Java & Spring Cloud (modelo "pagas cuando consigas trabajo").
Mismo sistema visual que el PPT y los afiches: fondo navy `#0B0F14`, acento mint `#3ED9A0`,
ámbar `#F2A93B` para el momento del pago, y el motivo de bracket `{ }` como firma.

## Requisitos
- Node.js 18+ y npm

## Cómo correrlo en local

```bash
npm install
npm start
```

Abre http://localhost:4200

## Cómo compilarlo para producción

```bash
npm run build
```

Esto genera la carpeta `dist/bootcamp-landing/browser/` — sube ese contenido tal cual a
Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, o cualquier hosting estático.

## Estructura

```
src/app/
  shared/nav/           header sticky con logo y CTA
  sections/
    hero/                headline + stats
    problem/              por qué otros bootcamps fallan
    solution/              propuesta de valor + stats
    curriculum/            los 6 módulos técnicos
    how-it-works/          timeline de 4 pasos
    payment/               el modelo "$0 por adelantado"
    why-us/                 diferenciadores
    profile-fit/            "sí / no necesitas"
    context/                por qué Java sigue vigente
    cta/                    formulario de postulación
    footer/                 footer
```

## Conectar el formulario (ya integrado con Web3Forms)

El formulario del CTA (`src/app/sections/cta/cta.ts`) ya está programado para mandar
los datos por HTTP a [Web3Forms](https://web3forms.com), un servicio gratuito que
reenvía cada envío a tu correo. Para activarlo:

1. Entra a https://web3forms.com y pon tu correo — sin tarjeta, sin plan pago.
2. Te llega una **Access Key** por correo.
3. Abre `src/app/sections/cta/cta.ts` y reemplaza:
   ```ts
   const WEB3FORMS_ACCESS_KEY = 'PEGA_AQUI_TU_ACCESS_KEY';
   ```
   con la key real.
4. Recompila (`npm run build`) y despliega.

El formulario ya incluye un campo honeypot (invisible para personas) para
filtrar envíos de bots sin necesidad de captcha.

## Pasar a producción, barato

1. **Formulario**: Web3Forms (gratis, ver arriba).
2. **Hosting**: sube la carpeta `dist/bootcamp-landing/browser/` a
   [Vercel](https://vercel.com), [Netlify](https://netlify.com) o
   [Cloudflare Pages](https://pages.cloudflare.com) — los tres tienen plan
   gratuito de sobra para una landing y dan HTTPS automático.
3. **Dominio**: cómpralo en Namecheap o Google Domains (~$8–15/año) y apunta
   los nameservers al hosting elegido.
4. Total: **$0 en hosting + formulario, solo pagas el dominio.**

## Personalizar

- Colores y tipografías: `src/styles.css` (sección `:root`)
- Copy de cada sección: el array/objeto al inicio de cada `*.ts` en `src/app/sections/`
