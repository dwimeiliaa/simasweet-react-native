#!/bin/sh

export ANDROID_HOME=/home/HateChwan/Android/Sdk
$ANDROID_HOME/platform-tools/adb -s cbf8b498 reverse tcp:8081 tcp:8081
$ANDROID_HOME/platform-tools/adb -s cbf8b498 reverse tcp:8082 tcp:8082