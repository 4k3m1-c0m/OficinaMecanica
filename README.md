# OficinaPro

Projeto React + Vite + Capacitor para check-in de veículos.

## Instalação
```bash
npm install
```

## Rodar no computador
```bash
npm run dev
```

Acesse o endereço mostrado no terminal e abra `/checkin` para testar o formulário.

## Gerar a versão web
```bash
npm run build
```

## Preparar Android (primeira vez)
```bash
npx cap add android
```

## Sincronizar e abrir Android
```bash
npm run build
npx cap sync android
npx cap open android
```

A câmera nativa deve ser testada em um aparelho Android ou emulador. O cancelamento é tratado no componente de check-in.
