function Get-KokInstallBudget {
  param(
    [ValidateRange(0,[long]::MaxValue)][long]$ApkBytes,
    [ValidateRange(0,[long]::MaxValue)][long]$NativeBytes,
    [ValidateRange(0,[long]::MaxValue)][long]$DexBytes,
    [ValidateRange(0,[long]::MaxValue)][long]$AvailableBytes,
    [ValidateRange(0,[long]::MaxValue)][long]$LowBytes,
    [long]$RuntimeReserveBytes = 104857600
  )
  # Conservative planning budget, not an exact Android PackageInstaller requirement.
  # Two APK copies, all native libraries, twice DEX bytes, startup data and OS low-space floor.
  $installationBytes = [long](2 * $ApkBytes + $NativeBytes + 2 * $DexBytes + $RuntimeReserveBytes)
  $requiredBytes = [long]($installationBytes + $LowBytes)
  [pscustomobject]@{
    ApkBytes = $ApkBytes
    NativeUncompressedBytes = $NativeBytes
    DexUncompressedBytes = $DexBytes
    RuntimeReserveBytes = $RuntimeReserveBytes
    AndroidLowBytes = $LowBytes
    AvailableBytes = $AvailableBytes
    InstallationBudgetBytes = $installationBytes
    RequiredFreeBytes = $requiredBytes
    ShortfallBytes = [Math]::Max([long]0, [long]($requiredBytes - $AvailableBytes))
    EnoughSpace = ($AvailableBytes -ge $requiredBytes)
  }
}
