const baseUrl = `https://www.googleapis.com/youtube/v3`;
// const apiKey = `AIzaSyBh8h1bK9Gmdo-XTdXg4q4T8mLLUgcPsJw`;//archana
const apiKey =`AIzaSyCdopOmumoijAacpleFFNOszQRI_e2BeJE`;


const videoDiv = document.getElementsByClassName("video-player")[0];
// console.log(videoDiv);

const singleVideoId = sessionStorage.getItem('singleVideoId');
const videoId=singleVideoId;
//appending video description ==================================

const playerDetail =document.getElementsByClassName("player-detail")[0];

async function fetchFullVideo(){
    // const videoId=`hKB-YGF14SY`;
    const url= `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    // console.log(result.items[0]);
    const snippet= result.items[0].snippet;
    // console.log(snippet);
    const statistics = result.items[0].statistics;
    // console.log(statistics);
    const playerLink = `https://www.youtube.com/embed/${videoId}`;
    // console.log(playerLink);

    //channel details====================================================================================
    const channelId=snippet.channelId
    const channelurl = `${baseUrl}/channels?key=${apiKey}&part=snippet,contentDetails,statistics&id=${channelId}`;
    const channelresponse = await fetch(channelurl,{method:"GET"});
    const channelresult = await channelresponse.json();

    console.log(channelresult.items[0]);
    const channelsnippet = channelresult.items[0].snippet;
    const channelstatistics = channelresult.items[0].statistics;

    //===================================================================================================
    videoDiv.innerHTML=`
    <iframe width="100%" height="100%" src="${playerLink}" frameborder="0" allowfullscreen></iframe>

    `

    const playDetail = document.createElement("div");
    playDetail.className="play-detail";
    playDetail.innerHTML=`
            <div class="video-title-like">
                <div class="title">
                    <div>${snippet.title}</div>
                </div>
                <div class="subscribe-like">
                    <div class="about-channel">
                        <div style=" display: flex;flex-direction: row;gap:15px">
                            <img src="${channelsnippet.thumbnails.high.url}" style="width: 47px;height: 47px;border-radius: 50%;">
                            <div style="padding-top: 3px;padding-bottom: 3px">
                                <div style="font-size:19px;font-weight: 400;margin-bottom: 1px;">${snippet.channelTitle}</div>
                                <div style="font-size: 13px;color:#717171">${channelstatistics.subscriberCount} subscribers</div>
                            </div>
                        </div>
                        <div style="margin-left: 10px;padding-left: 10px;padding-top: 2px;">
                            <div class="subscribe-button">
                                Subscribe
                            </div>
                        </div>
                    </div>
                    <div class="about-likes-share">
                        <div style="display: flex;flex-direction: row; gap:10px">
                            <div class="like-dislike">       
                                <span style="margin-right:10px;" >
                                    <img src="images/video/like.svg">
                                    ${statistics.likeCount}
                                </span>
                                <span style="border-left: 1px solid gray;padding:2px;padding-left: 10px;">
                                    <img src="images/video/dislike.svg">
                                </span>
                            </div>
                            <div class="like-share-button"> 
                                <span>
                                    <img src="images/video/share.svg">
                                </span>
                                <span>Share</span>
                            </div>
                            <div class="like-share-button"> 
                                <span> <img src="images/video/save.svg"></span>
                                <span>Save</span>
                            </div>
                            <div class="like-share-button" style="border-radius: 50%;padding: 10px 13px 10px 13px;"> 
                                <img src="images/video/dots.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="video-description">
                <div style="font-size: 18px;font-weight: 500;">
                    <span>${statistics.viewCount} views</span>
                    <span>1 year ago</span>
                </div>
                <div class="full-desciption">
                    <div style="font-size: 16px;font-weight: 500;">
                        ${snippet.description}
                    </div>
                    <div style="margin-top: 5px;">Show More</div>
                </div>
            </div>

    `
    playerDetail.appendChild(playDetail);
}
fetchFullVideo();