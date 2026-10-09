$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"

# Pause OneDrive to prevent file locks during build
Write-Host "Pausing OneDrive sync..." -ForegroundColor Yellow
$oneDriveProc = Get-Process -Name "OneDrive" -ErrorAction SilentlyContinue
if ($oneDriveProc) { Stop-Process -Name "OneDrive" -Force; Start-Sleep -Seconds 2 }

# Kill any stale Gradle/Java processes
Get-Process -Name "java","gradle" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Clean the locked Capacitor build cache
$capAndroid = "C:\Users\leyea\OneDrive\Documents\Vibe Coding\Claude\bible-app\node_modules\@capacitor\android\capacitor\build"
if (Test-Path $capAndroid) { Remove-Item $capAndroid -Recurse -Force -ErrorAction SilentlyContinue }

Write-Host "Step 1: Building web app and syncing to Android..." -ForegroundColor Cyan
npm run android:sync

Write-Host "Step 2: Building signed release AAB..." -ForegroundColor Cyan
Set-Location android
.\gradlew bundleRelease --no-daemon
$buildResult = $LASTEXITCODE
Set-Location ..

# Restart OneDrive
Write-Host "Restarting OneDrive..." -ForegroundColor Yellow
Start-Process "$env:LOCALAPPDATA\Microsoft\OneDrive\OneDrive.exe" -ErrorAction SilentlyContinue

if ($buildResult -eq 0) {
    $aab = "android\app\build\outputs\bundle\release\app-release.aab"
    if (-not (Test-Path $aab)) {
        $aab = Get-ChildItem "C:\AndroidBuild" -Recurse -Filter "app-release.aab" -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
    }
    if ($aab -and (Test-Path $aab)) {
        $size = [math]::Round((Get-Item $aab).Length / 1MB, 1)
        Write-Host "BUILD SUCCESSFUL - $size MB" -ForegroundColor Green
        Write-Host "File: $aab" -ForegroundColor Green
    } else {
        Write-Host "BUILD SUCCESSFUL - find app-release.aab in android\app\build\outputs\bundle\release\" -ForegroundColor Green
    }
    Write-Host "Upload this AAB to Google Play Console." -ForegroundColor Yellow
} else {
    Write-Host "Build failed - check errors above." -ForegroundColor Red
}
