var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

function init() {
    loadFeed(0);
}

 function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name;

    $.ajax({
        type: "POST",
        url: 'https://rsstojson.udacity.com/parseFeed',
        data: JSON.stringify({url: feedUrl}),
        contentType:"application/json",
        success: function (result, status){

            var container = $('.feed'),
            title = $('.header-title'),
            entries = result.feed.entries,
            entriesLen = entries.length,
            entryTemplate = Handlebars.compile($('.tpl-entry').html());

            title.html(feedName);
            container.empty();

            entries.forEach(function(entry) {
                container.append(entryTemplate(entry));
            });

            if (cb) {
                cb();
            }
        },

        error: function (result, status, err){
            if (cb) {
                cb();
            }
        },
    dataType: "json"
    });
}

google.setOnLoadCallback(init);

$(function() {
    var container = $('.feed'),
    
    feedList = $('.feed-list'),
    feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
    feedId = 0,
    body = document.body,
    menuIcon = $('.menu-icon-link');

    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}());
