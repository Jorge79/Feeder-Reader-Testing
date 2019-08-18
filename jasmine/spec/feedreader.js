$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL defined and that the URL is not empty', () => {
            allFeeds.forEach((item) => {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe(0);
            })
        });

        it('name defined and that the name is not empty', () => {
            allFeeds.forEach((item) => {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe(0);
            })
        });
    });

    describe('The Menu', function () {
        it('element is hidden by default', () => {
            let menu = document.body.classList.contains("menu-hidden");
            expect(menu).toBe(true); 
        })

        it('is clicked', () => {
            let menuClick = document.querySelector("a.menu-icon-link");
            menuClick.click();
            expect(document.body.classList.contains("menu-hidden")).toBe(false);
            menuClick.click();
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        })
    })

    describe('Initial entries', function() {
        beforeEach(function(done){
            loadFeed(1,done);
        });

        it('in feed container', function() {
            let feedContainer = document.querySelector('div.feed');
            let entries = feedContainer.querySelector('div.feed');
            expect(feedContainer.children.length).not.toBe(0);
        })
    })

    describe('New Feed Selection', function() {
        let feed1, feed2;

        beforeEach(function(done){
            loadFeed(3, function() {
                feed1 = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function() {
                    feed2 = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });

        it('loads feeds', function() {
            expect(feed1).not.toBe(feed2);
        });
    });
}());