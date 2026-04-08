@echo off
REM Publish to GitHub. Procedure: docs/submission-guide.md
REM Run from the repository root (double-click is OK on Windows).

setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

title Opdrag_onderhoud - Git + GitHub

echo.
echo  Git + GitHub: installs Git/gh if needed, logs in, creates repo, pushes.
echo.

REM --- Git (winget if missing) ---
set "PATH=%ProgramFiles%\Git\cmd;%ProgramFiles%\Git\bin;%PATH%"
where git >nul 2>&1
if errorlevel 1 (
  echo [*] Git not found. Installing via winget ^(may prompt UAC / wait a minute^)...
  winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity
  set "PATH=%ProgramFiles%\Git\cmd;%ProgramFiles%\Git\bin;%PATH%"
)
where git >nul 2>&1
if errorlevel 1 (
  echo [X] Git is still not available. Restart after the installer finishes, then double-click again.
  pause
  exit /b 1
)

for %%I in (.) do set "REPO=%%~nxI"
set "REPO=!REPO: =-!"

echo  [1] Quick   - commit author from your GitHub account ^(fewest prompts^)
echo  [2] Custom  - you type name ^& email for commits ^(e.g. school requirements^)
echo.
set "PICK="
set /p PICK="  Type 2 for custom, or press Enter for Quick: "
if /I "!PICK!"=="2" goto MODE_CUSTOM
goto MODE_QUICK

:MODE_QUICK
call :ENSURE_GH
if errorlevel 1 exit /b 1

for /f "delims=" %%L in ('gh api user -q .login 2^>nul') do set "GH_LOGIN=%%L"
if not defined GH_LOGIN (
  echo [X] Could not read GitHub account.
  pause
  exit /b 1
)
for /f "delims=" %%i in ('gh api user -q .id 2^>nul') do set "GH_ID=%%i"
for /f "delims=" %%n in ('gh api user -q .name 2^>nul') do set "GIT_NAME=%%n"
if not defined GIT_NAME set "GIT_NAME=!GH_LOGIN!"
set "GIT_EMAIL=!GH_ID!+!GH_LOGIN!@users.noreply.github.com"

if not exist .git (
  git init -b main
  if errorlevel 1 (
    echo [X] git init failed.
    pause
    exit /b 1
  )
)
git config user.name "!GIT_NAME!"
git config user.email "!GIT_EMAIL!"
git add -A
git commit -m "Initial commit: Opdrag onderhoud fullstack Pokemon assignment" >nul 2>&1
goto PUBLISH

:MODE_CUSTOM
if not exist .git (
  echo [*] Initializing repository ^(branch main^)...
  git init -b main
  if errorlevel 1 (
    echo [X] git init failed.
    pause
    exit /b 1
  )
)
echo.
set "GIT_NAME="
set /p GIT_NAME="  Your name for commits ^(user.name^): "
if not defined GIT_NAME (
  echo [X] Name required.
  pause
  exit /b 1
)
set "GIT_EMAIL="
set /p GIT_EMAIL="  Your email for commits ^(user.email^): "
if not defined GIT_EMAIL (
  echo [X] Email required.
  pause
  exit /b 1
)
echo.
echo    (L^) this repo only   (G^) all repos on this PC
set "SCOPE="
set /p SCOPE="  L or G [L]: "
if /I "!SCOPE!"=="G" (
  git config --global user.name "!GIT_NAME!"
  git config --global user.email "!GIT_EMAIL!"
) else (
  git config user.name "!GIT_NAME!"
  git config user.email "!GIT_EMAIL!"
)
set "COMMIT_MSG=Initial commit: Opdrag onderhoud fullstack Pokemon assignment"
set /p COMMIT_MSG_IN="  Commit message [!COMMIT_MSG!]: "
if defined COMMIT_MSG_IN set "COMMIT_MSG=!COMMIT_MSG_IN!"
echo.
git add -A
git status -s
echo.
set "DO_COMMIT="
set /p DO_COMMIT="  Create commit now? (Y/n): "
if /I "!DO_COMMIT!"=="n" (
  echo [X] Need a commit to push. Run this script again when ready.
  pause
  exit /b 1
)
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
  echo [!] No new commit ^(nothing to commit or already up to date^).
)

call :ENSURE_GH
if errorlevel 1 exit /b 1

for /f "delims=" %%L in ('gh api user -q .login 2^>nul') do set "GH_LOGIN=%%L"
if not defined GH_LOGIN (
  echo [X] Could not read GitHub login.
  pause
  exit /b 1
)
goto PUBLISH

:PUBLISH
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
  echo [*] Remote already set. Pushing to origin main...
  git push -u origin main
  if errorlevel 1 (
    echo [X] Push failed.
    pause
    exit /b 1
  )
  echo [OK] Done.
  goto SHOW_URL
)

echo [*] Creating github.com/!GH_LOGIN!/!REPO! and pushing...
gh repo create "!REPO!" --public --source=. --remote=origin --push
if not errorlevel 1 (
  echo [OK] Repository created and pushed.
  goto SHOW_URL
)

echo [*] Create failed ^(repo may already exist^). Adding origin and pushing...
git remote remove origin 2>nul
git remote add origin "https://github.com/!GH_LOGIN!/!REPO!.git"
git push -u origin main
if errorlevel 1 (
  echo [X] Push failed.
  pause
  exit /b 1
)
echo [OK] Pushed to existing repository.

:SHOW_URL
echo.
echo  Open: https://github.com/!GH_LOGIN!/!REPO!
echo.
pause
endlocal
exit /b 0

:ENSURE_GH
set "PATH=%ProgramFiles%\GitHub CLI;%ProgramFiles%\Microsoft\WinGet\Links;%LOCALAPPDATA%\Microsoft\WinGet\Links;%PATH%"
where gh >nul 2>&1
if errorlevel 1 (
  echo [*] GitHub CLI not found. Installing via winget ^(may prompt UAC / wait a minute^)...
  winget install --id GitHub.cli -e --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity
  set "PATH=%ProgramFiles%\GitHub CLI;%ProgramFiles%\Microsoft\WinGet\Links;%LOCALAPPDATA%\Microsoft\WinGet\Links;%PATH%"
)
where gh >nul 2>&1
if errorlevel 1 (
  echo [X] GitHub CLI still not on PATH. Close this window, open a new one, double-click again.
  pause
  exit /b 1
)
gh auth status >nul 2>&1
if errorlevel 1 (
  echo [*] Not logged in to GitHub. Browser will open - finish login, then return here.
  gh auth login -h github.com -p https -w
)
gh auth status >nul 2>&1
if errorlevel 1 (
  echo [X] GitHub login did not finish. Double-click this script again after browser login.
  pause
  exit /b 1
)
exit /b 0
