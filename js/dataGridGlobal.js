export function setGlobalGridData(confirmed,recovered,deceased){
    $(".globalConfirmed").html('<span style="font-size: xx-large; font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+confirmed+'</span> Total Confirmed');
    $(".globalRecovered").html('<span style="font-size: xx-large; font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+recovered+'</span> Total Recovered');
    $(".globalDeceased").html('<span style="font-size: xx-large; font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+deceased+'</span> Total Deceased');
}