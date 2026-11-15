param([string]$Serial = '9c4341cb', [switch]$SkipInstall)
$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\env.ps1"
$root = Split-Path $PSScriptRoot
$package = 'com.kok.dijitalailemirasi'
$adb = Join-Path $env:ANDROID_HOME 'platform-tools\adb.exe'
function Invoke-Adb([string[]]$CommandArgs) {
  $output = & $adb -s $Serial @CommandArgs 2>&1
  if ($LASTEXITCODE -ne 0) { throw "ADB failed ($LASTEXITCODE): $output" }
  return $output
}
if ((Invoke-Adb @('get-state')).Trim() -ne 'device') { throw 'Authorized device required.' }
if (-not $SkipInstall) {
  $apk = Join-Path $root 'mobile\android\app\build\outputs\apk\debug\app-debug.apk'
  if (-not (Test-Path $apk)) { throw "APK missing: $apk" }
  & "$PSScriptRoot\check-device-space.ps1" -Serial $Serial -ApkPath $apk
  Invoke-Adb @('install','-r',$apk)
}
Invoke-Adb @('reverse','tcp:8081','tcp:8081')
$metro = Invoke-WebRequest 'http://127.0.0.1:8081/status' -UseBasicParsing
if ($metro.Content -notmatch 'packager-status:running') { throw 'Metro is not ready on localhost:8081.' }
Invoke-Adb @('shell','am','force-stop',$package)
$developmentUrl = 'exp+kok-dijital-aile-mirasi://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081'
Invoke-Adb @('shell','am','start','-a','android.intent.action.VIEW','-d',$developmentUrl,$package)
$appPid = ''
for ($attempt = 0; $attempt -lt 10; $attempt++) {
  Start-Sleep -Seconds 1
  $appPid = (& $adb -s $Serial shell pidof $package | Out-String).Trim()
  if ($appPid) { break }
}
if (-not $appPid) { throw 'Application process did not start.' }
Start-Sleep -Seconds 8
$outputDir = Join-Path $root 'docs\visual-qa\phase-1'
New-Item -ItemType Directory -Force $outputDir | Out-Null
$log = Invoke-Adb @('logcat','-d',"--pid=$appPid",'-v','threadtime')
$log | Out-File -Encoding utf8 (Join-Path $outputDir 'logcat.local.txt')
if (($log | Out-String) -match 'FATAL EXCEPTION|Fatal signal|ReactNativeJS:.*Error:') {
  throw 'Crash or JavaScript error found in process logs. Review local logcat.'
}
$capture = [Diagnostics.ProcessStartInfo]::new()
$capture.FileName = $adb
$capture.Arguments = "-s $Serial exec-out screencap -p"
$capture.UseShellExecute = $false
$capture.RedirectStandardOutput = $true
$capture.CreateNoWindow = $true
$process = [Diagnostics.Process]::Start($capture)
$file = [IO.File]::Create((Join-Path $outputDir 'device.png'))
try { $process.StandardOutput.BaseStream.CopyTo($file) } finally { $file.Dispose() }
$process.WaitForExit()
if ($process.ExitCode -ne 0) { throw 'Screenshot capture failed.' }
"Smoke commands passed; screenshot must be visually inspected before declaring application success. PID: $appPid"
