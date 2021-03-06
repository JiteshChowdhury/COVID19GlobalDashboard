export function setGlobalGridData(confirmed,recovered,deceased){
    $(".globalConfirmed").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+formatNumber(confirmed)+'</span> Confirmed');
    $(".globalRecovered").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+formatNumber(recovered)+'</span> Recovered');
    $(".globalDeceased").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+formatNumber(deceased)+'</span> Deceased');
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }