export function setDataGrid(active,confirmed,recovered,deceased){
    $(".Active").html('<span style="font-size: xx-large; font-weight: bold; color:rgba(102, 102, 102, 0.7);">'+active+'</span>  Active');
    $(".Confirmed").html('<span style="font-size: xx-large; font-weight: bold; color:rgba(255, 99, 132, 1);">'+confirmed+'</span> Total Confirmed');
    $(".Recovered").html('<span style="font-size: xx-large; font-weight: bold; color:rgba(75, 192, 192, 1);">'+recovered+'</span> Total Recovered');
    $(".Deceased").html('<span style="font-size: xx-large; font-weight: bold; color:#181818;">'+deceased+'</span> Total Deceased');
}