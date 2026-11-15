param()
$ErrorActionPreference = 'Continue'
$env:EXPO_NO_TELEMETRY = '1'
function Section($Name) { "`n## $Name" }
Section 'Host'
Get-Date -Format o
Get-CimInstance Win32_OperatingSystem | Select-Object Caption,Version,OSArchitecture,TotalVisibleMemorySize,FreePhysicalMemory | Format-List
Get-CimInstance Win32_Processor | Select-Object Name,NumberOfCores,NumberOfLogicalProcessors | Format-List
Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | Select-Object DeviceID,Size,FreeSpace | Format-Table
Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name LongPathsEnabled | Select-Object LongPathsEnabled | Format-List
Section 'Tools'
$checks = @(@('node','--version'),@('npm.cmd','--version'),@('git','--version'),@('java','-version'),@('javac','-version'),@('dotnet','--info'),@('docker','version'),@('psql','--version'),@('code.cmd','--version'),@('winget','--version'))
foreach ($check in $checks) {
  $command = Get-Command $check[0] -ErrorAction SilentlyContinue
  if ($command) { "### $($check[0]) [$($command.Source)]"; & $command.Source $check[1] 2>&1 | Out-String; "Exit: $LASTEXITCODE" } else { "MISSING: $($check[0])" }
}
Section 'Environment'
foreach ($name in @('JAVA_HOME','ANDROID_HOME','ANDROID_SDK_ROOT')) {
  foreach ($scope in @('Process','User','Machine')) { "$name ($scope): $([Environment]::GetEnvironmentVariable($name,$scope))" }
}
Section 'Known installation directories'
$paths = @("$env:LOCALAPPDATA\Android\Sdk",'C:\Android','C:\Android\Sdk','C:\Program Files\Eclipse Adoptium','C:\Program Files\Java','C:\Program Files\PostgreSQL','C:\dev','C:\dev\kok')
foreach ($path in $paths) { "### $path : $(Test-Path -LiteralPath $path)"; if (Test-Path -LiteralPath $path) { Get-ChildItem -LiteralPath $path | Select-Object Name,Mode | Format-Table } }
Section 'Services'
Get-Service | Where-Object { $_.Name -match 'postgres|docker' } | Select-Object Name,Status | Format-Table
if (Test-Path 'C:\Program Files\PostgreSQL\17\bin\psql.exe') {
  & 'C:\Program Files\PostgreSQL\17\bin\psql.exe' --version
  & 'C:\Program Files\PostgreSQL\17\bin\pg_isready.exe' -h localhost -p 5432
}
Section 'Android SDK'
$sdkRoots = @($env:ANDROID_HOME,$env:ANDROID_SDK_ROOT,"$env:LOCALAPPDATA\Android\Sdk",'C:\Android\Sdk','C:\Android') | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -Unique
$adb = Get-Command adb -ErrorAction SilentlyContinue
foreach ($sdk in $sdkRoots) {
  foreach ($sub in @('platforms','build-tools','cmdline-tools','platform-tools','licenses','ndk','cmake')) { $path = Join-Path $sdk $sub; if (Test-Path $path) { "### $path"; Get-ChildItem $path | Select-Object Name | Format-Table } }
  if (Test-Path "$sdk\platform-tools\adb.exe") { $adb = Get-Item "$sdk\platform-tools\adb.exe" }
  $manager = "$sdk\cmdline-tools\latest\bin\sdkmanager.bat"
  if (Test-Path $manager) { & $manager --list_installed 2>&1 | Out-String }
}
if ($adb) {
  $adbPath = if ($adb.Source) { $adb.Source } else { $adb.FullName }
  & $adbPath version
  $devices = & $adbPath devices -l
  $devices
  foreach ($line in $devices) {
    if ($line -match '^(\S+)\s+device\s') {
      $serial = $Matches[1]
      foreach ($prop in @('ro.product.model','ro.build.version.release','ro.build.version.sdk','ro.product.cpu.abi')) { "$prop : $(& $adbPath -s $serial shell getprop $prop)" }
      & $adbPath -s $serial shell df /data
      & $adbPath -s $serial shell wm size
      & $adbPath -s $serial shell wm density
      & $adbPath -s $serial shell pm list features | Select-String microphone
      1..3 | ForEach-Object { & $adbPath -s $serial get-state }
    }
  }
} else { 'MISSING: adb (PATH and known SDK roots)' }
Section 'Metro port 8081'
Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue | Select-Object State,OwningProcess | Format-Table
Section 'Workspace'
Get-ChildItem -Force | Select-Object Name,Mode | Format-Table
