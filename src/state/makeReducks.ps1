Param([Parameter(Mandatory)][string]$status)

$reducksItems = @("actions", "index", "operations", "reducers", "selectors", "types");

$newdir = Join-Path $PSScriptRoot $status;
if(Test-Path $newdir) {
    Write-Output ("[" + $status + "]は既に存在します。");
    return;
}


New-Item -ItemType directory $newdir;

foreach($item in $reducksItems) {
    $reducksitem = Join-Path $newdir ($item + ".ts");
    New-Item -ItemType file $reducksitem;
}