#!/bin/sh

export ANDROID_HOME=/home/HateChwan/Android/Sdk
$ANDROID_HOME/platform-tools/adb -s cbf8b498 reverse tcp:8081 tcp:8081
$ANDROID_HOME/platform-tools/adb -s cbf8b498 reverse tcp:8021 tcp:8021