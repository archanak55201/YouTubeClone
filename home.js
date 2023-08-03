const baseUrl = `https://www.googleapis.com/youtube/v3`;
// const apiKey = `AIzaSyBh8h1bK9Gmdo-XTdXg4q4T8mLLUgcPsJw`;//archana
const apiKey =`AIzaSyCdopOmumoijAacpleFFNOszQRI_e2BeJE`;

const flexContainer = document.getElementsByClassName("flex-container")[0];
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click",fetchVedios);

//add more in array
//"morning vibes","motivational speaker","devotional songs","news","new technology","stand up comedy","vlogs","netflix"

let arr =["official trailer","netflix","new songs","new movie songs","news","new technology","stand up comedy","vlogs"];

arr.forEach(element=>{
    fetchRandomVedios(element);
})

async function fetchRandomVedios(element){
    const searchString=element;
    const url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=6`;
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    console.log(result);
    
    addVideoDetail(result.items);
}

async function fetchVedios(){
    const inputvalue=document.querySelector("#search").value;
    console.log(inputvalue);
    const searchString=inputvalue;
    const url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=15`;
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    console.log(result);
    clearData();
    addVideoDetail(result.items);
}

//clear Data==================================================================================================================
function clearData(){
    flexContainer.innerHTML="";
}
//=============================================================================================================================


//get videoinformation==========================================================================================================
async function getVideoDetail(videoId=`DHjqpvDnNGE`){
 
    let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const response = await fetch(url, {method: "GET"}); 
    const videoInfo = await response.json();
    console.log(videoInfo);
    return videoInfo.items[0].statistics.viewCount;
    // const channelDetails = await fetchChannelDetails(videoInfo.items[0].snippet.channelId);
    
}

//channel details============================================================================================================
   
async function getChannelDetails(channelId=`UCeVMnSShP_Iviwkknt83cww`){
    // const channelId=snippet.channelId
    const channelurl = `${baseUrl}/channels?key=${apiKey}&part=snippet,contentDetails,statistics&id=${channelId}`;
    const channelresponse = await fetch(channelurl,{method:"GET"});
    const channelresult = await channelresponse.json();

    console.log(channelresult.items[0]);
    const channelImg = channelresult.items[0].snippet.thumbnails.high.url;
    return channelImg;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++============================================================

//adding videos to home screen==================================================================================================
function addVideoDetail(videos){
    videos.forEach((video)=>{

        console.log(video.id.videoId);
        const videoId=video.id.videoId;
        console.log(videoId);
        // const videoIdResult = getVideoDetail(videoId); 
        // videoIdResult.then((value)=>{
        //     console.log(value);
        // })
      
        // console.log(videoIdResult);
        const {snippet} = video;
        //===================fetching channel Data==============
        // const channelId= getChannelDetails(snippet.channelId);
        const channelImg="images/download.jfif";
        // channelId.then((value)=>{
        //     // console.log(value);
        //     channelImg=value;
        //     // console.log(channelImg);
        // })
        // console.log(channelImg);
        //========================================================

        const flexItem = document.createElement("div");
        
        
        flexItem.innerHTML=`   
                <div style="padding: 5px;" class="openVideo" id="${videoId}">
                    <div class="image-thumbnail">
                        <img src="${snippet.thumbnails.high.url}" style="height:auto;width:100%">
                    </div>
                    <div class="video-bottom-details">
                        <span class="channel-logo" >
                            <img src="${channelImg}" >
                        </span>
                        <div class="video-title-view">
                            <h4 class="video-title">
                                <a href="#" class="video-title-limited">
                                    ${snippet.title}
                                </a>
                            </h4>
                            <div class="channel-name"><a href="#">${snippet.channelTitle}</a></div>
                            <div class="views-time">
                                <span class="video-views">57M views</span>
                                <span class="publish-time-gap">6 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        flexContainer.appendChild(flexItem);
        flexItem.className="flex-item";
       
        // console.log("notclicked");
        const flexVideoItems = document.querySelectorAll(".flex-item");
        flexVideoItems.forEach(item=>{
            console.log("wait to click");
            item.addEventListener("click",openFullHDVideo);
        })
       
    })
}
//  fetchVedios();



 //open video -------------------------------------------------------

 function openFullHDVideo(event){
    // const singlevideoId=videoId;
    // console.log("asd",singlevideoId);
    console.log("clicked");
   
    console.log(event.currentTarget);
    const flexopen = event.currentTarget;
    const singleVideoId = flexopen.querySelector(".openVideo").id;
    // console.log(videoId);
    sessionStorage.setItem('singleVideoId',singleVideoId);
    window.location.href="video.html";
 }


 //channel open-----------------------------------------------

//  function channelNameClicked(event){
//     event.stopPropogation();
//     console.log("channel name clicked");
//     console.log(event.currentTarget);
//  }

//  function channelLogoClicked(event){
//     event.stopPropogation();
//     console.log("channel name clicked");
//     console.log(event.currentTarget);
//  }

 