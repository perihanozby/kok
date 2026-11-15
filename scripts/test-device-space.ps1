$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\lib\device-space.ps1"
$case = Get-KokInstallBudget -ApkBytes 10 -NativeBytes 20 -DexBytes 5 -AvailableBytes 100 -LowBytes 30 -RuntimeReserveBytes 20
if ($case.RequiredFreeBytes -ne 100 -or -not $case.EnoughSpace -or $case.ShortfallBytes -ne 0) { throw 'Exact threshold test failed.' }
$case = Get-KokInstallBudget -ApkBytes 10 -NativeBytes 20 -DexBytes 5 -AvailableBytes 99 -LowBytes 30 -RuntimeReserveBytes 20
if ($case.EnoughSpace -or $case.ShortfallBytes -ne 1) { throw 'Insufficient space test failed.' }
$case = Get-KokInstallBudget -ApkBytes 2147483648 -NativeBytes 0 -DexBytes 0 -AvailableBytes 10000000000 -LowBytes 0 -RuntimeReserveBytes 0
if ($case.RequiredFreeBytes -ne 4294967296 -or -not $case.EnoughSpace) { throw '64-bit arithmetic test failed.' }
'3 installation budget tests passed.'
