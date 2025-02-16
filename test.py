import json

d = '{\"pixelRatio\":1.25,\"screenWidth\":1536,\"screenHeight\":864,\"windowWidth\":1536,\"windowHeight\":695,\"statusBarHeight\":null,\"safeArea\":{\"bottom\":0,\"height\":0,\"left\":0,\"right\":0,\"top\":0,\"width\":0},\"bluetoothEnabled\":false,\"locationEnabled\":false,\"wifiEnabled\":false,\"deviceOrientation\":\"landscape\",\"benchmarkLevel\":-1,\"brand\":\"\",\"model\":\"\",\"system\":null,\"platform\":\"Win32\",\"SDKVersion\":\"\",\"enableDebug\":false,\"language\":\"zh-CN\",\"version\":\"\",\"theme\":\"light\",\"fontSizeSetting\":null,\"albumAuthorized\":false,\"cameraAuthorized\":false,\"locationAuthorized\":false,\"microphoneAuthorized\":false,\"notificationAuthorized\":false,\"notificationAlertAuthorized\":false,\"notificationBadgeAuthorized\":false,\"notificationSoundAuthorized\":false,\"phoneCalendarAuthorized\":false,\"locationReducedAccuracy\":false,\"environment\":\"\"}'

print(json.loads(d))
