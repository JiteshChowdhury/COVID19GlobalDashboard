export function setDataGrid(active,confirmed,recovered,deceased){
    $(".Active").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+formatNumber(active)+'</span>  Active');
    $(".Confirmed").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(255, 99, 132, 1);">'+formatNumber(confirmed)+'</span> Confirmed');
    $(".Recovered").html('<span id="globalGridSpan" style="font-weight: bold; color:rgba(75, 192, 192, 1);">'+formatNumber(recovered)+'</span> Recovered');
    $(".Deceased").html('<span id="globalGridSpan" style="font-weight: bold; color:#181818;">'+formatNumber(deceased)+'</span> Deceased');
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }