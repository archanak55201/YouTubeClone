// const baseUrl = `https://www.googleapis.com/youtube/v3`;
// const apiKey = `AIzaSyBh8h1bK9Gmdo-XTdXg4q4T8mLLUgcPsJw`;




const profileImage = document.getElementById("profileImage");
const channelName = document.getElementsByClassName("channelName")[0];
const channelViews = document.getElementsByClassName("channelViews")[0];

const chflexContainer = document.getElementsByClassName("flex-video-container")[0];
//channel id-----------------------------------
const singleChannelId = sessionStorage.getItem('singleChannelId');
const ChannelId=singleChannelId;


async function channelDetails(){
    // const channelId=`UCsBjURrPoezykLs9EqgamOA`;
    const channelurl = `${baseUrl}/channels?key=${apiKey}&part=snippet,contentDetails,statistics&id=${ChannelId}`;
    const channelresponse = await fetch(channelurl,{method:"GET"});
    const channelresult = await channelresponse.json();

    console.log(channelresult.items[0]);
    const channelsnippet = channelresult.items[0].snippet;
    const channelstatistics = channelresult.items[0].statistics;
    console.log(channelsnippet.thumbnails.high.url);
    const ImageTag = document.createElement("div");
    ImageTag.innerHTML = `
    <img src="${channelsnippet.thumbnails.high.url}" style="border-radius: 50%;width: 140px;height: 140px;">
                                         
    `;
    profileImage.appendChild(ImageTag);
    channelName.innerHTML=`${channelsnippet.localized.title}`;
    channelViews.innerHTML=`
    <span>${channelsnippet.customUrl}</span><span>${channelstatistics.subscriberCount} subscribers</span><span>${channelstatistics.videoCount}  videos</span>
                                             
    `;

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^fetch channel videos^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const maxResults=20;
    const videosApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&channelId=${ChannelId}&maxResults=${maxResults}`;
    const chVideoResponse = await fetch(videosApiUrl,{method:"GET"});
    const chVideoResult = await chVideoResponse.json();
    console.log(chVideoResult.items);
    const videos=chVideoResult.items;
    videos.forEach(video=>{
        videoId = video.id.videoId;
        const {snippet}=video;

        const chflexItem = document.createElement("div");
        chflexItem.innerHTML=`
            <div class="other-videos" style="padding: 0px;">
                <div>
                    <div><img src="${snippet.thumbnails.high.url}" style="height:140px;width:250px; border-radius: 15px;"></div>
                </div>
                <div style="display: flex;flex-direction: column;gap:4px;padding-top: 8px;">
                    <div class="other-video-title">${snippet.title}</div>
                    <div class="other-video-channel">${snippet.channelTitle}</div>
                    <div class="other-video-channel">23M views * ${snippet.publishTime}</div>
                </div>
            </div>
        `;
        chflexContainer.appendChild(chflexItem);
        chflexItem.className="flex-video-item";
    })

};

channelDetails();