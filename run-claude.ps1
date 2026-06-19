$settingsFile = Join-Path $PSScriptRoot ".settings.local.json"
if (Test-Path $settingsFile) {
    $settings = Get-Content -Raw -Path $settingsFile | ConvertFrom-Json
    if ($settings.env) {
        foreach ($prop in $settings.env.PSObject.Properties) {
            [System.Environment]::SetEnvironmentVariable($prop.Name, $prop.Value, "Process")
            Write-Host "Loaded environment variable: $($prop.Name)"
        }
    }
} else {
    Write-Warning "Could not find .settings.local.json at $settingsFile"
}

# Remove Anthropic API key to avoid conflicts with custom API URL / keys
Remove-Item Env:\ANTHROPIC_API_KEY -ErrorAction SilentlyContinue

# Launch the Claude CLI
claude
