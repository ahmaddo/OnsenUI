var targetUrl = null;
var apiUrl = null;
var appName = null;

$.get('config/config.json').done(function (config) {
    targetUrl = config.api_post_url + config.number_of_posts;
    apiUrl = config.api_url;
    appName = config.name;
    startApp()
});

function startApp() {
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

        $("#app-page .content")
            .append('        <ons-card onclick="openPost(\'' + post._links.self[0].href + '\', \'' + featuredImgSrc +'\')">\n' +
                '          <img class="listingFeaturedImage" src="'+ featuredImgSrc + '" alt="Onsen UI" style="width: 100%">\n' +
                '          <div class="title">\n' +
                post.title.rendered +
                '          </div>\n' +
                '<div class="publish-date">' +
                post.date.substr(0, 10) +
                '</div>' +
                '        </ons-card>');
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