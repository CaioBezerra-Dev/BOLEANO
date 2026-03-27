# BOLEANO

Jogo arcade de interpretação rápida de código. Responda **0** (FALSE) ou **1** (TRUE) em 20 segundos.

## Instalação (web)

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Mobile (Android)

1. Instale o [Android Studio](https://developer.android.com/studio) (JDK incluso).
2. Gere o web bundle e sincronize com o projeto Android:

   ```bash
   npm run cap:sync
   ```

3. Abra no Android Studio e rode no emulador ou no aparelho:

   ```bash
   npm run cap:open:android
   ```

4. No Android Studio: **Build → Build Bundle(s) / APK(s)** para gerar o APK (instalação local ou distribuição fora da Play Store).

**Nota:** As perguntas vêm do `questions.json` **empacotado no build** (import estático). Atualizar o conteúdo exige novo `npm run build` / novo APK.

## PWA (Chrome no Android)

Depois de `npm run build`, sirva `dist/` por HTTPS (ou use `npm run preview` na rede local). No Chrome: menu → **Instalar app** / **Adicionar à tela inicial**. O `manifest.webmanifest` e o ícone estão em `public/`.

## Como jogar

1. Selecione linguagens e nível (Junior / Pleno / Senior).
2. Leia o trecho de código ou texto.
3. Toque em **0** ou **1** (no teclado físico: `0`/`A`/`←` ou `1`/`D`/`→`).
4. Três vidas; ~20 s por pergunta.

## Stack

React + Vite + Zustand + Tailwind CSS · Capacitor (Android)
