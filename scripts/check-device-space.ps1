param([string]$Serial = '9c4341cb', [string]$ApkPath)
$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\env.ps1"
. "$PSScriptRoot\lib\device-space.ps1"
$root = Split-Path $PSScriptRoot
if (-not $ApkPath) { $ApkPath = Join-Path $root 'mobile\android\app\build\outputs\apk\debug\app-debug.apk' }
$apk = Get-Item -LiteralPath $ApkPath
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead($apk.FullName)
try {
  $native = [long](($archive.Entries | Where-Object { $_.FullName -match '^lib/.+\.so$' } | Measure-Object Length -Sum).Sum)
  $dex = [long](($archive.Entries | Where-Object { $_.FullName -match '^classes\d*\.dex$' } | Measure-Object Length -Sum).Sum)
} finally { $archive.Dispose() }
$adb = Join-Path $env:ANDROID_HOME 'platform-tools\adb.exe'
$df = (& $adb -s $Serial shell df -k /data | Out-String)
if ($LASTEXITCODE -ne 0) { throw 'Could not measure phone free space.' }
$row = $df -split "`n" | Where-Object { $_ -match '^/\S+\s+\d+\s+\d+\s+\d+\s+\d+%' } | Select-Object -Last 1
if (-not $row) { throw 'Unexpected df output; refusing to guess free space.' }
$columns = $row.Trim() -split '\s+'
$free = [long]$columns[3] * 1024
$monitor = (& $adb -s $Serial shell dumpsys devicestoragemonitor | Out-String)
if ($LASTEXITCODE -ne 0 -or $monitor -notmatch 'lowBytes=(\d+)') { throw 'Could not read Android low-storage threshold.' }
$low = [long]$Matches[1]
$budget = Get-KokInstallBudget -ApkBytes $apk.Length -NativeBytes $native -DexBytes $dex -AvailableBytes $free -LowBytes $low
$report = [ordered]@{
  MeasuredAt = (Get-Date -Format o)
  ApkSha256 = (Get-FileHash -LiteralPath $apk.FullName -Algorithm SHA256).Hash
  Method = 'Conservative: 2*APK + all native bytes + 2*DEX + 100MiB startup + measured Android low-space floor. Exact OS allocation may be lower.'
  Budget = $budget
}
$outputPath = Join-Path $root 'docs\DEVICE_INSTALL_SPACE.json'
[IO.File]::WriteAllText($outputPath, ($report | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))
$budget | Format-List
if (-not $budget.EnoughSpace) { throw "Installation blocked by conservative space budget. Free at least $($budget.ShortfallBytes) additional bytes. No phone files were deleted." }
