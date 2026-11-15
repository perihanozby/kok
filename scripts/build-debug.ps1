$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\env.ps1"
$root = Split-Path $PSScriptRoot
Push-Location "$root\mobile\android"
try {
  & .\gradlew.bat ':app:assembleDebug' '--no-daemon' '--max-workers=1' '-Pandroid.builder.sdkDownload=false' '-PreactNativeArchitectures=arm64-v8a'
  if ($LASTEXITCODE -ne 0) { throw "Gradle debug build failed: $LASTEXITCODE" }
  Get-Item '.\app\build\outputs\apk\debug\app-debug.apk' | Select-Object FullName,Length,LastWriteTime
  $cache = Get-ChildItem $env:GRADLE_USER_HOME -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum
  "Gradle cache bytes: $($cache.Sum)"
} finally { Pop-Location }
