
/**
 * Created by Ark on 16.04.2017.
 */
(function(){


var numberOfPosts = 10;
var targetUrl = "http://www.welat.fm/wp-json/wp/v2/posts?orderby=date&per_page=" + numberOfPosts;
var apiUrl = "http://www.welat.fm/wp-json/wp/v2";
var appName = "Welat FM";

function startApp() {
    setAppName();
    $.get(targetUrl).done(
        function (response) {
            setAppName();
            responsePostActions(response);
        }
    );
}

function setAppName() {
    $('.toolbar__center').text(appName);
}

function responsePostActions(response) {
    hideLoader();
    for(post in response) {
        addPostToPage(response[post]);
    }
}

function addPostToPage(post) {
    var apiPostFeatureLink = apiUrl + '/media/' + post.featured_media;
    $.get(apiPostFeatureLink).done(function (featureImageResponse) {
        var featuredImgSrc = featureImageResponse.guid.rendered.substr(0, featureImageResponse.guid.rendered.length -4) + '-150x150.jpg';

        $("#app-page .list")
        .append(
            '<li class="list-item onclick="openPost(\'' + post._links.self[0].href + '\', \'' + featuredImgSrc + '\')">' +
                   ' <div class="list-item__right">' +
                        ' <img class="list-item__thumbnail listingFeaturedImage" src="' + featuredImgSrc + '"> ' +
                        ' </div> ' +

                        ' <div class="list-item__left"> ' +
                        ' <div class="list-item__title">' +
                            post.title.rendered +
                        '</div> ' +
                        ' <div class="list-item__subtitle">'+ post.date.substr(0, 10)  + '</div> ' +
                    ' </div> ' +
            ' </li>');
    })
}

function hideLoader() {
    $('#ajax-loader').hide();
}

function openPost(postLink, featuredImgSrc) {
    $("#ajax-loader").show();
    $('#app-page').prepend('<div style="height: 100%; width: 100%; background: black; position: absolute; top: 0;"></div>');
    $.get(postLink).done(
        function (post) {
            $("#ajax-loader").hide();
            openPostPage(post, featuredImgSrc);
        }
    );
}

function openPostPage(post, featuredImgSrc) {
    document.querySelector('#navigator').pushPage('post.html').then(function () {
        featuredImgSrc = featuredImgSrc.substr(0, featuredImgSrc.length -11) + '279x220.jpg';
        $("#post-ajax-loader").hide();

        $("#post-page .content")
            .append('<div class="featured-image-container"><img class="post-featured-image" src="' + featuredImgSrc + '"></img></div>')
            .append('<h3>' + post.title.rendered + '</h3>')
            .append(post.content.rendered)
            .append('<a href="' + post.link + '">أفتح الموقع</a>');
    })
}

startApp();
})();
