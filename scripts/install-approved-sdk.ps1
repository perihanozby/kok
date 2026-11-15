param([switch]$Approved, [switch]$AcceptPackageLicense)
$ErrorActionPreference = 'Stop'
if (-not $Approved) { throw 'Requires explicit user approval under AGENTS.md 1.4 / 5.3.' }
. "$PSScriptRoot\env.ps1"
$manager = Join-Path $env:ANDROID_HOME 'cmdline-tools\latest\bin\sdkmanager.bat'
$target = Join-Path $env:ANDROID_HOME 'build-tools\36.0.0\source.properties'
if (Test-Path $target) {
  Get-Content $target
  exit 0
}
# Only the approved package; do not run --licenses for unrelated SDK components.
if ($AcceptPackageLicense) {
  'y' | & $manager "--sdk_root=$env:ANDROID_HOME" 'build-tools;36.0.0'
} else {
  & $manager "--sdk_root=$env:ANDROID_HOME" 'build-tools;36.0.0'
}
if ($LASTEXITCODE -ne 0) { throw "SDK package installation failed: $LASTEXITCODE" }
if (-not (Test-Path $target)) { throw 'Expected Build-Tools 36.0.0 was not installed.' }
Get-Content $target
