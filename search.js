// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyBEVa8Ja8u3swkP-pr_XbCVn3M3B-iUYmQ');
    gapi.client.load("youtube", "v3", function() {
       // yt api is ready
   });

}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        type: 'video'
    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(function(response) {
             var results = response.result;
             $("#results").html("");
             $.each(results.items, function(index, item) {
               $.get("item.html", function(data) {
                   $("#results").append(ytpl(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
               });
             });
          });
        });

})

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}
function ytpl(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
