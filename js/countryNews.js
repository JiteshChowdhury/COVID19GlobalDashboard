export function printCountryNews(newsData){
    console.log(newsData);
    document.getElementById("newsList").children[1].innerHTML = '';
    if(newsData.articles.length > 0){
        for (let i = 0; i < newsData.articles.length; i++){
            document.getElementById("newsList").children[1].innerHTML += '<a href=' + newsData.articles[i].url + ' target="_blank"><ol>' + newsData.articles[i].title + '</ol></a>';
        }
    }
    else{
        document.getElementById("newsList").children[1].innerHTML += '<ol> We are working hard to get news from this location. </ol>';
    }   
}