# Stop all Node.js processes (dev server)
Write-Host "Stopping all Node.js processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Remove Next.js cache
Write-Host "Deleting .next folder..."
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Remove node_modules and lock file
Write-Host "Deleting node_modules and package-lock.json..."
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Optional: Check for leftover middleware imports
Write-Host "Searching for leftover middleware imports..."
$middlewareFiles = Select-String -Path .\**\*.ts* -Pattern "middleware" -SimpleMatch
if ($middlewareFiles) {
    Write-Host "⚠️ Found potential leftover middleware imports:"
    $middlewareFiles | ForEach-Object { Write-Host $_.Path ":" $_.Line }
} else {
    Write-Host "No leftover middleware imports found."
}

Write-Host "✅ Reset complete. Run 'npm install' and then 'npm run dev'."