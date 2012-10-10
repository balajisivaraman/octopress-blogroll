/**
 * Blogroll for Octopress
 * Created By: Balaji Sivaraman (sivaraman.balaji@gmail.com)
 * =========================================================
 * 
 * Description:
 * ------------
 * This plugin is completely inspired by the famous WP Social Blogroll (http://www.weinschenker.name/plugin-feed-reading-blogroll/) plugin for Wordpress.
 * With this plugin, I've completely imitated that brilliant plugin which I'd been using for a long time.
 * Like the original plugin, I've made use of the Google Feeds API (https://developers.google.com/feed/) to retrieve the latest updated item for updating the DOM.
 * The plugin also makes extensive use of JQuery for all DOM updates.
 * Plus, in another lift from WP Social Blogroll, this plugin uses the TinySort jQuery plugin (http://tinysort.sjeiti.com/) for sorting the list items based on age.
 * 
 * Licence:
 * --------
 * Distributed under the [GNU General Public License].
 * 
 * [GPL]: http://www.gnu.org/licenses/gpl.html
 */

var isSortEnabled = false;

/**
 * Retrieves the <li> blog elements, identifies the feed URL and calls the feed update method for each one.
 */
function updateFeeds(isSort) {
    isSortEnabled = isSort;
    var bloglist = $("#blogroll-list").children();
    $.each(bloglist, function(index, value) {
	getLatestFeed($(this).find(':only-child').attr('feedurl'));
    });
}

/**
 * Takes as parameter the feed URL and uses Google Feeds API to retrieve the most recent update from the feed
 * and calls the method to append the content to the DOM.
 */
function getLatestFeed(feedUrl) {
    var feed = new google.feeds.Feed(feedUrl);
    feed.setNumEntries(1);
    feed.load(function(result) {
	if(!result.error) {
	    addContent(result.feed);
	}
    });
}

/**
 * Takes as parameter the retrieved feed and uses its contents to generate the HTML and append it to the parent <li> element.
 */
function addContent(feed) {
    var bloghtml = '';
    var entry = feed.entries[0];
    if(entry != null || entry != undefined) {
	var itemName = 'a[feedurl="'+feed.feedUrl+'"]';
	var date = new Date(Date.parse(entry.publishedDate));
	$(itemName).parent().attr('age',date.getTime());
	bloghtml = bloghtml.concat("<div style='display:block'><p style='font-weight:bold'><a href='"+entry.link+"' title='"+entry.contentSnippet+"'>");
	bloghtml = bloghtml.concat(entry.title+"</a><br /><abbr title='last change' style='font-weight:normal;cursor: pointer;'>"+getTimeDifference(date)+"</abbr></p></div>");
	$(itemName).after(bloghtml);
        if(isSortEnabled)
            $('ul#blogroll-list>li').tsort({order:'desc',attr:'age'});
    }
}

/**
 * Takes as parameter the feed updated time and finds the time difference to display in the sidebar.
 */
function getTimeDifference(date) {
    var today = new Date();
    var timeUnit = 1000*60*60;
    var difference = (today.getTime()/timeUnit) - (date.getTime()/timeUnit);
    var difference = Math.round(difference);
    var value;
    if(difference < 2) {
	value = "just recently";
    }
    else if(difference < 24) {
	value = difference+" hrs ago";
    } else {
	var days = Math.round(difference/24);
	if (days < 2) {
	    value = "yesterday";
	} else {
	    value = days + " days ago";
	}
    }
    return value;
}
