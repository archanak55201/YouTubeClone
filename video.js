const baseUrl = `https://www.googleapis.com/youtube/v3`;
const apiKey = `AIzaSyBh8h1bK9Gmdo-XTdXg4q4T8mLLUgcPsJw`;


const title = document.getElementsByClassName("title")[0];
const ChannelImage = document.getElementsByClassName("channelImage")[0];
const videoChannelName= document.getElementById("vChannelName");
const vchannelSubscriber= document.getElementById("vchannelSubscriber");
const videoLikes= document.getElementById("videoLikes");
const videoViews= document.getElementById("videoViews");
const postTime= document.getElementById("postTime");
const vdesc= document.getElementById("vdesc");
const vComments= document.getElementById("vComments");

console.log(title,ChannelImage,videoChannelName,vchannelSubscriber)
console.log(videoLikes,videoViews,postTime,vdesc,vComments)

const videoDiv = document.getElementsByClassName("video-player")[0];
// console.log(videoDiv);
const singleVideoId = sessionStorage.getItem('singleVideoId');
const videoId=singleVideoId;


//adding suggested videos=======================================
const suggestString = sessionStorage.getItem('suggestString');
console.log(suggestString,);

document.querySelector("#search").value=suggestString;
const inputValue =document.querySelector("#search").value;
console.log(inputValue);


const secondaryDiv = document.getElementsByClassName("secondary")[0];
console.log(secondaryDiv);

//appending video description ==================================

const playerDetail =document.getElementsByClassName("player-detail")[0];

async function fetchFullVideo(){


//======================FullHD Display Fetch============================================================    
    const url= `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    console.log(result);
//======================================================================================================


//=====================Fetching Suggestion Video========================================================
    const suggesturl = `${baseUrl}/search?key=${apiKey}&q=${inputValue}&part=snippet&maxResults=30`;
    const suggestresponse = await fetch(suggesturl,{method:"GET"});
    const suggestResult = await suggestresponse.json();
    const suggestedVideos = suggestResult.items;
//======================================================================================================

    const snippet= result.items[0].snippet;
    const statistics = result.items[0].statistics;
    const playerLink = `https://www.youtube.com/embed/${videoId}`;

//==============================channel details==========================================================
    const channelId=snippet.channelId
    const channelurl = `${baseUrl}/channels?key=${apiKey}&part=snippet,contentDetails,statistics&id=${channelId}`;
    const channelresponse = await fetch(channelurl,{method:"GET"});
    const channelresult = await channelresponse.json();

    // console.log(channelresult.items[0]);
    const channelsnippet = channelresult.items[0].snippet;
    const channelstatistics = channelresult.items[0].statistics;

    //===================================================================================================
    videoDiv.innerHTML=`
    <iframe width="100%" height="100%" src="${playerLink}" frameborder="0" allowfullscreen></iframe>

    `;

    //adding individually++++++++++++++++++++++++++++++++++++++++
    title.innerHTML=`<div>${snippet.title}</div>`;
    ChannelImage.src=`${channelsnippet.thumbnails.high.url}`;
    ChannelImage.id=`${channelId}`;
    videoChannelName.innerHTML=`${snippet.channelTitle}`;
    vchannelSubscriber.innerHTML=`${channelstatistics.subscriberCount} Subscribers`;
    videoLikes.innerHTML=`${statistics.likeCount}`;
    videoViews.innerHTML=`${statistics.viewCount} views`;
    postTime.innerHTML =`${snippet.publishedAt}`;
    vdesc.innerHTML=`${snippet.description}`;
    vComments.innerHTML=`${statistics.commentCount}`;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//*****************************************NOT OPEN*********************** */
    // const playDetail = document.createElement("div");
    // playDetail.className="play-detail";
    // playDetail.innerHTML=`
    //         <div class="video-title-like">
    //             <div class="title">
    //                 <div>${snippet.title}</div>
    //             </div>
    //             <div class="subscribe-like">
    //                 <div class="about-channel">
    //                     <div style=" display: flex;flex-direction: row;gap:15px">
    //                         <img src="${channelsnippet.thumbnails.high.url}" style="width: 47px;height: 47px;border-radius: 50%;">
    //                         <div style="padding-top: 3px;padding-bottom: 3px">
    //                             <div style="font-size:19px;font-weight: 400;margin-bottom: 1px;">${snippet.channelTitle}</div>
    //                             <div style="font-size: 13px;color:#717171">${channelstatistics.subscriberCount} subscribers</div>
    //                         </div>
    //                     </div>
    //                     <div style="margin-left: 10px;padding-left: 10px;padding-top: 2px;">
    //                         <div class="subscribe-button">
    //                             Subscribe
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="about-likes-share">
    //                     <div style="display: flex;flex-direction: row; gap:10px">
    //                         <div class="like-dislike">       
    //                             <span style="margin-right:10px;" >
    //                                 <img src="images/video/like.svg">
    //                                 ${statistics.likeCount}
    //                             </span>
    //                             <span style="border-left: 1px solid gray;padding:2px;padding-left: 10px;">
    //                                 <img src="images/video/dislike.svg">
    //                             </span>
    //                         </div>
    //                         <div class="like-share-button"> 
    //                             <span>
    //                                 <img src="images/video/share.svg">
    //                             </span>
    //                             <span>Share</span>
    //                         </div>
    //                         <div class="like-share-button"> 
    //                             <span> <img src="images/video/save.svg"></span>
    //                             <span>Save</span>
    //                         </div>
    //                         <div class="like-share-button" style="border-radius: 50%;padding: 10px 13px 10px 13px;"> 
    //                             <img src="images/video/dots.svg">
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>

    //         <div class="video-description">
    //             <div style="font-size: 18px;font-weight: 500;">
    //                 <span>${statistics.viewCount} views</span>
    //                 <span>1 year ago</span>
    //             </div>
    //             <div class="full-desciption">
    //                 <div style="font-size: 16px;font-weight: 500;">
    //                     ${snippet.description}
    //                 </div>
    //                 <div style="margin-top: 5px;">Show More</div>
    //             </div>
    //         </div>

    // `
    // playerDetail.appendChild(playDetail);
//*********************************************************************** */
//=========================================fetching suggested videos======================================================
    getSuggestedVideos(suggestedVideos);

//=========================================fetching suggested videos======================================================
}

