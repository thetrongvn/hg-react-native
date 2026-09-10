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

Local quality gate (same checks as CI):

```bash
make ci
```

## CI/CD

GitHub Actions runs on every pull request and every push to `main`.

| Event | Quality (lint, `tsc`, Jest) | Native compile |
|---|---|---|
| Pull request | Yes | No |
| Push to `main` | Yes, then Android + iOS in parallel | Debug APK artifact + iOS Simulator build |

Quality is the merge gate. Require the **Quality** check in branch protection on `main`. Native jobs are compile smokes after merge: they prove Gradle/Xcode still link, they do **not** ship to Play or TestFlight.

How to run it:

1. Open a PR -> Quality must pass.
2. Merge to `main` -> Quality runs again, then Android `assembleDebug` and an unsigned iOS Simulator `xcodebuild`.
3. Download `android-debug-apk` from the Actions run if you need a smoke APK.

iOS CI installs CocoaPods **1.17.0** to match `ios/Podfile.lock`. It does not use `bundle exec pod` yet: `Gemfile.lock` still pins 1.15.2. Do not run `npm run setup:ios` in CI; that script deletes the lockfile.

What this pipeline deliberately does not do (needs secrets that are not in the repo):

- Signed Play AAB / App Store IPA
- Fastlane, TestFlight, internal testing tracks
- Version bumps or changelog automation

When those exist, add a `deploy` job behind a GitHub Environment (`production`) that runs only after the compile jobs, using Fastlane and repository secrets (`PLAY_SERVICE_ACCOUNT`, `ASC_KEY`, upload keystore). Do not put those secrets in `.env`.

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
