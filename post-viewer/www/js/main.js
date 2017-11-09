
/**
 * Created by Ark on 16.04.2017.
 */

var numberOfPosts = 1;
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
    for(post in response) {
        addPostToPage(response[post]);
    }
    hideLoader();
}

function addPostToPage(post) {
    var apiPostFeatureLink = apiUrl + '/media/' + post.featured_media;
    $.get(apiPostFeatureLink).done(function (featureImageResponse) {
        var featuredImgSrc = featureImageResponse.guid.rendered.substr(0, featureImageResponse.guid.rendered.length -4) + '-150x150.jpg';
        var postLink = post._links.self[0].href;
        var postOpenFunction = 'openPost(\'' + postLink + '\', \'' + featuredImgSrc + '\')';

        var listItemHtmlCode =  '<li class="list-item" onclick="' + postOpenFunction + ';">' +
            '<div class="list-item__right">' +
            '<img class="list-item__thumbnail listingFeaturedImage" src="' + featuredImgSrc + '"> ' +
            '</div> ' +

            '<div class="list-item__left"> ' +
            '<div class="list-item__title">' +
            post.title.rendered +
            '</div> ' +
            '<div class="list-item__subtitle">'+
            post.date.substr(0, 10)  +
            '</div> ' +
            '</div> ' +
            '</li>';

        $("#app-page .list")
        .append(listItemHtmlCode);
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
        var postTitle = post.title.rendered;
        var postLink = post.link;
        var postContent = post.content.rendered;
        $("#post-page .content")
            .append('<div class="featured-image-container"><img class="post-featured-image" src="' + featuredImgSrc + '"></div>')
            .append('<h3>' + postTitle + '</h3>')
            .append(postContent)
            //.append('<a href="#" onclick="share(\'' + postLink + '\', \'' + postTitle + '\');">share</a>')
            .append('<ons-speed-dial position="bottom right" direction="up">            <ons-fab>            <ons-icon icon="md-share" onclick="share(\'' + postLink + '\', \'' + postTitle + '\');"></ons-icon></ons-fab></ons-speed-dial>');    });
}

function share(text, title) {
    navigator.share(text,title,'plain/text');
    return true;
}

$(document).ready(function (){
    $('.scrollable').pullToRefresh()
        .on("end.pulltorefresh", function (evt){
            location.reload();
        });
});
window.fn = {};

window.fn.open = function() {
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function(page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
        .then(menu.close.bind(menu));
};

startApp();
