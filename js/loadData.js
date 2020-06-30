import {drawWorldMap} from './worldMap.js';
import {drawChart} from './countryChart.js';
import {chart1} from './countryChart.js';
import {printCountryNews} from './countryNews.js';
import {setDataGrid} from './dataGrid.js';
import {setGlobalGridData} from './dataGridGlobal.js'

let allDataTimelineCountry = [];
let dateTimeline = [];
let worldDataTimeline = [];

let countryData = [];
let countryList = [];
let checkCountry = "";
let countryCodeTemp = "";
let countryCodeNewsQuery = "in";
let country = "India";
let date = "2020-04-17T00:00:00Z";
let status = "Active";

//mapData
let globalMapData = [];
let dateListScroll = [];

//chartData
let activeCaseDaily = [];
let confirmedCaseDaily = [];
let recoveredCaseDaily = [];
let deathCaseDaily = [];
let dateDaily = [];

let countryCode = [];

let tempActive = 0;
let tempConfirmed = 0;
let tempDeaths = 0;
let tempRecovered = 0;

$.get("https://api.covid19api.com/summary", function(data) {
        // console.log(data);
        setGlobalGridData(data.Global.TotalConfirmed,data.Global.TotalRecovered,data.Global.TotalDeaths);
}, "json");

$.get("https://api.covid19api.com/all", function(data) {
        // console.log(data);
        setData(data);
        $(".country").html(country);
        // console.log("From main");
        getCountryNews(countryCodeNewsQuery);
}, "json");

function setData(allData){
    for(let i=0;i<allData.length;i++){
        if(!allData[i].Province && allData[i].Country != "China"){
            worldDataTimeline.push(allData[i]);
        }
        if(allData[i].Country == "China" || allData[i].Country == "Australia"){
            if(allData[i].Date!=allData[i+1].Date){
                tempActive = tempActive + allData[i].Active;
                tempConfirmed = tempConfirmed + allData[i].Confirmed;
                tempDeaths = tempDeaths + allData[i].Deaths;
                tempRecovered = tempRecovered + allData[i].Recovered;
                let tempObj = {};
                tempObj = {"Country": allData[i].Country,
                "CountryCode": allData[i].CountryCode,
                "Province": "",
                "City": "",
                "CityCode": "",
                "Lat": "",
                "Lon": "",
                "Confirmed": tempConfirmed,
                "Deaths": tempDeaths,
                "Recovered": tempRecovered,
                "Active": tempActive,
                "Date": allData[i].Date};
                worldDataTimeline.push(tempObj);
                tempActive = 0;
                tempConfirmed = 0;
                tempDeaths = 0;
                tempRecovered = 0;
            }else if(allData[i].Date==allData[i+1].Date){
                tempActive = tempActive + allData[i].Active;
                tempConfirmed = tempConfirmed + allData[i].Confirmed;
                tempDeaths = tempDeaths + allData[i].Deaths;
                tempRecovered = tempRecovered + allData[i].Recovered;
            }
        }
    }
    // console.log("worldDataTimeline : ",worldDataTimeline);
    setCountryData(worldDataTimeline);
}

function setDropDown(countryListData){
    for (let i = 0; i < countryListData.length; i++){
        if(countryListData[i] == 'India'){
            document.getElementById("dropDownChosen").children[2].innerHTML += '<option value="'+ countryListData[i] +'" selected>'+ countryListData[i] +'</option>';
        }else{
            document.getElementById("dropDownChosen").children[2].innerHTML += '<option value="'+ countryListData[i] +'">'+ countryListData[i] +'</option>';
        }
        // console.log(document.getElementById("dropDownChosen").children[2].innerHTML);
    }
    $(".chosen").chosen();
}

function setCountryData(worldDataTimeline){
    let tempArr = [];
    let flag = 0;
    for(let i=0;i<worldDataTimeline.length;i++){
        if(flag == 0){
            checkCountry = worldDataTimeline[i].Country;
            countryCodeTemp = worldDataTimeline[i].CountryCode;
            // console.log(checkCountry);
            flag = 1;
        }
        if(flag == 1){
            if(checkCountry == worldDataTimeline[i].Country){
                tempArr.push(worldDataTimeline[i]);
                if(i!=worldDataTimeline.length-1 && checkCountry != worldDataTimeline[i+1].Country){
                    let tempObj = {"countryAllData":tempArr,"countryName":checkCountry};
                    countryList.push(checkCountry);
                    countryCode.push(countryCodeTemp);
                    countryData.push(tempObj);
                    tempArr = [];
                    flag = 0;
                }
                if(i==worldDataTimeline.length-1){
                    let tempObj = {"countryAllData":tempArr,"countryName":checkCountry};
                    countryList.push(checkCountry);
                    countryCode.push(countryCodeTemp);
                    countryData.push(tempObj);
                }
            }
        }
    }
    // console.log("World Data Timelime: ",countryData);
    // console.log("World Data Timelime Country List: ",countryList);
    setDropDown(countryList);
    // console.log("World Data Timelime Country Code List: ",countryCode);
    setMapVariables(countryData);
    // let countrySelectData = getCountrySelectData(countryData,country);
    let countrySelectData = setCountrySelectData(countryData,country);
    console.log("Selected Country: ",countrySelectData);
}

