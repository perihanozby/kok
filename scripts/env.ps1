# Process-local environment only. Does not modify user/machine settings.
$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-17.0.21.9-hotspot'
$env:ANDROID_HOME = 'C:\Android\Sdk'
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin;C:\Program Files\PostgreSQL\17\bin;$env:PATH"
$env:npm_config_cache = Join-Path (Split-Path $PSScriptRoot) '.cache\npm'
$env:GRADLE_USER_HOME = Join-Path (Split-Path $PSScriptRoot) '.cache\gradle'
$env:EXPO_NO_TELEMETRY = '1'
