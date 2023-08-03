const profileImage = document.getElementById("profileImage");
const channelName = document.getElementsByClassName("channelName")[0];
const channelViews = document.getElementsByClassName("channelViews")[0];



async function channelDetails(){
    const channelId=`UCsBjURrPoezykLs9EqgamOA`;
    const channelurl = `${baseUrl}/channels?key=${apiKey}&part=snippet,contentDetails,statistics&id=${channelId}`;
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
                                             
    `
}

channelDetails();