function setMapVariables(countryData){

    let temp;
    temp = countryData[0].countryAllData;

    for(let i=0;i<temp.length;i++){
        dateListScroll.push(temp[i].Date);
    }

    date = dateListScroll[dateListScroll.length-1];

    setGlobalData(countryData,date,status);
    $("#sliderDisplay").empty();
    $("#sliderDisplay").html("Date: "+date.slice(0, 10));

    //setCountrySelectData(countryData,country);

    $( "#slider" ).slider({
        value: dateListScroll.length-1,
        min: 0, 
        max: dateListScroll.length-1, 
        slide: function(event, ui) { 
            $("#sliderDisplay").empty();
            $("#sliderDisplay").html("Date: "+dateListScroll[ui.value].slice(0, 10)); 
        },
        stop: function( event, ui ) {
            date = dateDaily[ui.value];
            // console.log("Date selected: ",date);
            $("#container").empty();
            setGlobalData(countryData,date,status);
        }
    });

    $('#active').on('click', function() {
        status = $(this).val();
        $("#container").empty();
        setGlobalData(countryData,date,status);
        // console.log(status);
    });

    $('#confirmed').on('click', function() {
        status = $(this).val();
        $("#container").empty();
        setGlobalData(countryData,date,status);
        // console.log(status);
    });

    $('#recovered').on('click', function() {
        status = $(this).val();
        $("#container").empty();
        setGlobalData(countryData,date,status);
        // console.log(status);
    });

    $('#death').on('click', function() {
        status = $(this).val();
        $("#container").empty();
        setGlobalData(countryData,date,status);
        // console.log(status);
    });

    $(document).ready(function(){
        $("select.chosen").change(function(){
            country = $(this).children("option:selected").val(); 
            console.log("Selected Country Name : ",country);
            chart1.destroy();
            $(".country").html(country);
            let selectedCountryCode = getCountryCode(country);
            // console.log("Selected Country Code : ",selectedCountryCode);
            getCountryNews(selectedCountryCode);
            setCountrySelectData(countryData,country);
        });
    });

}

function getCountryCode(country){
    for(let i=0;i<countryList.length;i++){
        if(country == countryList[i]){
            return countryCode[i];
        }
    }
}

function setCountrySelectData(countryData,country){
    let temp = "";
    for(let i=0;i<countryData.length;i++){
        if(countryData[i].countryName == country){
            temp = countryData[i].countryAllData;
            setDataGrid(temp[temp.length-1].Active,temp[temp.length-1].Confirmed,temp[temp.length-1].Recovered,temp[temp.length-1].Deaths);
            break;
        }
    }
    confirmedCaseDaily = [];
    activeCaseDaily = [];
    recoveredCaseDaily = [];
    deathCaseDaily = [];
    dateDaily = [];
    let dateLable = [];
    for(let i=0;i<temp.length;i++){
        confirmedCaseDaily.push(temp[i].Confirmed);
        activeCaseDaily.push(temp[i].Active);
        recoveredCaseDaily.push(temp[i].Recovered);
        deathCaseDaily.push(temp[i].Deaths);
        dateDaily.push(temp[i].Date);
        dateLable.push(temp[i].Date.slice(0, 10));
    }
    // console.log("Confiemd Case Daily",confirmedCaseDaily);
    // console.log("Active Case Daily",activeCaseDaily);
    // console.log("Recovered Case Daily",recoveredCaseDaily);
    // console.log("Death Case Daily",deathCaseDaily);
    // console.log("Date",dateDaily);
    $("#casesChartCountry").empty();
    drawChart(dateLable,activeCaseDaily,confirmedCaseDaily,recoveredCaseDaily,deathCaseDaily);
    return temp;
}

function setGlobalData(countryData,date,status){
    // console.log("Country Data",countryData);
    globalMapData= [];
    for(let k=0;k<countryData.length;k++){
        for(let i=0;i<countryData[k].countryAllData.length;i++){
            if(countryData[k].countryAllData[i].Date == date){
                let tempObj = {};
                if(status == "Confirmed"){
                    tempObj = {"id":countryData[k].countryAllData[i].CountryCode,"title":countryData[k].countryAllData[i].Country,"value":countryData[k].countryAllData[i].Confirmed};
                    globalMapData.push(tempObj);
                }
                else if(status == "Active"){
                    tempObj = {"id":countryData[k].countryAllData[i].CountryCode,"title":countryData[k].countryAllData[i].Country,"value":countryData[k].countryAllData[i].Active};
                    globalMapData.push(tempObj);
                }
                else if(status == "Death"){
                    tempObj = {"id":countryData[k].countryAllData[i].CountryCode,"title":countryData[k].countryAllData[i].Country,"value":countryData[k].countryAllData[i].Deaths};
                    globalMapData.push(tempObj);
                }
                else if(status == "Recovered"){
                    tempObj = {"id":countryData[k].countryAllData[i].CountryCode,"title":countryData[k].countryAllData[i].Country,"value":countryData[k].countryAllData[i].Recovered};
                    globalMapData.push(tempObj);
                }
                break;
            }
        }
    }
    // console.log("Global Map Data",globalMapData);
    drawWorldMap(globalMapData);
}

function getCountryNews(countryCode){
    let url = ("https://covidnewsapi.herokuapp.com/country/?queryCountry=").concat(countryCode);
    $.get(url, function(data){
        console.log("News for Country Code '"+countryCode+"' : ");
        printCountryNews(data);
    });
    // $.get("newsDataLocal.json", function(data){
    //     printCountryNews(data);
    // });
}
