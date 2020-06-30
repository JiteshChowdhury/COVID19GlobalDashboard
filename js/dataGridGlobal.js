export function setGlobalGridData(confirmed,recovered,deceased){
    $(".globalConfirmed").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+confirmed+'</span> Confirmed');
    $(".globalRecovered").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+recovered+'</span> Recovered');
    $(".globalDeceased").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+deceased+'</span> Deceased');
}