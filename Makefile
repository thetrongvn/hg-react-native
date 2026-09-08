# Makefile for React Native (npm)

.PHONY: ios android clean reinstall pods start reset-cache

## Run the app on iOS simulator
ios:
	npx react-native run-ios

## Run the app on Android emulator/device
android:
	npx react-native run-android

## Clear Metro bundler cache
reset-cache:
	npx react-native start --reset-cache

## Start the Metro bundler only
start:
	npx react-native start

## Clean node_modules and lock files
clean:
	rm -rf node_modules
	rm -f package-lock.json
	rm -rf ios/Pods ios/Podfile.lock

## Clean and reinstall everything (node_modules + pods)
reinstall: clean
	npm install
	cd ios && pod install

## Run pod install for iOS
pods:
	cd ios && pod install