fetchFullVideo();
// const secondaryDiv = document.getElementsByClassName("secondary")[0];
function getSuggestedVideos(suggestedVideos){
    suggestedVideos.forEach((video)=>{
        const {snippet} = video;
        const viewCount = getVideoDetail(video.id.videoId);
        console.log(video);
        console.log(video.id.videoId);
        viewCount.then((value)=>{
            const views=value;
        const otherVideoDiv = document.createElement("div");
        otherVideoDiv.innerHTML=`
            <div class="openVideo" id="${video.id.videoId}">
                <div><img src="${snippet.thumbnails.high.url}" style="height:125px;width:230px; border-radius: 15px;"></div>
            </div>
            <div style="display: flex;flex-direction: column;gap:4px;padding-top: 8px;">
                <div class="other-video-title"> ${snippet.title}</div>
                <div class="other-video-channel">${snippet.channelTitle}</div>
                <div class="other-video-channel">${views} views * 5 month ago</div>
            </div>
        `;
            secondaryDiv.appendChild(otherVideoDiv);
            otherVideoDiv.className="other-videos";

            const flexVideoItems = document.querySelectorAll(".other-videos");
            flexVideoItems.forEach(item=>{
            console.log("wait to click");
            item.addEventListener("click",openFullHDVideoInsideVideo);
        })

        })

    })

}

//get video views=============================================================================
async function getVideoDetail(videoId=`DHjqpvDnNGE`){
 
    let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const response = await fetch(url, {method: "GET"}); 
    const videoInfo = await response.json();
    console.log(videoInfo);
    return videoInfo.items[0].statistics.viewCount;
    // const channelDetails = await fetchChannelDetails(videoInfo.items[0].snippet.channelId);
    
}
//=============================================================================================

//==================fetching Comments==========================================================
async function getComments(){
    const nextPageToken = '';
    const maxResults=30;
    const commentUrl =`${baseUrl}/commentThreads?key=${apiKey}&part=snippet&videoId=${videoId}&maxResults=${maxResults}&pageToken=${nextPageToken}`;
    const commentResponse = await fetch(commentUrl,{method:"GET"});
    const commentResult = await commentResponse.json();
    console.log(commentResult);
    
    //add comment details============================
    addCommentsToVideo(commentResult.items)
}
//=============================================================================================
const allCommentDiv = document.getElementsByClassName("all-comments")[0];
getComments();

function addCommentsToVideo(comment){
    comment.forEach((comment)=>{
        const replyCount =  comment.snippet.totalReplyCount;

        const {snippet} =comment.snippet.topLevelComment;
        
        const singleCommentDiv = document.createElement("div");
        singleCommentDiv.innerHTML = `
            <div class="video-comment">
                <div class="commentProfile">
                    <img src="${snippet.authorProfileImageUrl}" style="width: 50px;height: 50px;border-radius: 50%;">
                </div>
                <div class="commentDetail">
                    <div class="profile-id" style="font-size: 17px;font-style: oblique;">
                        ${snippet.authorDisplayName}
                    </div>
                    <div class="full-comment" style="font-size: 18px;">
                        ${snippet.textDisplay}
                    </div>
                    <div class="comment-likes">
                        <div><img src="images/video/like.svg"></div>
                        <div>${snippet.likeCount}</div>
                        <div><img src="images/video/dislike.svg"></div>
                        <div class="select-reply">Reply</div>
                    </div>
                </div>
                <div class="menu">
                    <img src="images/video/dots.svg">
                </div>
            </div>
            <div style="padding-top: 10px;padding-left: 80px;">
                <span style="display: none;">replies of somes one</span>
                <span class="replies">
                    <span><img src="images/sidebar/show more.svg"></span>
                    <span> &nbsp ${replyCount}&nbsp Replies</span>
                </span>
            </div>
        `;
        allCommentDiv.appendChild(singleCommentDiv);
        singleCommentDiv.className="single-comment";
        singleCommentDiv.style.borderBottom = "rgba(114, 112, 112, 0.363)";
    })
}



ChannelImage.addEventListener("click",openChannelDetails);

function openChannelDetails(event){
    channelId =event.currentTarget.id;
    sessionStorage.setItem('singleChannelId',channelId);
    window.location.href="channel.html";

}

function openFullHDVideoInsideVideo(event){
    console.log("clicked");
    // if(sessionStorage.getItem('suggestString')===""){
    //     const suggestString=sessionStorage.getItem('suggestString');
    //     sessionStorage.setItem('suggestString',suggestString);
    //     console.log(suggestString);


    // }else{
        const suggestString=document.querySelector("#search").value;
        sessionStorage.setItem('suggestString',suggestString);
        console.log(suggestString);

    // }
    console.log(event.currentTarget);
    const flexopen = event.currentTarget;
    const singleVideoId = flexopen.querySelector(".openVideo").id;
    // console.log(videoId);
    sessionStorage.setItem('singleVideoId',singleVideoId);
    window.location.href="video.html";
}