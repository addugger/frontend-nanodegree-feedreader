/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
    	it('have urls', function() {
    		for (i = 0; i < allFeeds.length; i++)
            {
	    		var url = allFeeds[i].url;
	    		expect(url).toBeDefined();
	    		expect(url).not.toBe("");
            }
    	});


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    	it('have names', function() {
    		for (i = 0; i < allFeeds.length; i++)
            {
	    		var url = allFeeds[i].name;
	    		expect(url).toBeDefined();
	    		expect(url).not.toBe("");
            }
    	});
    });


    /* Test suite for the menu functionality */
    describe("The menu", function() {

        /* Test that ensures the menu element is
         * hidden by default. (i.e., the body starts
         * with the class menu-hidden.
         */
    	it('starts hidden', function() {
    		expect($("body").hasClass("menu-hidden")).toBe(true);
    	});

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked by triggering
          * click events on the menu-icon-link
          */
    	it('shows and hides', function() {
    		var menuIcon = $('.menu-icon-link');
    		menuIcon.trigger("click");
    		expect($("body").hasClass("menu-hidden")).not.toBe(true);
    		menuIcon.trigger("click");
    		expect($("body").hasClass("menu-hidden")).toBe(true);
    	});
    });

    /* Test suite to check initial entries */
    describe('Initial Entries', function() {

    	/* beforeEach will call the loadFeed()
    	 * function, and pass an anonymous function calling done() as the
    	 * callback.  This call to done() will signal the test that it can
    	 * run.
    	 */
    	beforeEach(function(done) {
    		loadFeed(0, function() {done();});
    	});
    	
    	/*
    	 * Checks that there is at least 1 entry-link after loadFeed()
    	 * runs.
    	 */
    	it('have at least 1 entry', function() {
    		expect($(".feed .entry-link").size()).toBeGreaterThan(0);
    	});
    });

    /* Test suite to check new feed load behavior */
    describe('New Feed Selection', function() {
    	var initialFeedHtml;
    	var newFeedHtml;
    	
    	/* beforeEach loads the first feed, saves the html, and
    	 * then loads the second feed and saves the html in a
    	 * separate variable.
    	 */
    	beforeEach(function(done) {
    		loadFeed(0, function() {
    			initialFeedHtml = $(".feed").html();
    			loadFeed(1, function() {
    				newFeedHtml = $(".feed").html();
    				done();
    			});
    		});	
    	});
    	
    	/*
    	 * checks that the two feed html strings from the
    	 * two different feeds have different content.
    	 */
    	it('changes content', function() {
    		expect(initialFeedHtml).not.toBe(newFeedHtml);
    	});
    });
    
}());
