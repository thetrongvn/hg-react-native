# hg-react-native

`hg-react-native` is a production-oriented React Native starter: session-gated navigation, a bootstrap status machine, and a service I/O boundary so product features can land without rewriting the shell.

## Features

- React Native 0.83 (New Architecture, Hermes, TypeScript)
- Session-gated navigation (Auth stack vs App tabs)
- Bootstrap status machine (`idle | loading | ready | error`), independent of auth
- API layer (Axios + env-based base URL)
- Realm for app settings / offline data
- Keychain for tokens (never Realm or Redux)
- Redux Toolkit for serializable UI/session state
- Theme provider, i18n (`en` / `vi`)

## Project structure

```
hg-react-native/
├── src/
│   ├── app/              # AppProviders, RootNavigator, splash/error
│   ├── hooks/            # useBootstrap (later: useEngine)
│   ├── navigation/       # AuthStack, AppTabs, typed routes
│   ├── features/         # auth, home, profile, notifications
│   ├── core/
│   │   ├── api/          # Axios client + endpoints
│   │   ├── db/           # lazy Realm open/migrate
│   │   ├── models/       # Realm schemas
│   │   └── services/     # screens talk here, not to Axios/Realm/Keychain
│   ├── redux/            # store + slices
│   ├── theme/            # tokens + ThemeProvider
│   ├── i18n/
│   ├── components/
│   └── utils/            # Keychain helpers
├── .env.example
└── ...
```

Layer contract:

```
Screen → hook or service
service → api client and/or Realm and/or Keychain
api → Axios instance only
slice → serializable UI/session state only
```

## Getting started

### Clone the repo

```
git clone https://github.com/hgq287/hg-react-native.git
cd hg-react-native
```

### Install dependencies

```bash
npm install
```

iOS pods:

```bash
npm run setup:ios
```

### Set up environment

```
cp .env.example .env
```

Then edit `.env` (API base URL, namespace, Realm schema version).

### Run the app

```bash
npm run ios
npm run android
```

### Tests

```bash
npm test
```

## What’s inside

- React Native 0.83
- React Navigation 7 (native stack + tabs)
- Realm
- Axios
- react-native-config
- react-native-keychain
- TypeScript

## License

MIT License
