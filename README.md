# Octopress Blogroll

Before Octopres, there was [Wordpress](http://http://wordpress.com/) and one of my favorite plugins for that was [WP Social Blogroll](http://www.weinschenker.name/plugin-feed-reading-blogroll/), which took all the blogs in your list and their RSS Feed URLs and displayed when they were last updated on your sidebar. It made my daily perusal of the blogs I read that much easier.

When I made the switch to Octopress, I definitely missed that plugin, or the ability to easily generate a blogroll in general. One way of doing this would be to add a custom aside HTML file with all the links you regularly peruse, but this would require adding a lot of HTML and there's no easy way to do it as well. This is when I set out to port WP Social Blogroll for Octopress.

With this plugin, the only thing required of you would be to add a bunch of YAML files containing a bunch of details on blogs you read into a folder, and hopefully, it will do the rest of the work for you to generate lean, mean HTML for use in your sidebar.

## Quick Start (or "what are all these files for?")

1. Put the `blogroll_list.rb` file in the `_plugins` directory of your Octopress site.

1. Copy the contents of the `_config.yml` and paste it at the bottom (or anywhere) of your `_config.yml` file in your Octopress root folder.

1. Copy `javascripts/blogroll.js` and `javascripts/tinysort-min.js` into the `source/javascripts` directory of your Octopress blog.

1. Copy `_includes/blogroll_list.html` into the `source/asides` or `source/custom/asides` directory of your Octopress blog.

1. Copy the contents of `_includes/head.html` into the `source/head.html` or `source/custom/head.html` file of your Octopress blog.

1. Add `blogroll_list.html` into your sidebar configuration through `_config.yml`.

1. Create a `_blogroll` folder somewhere in your `source` directory and place all the blog YAML files in there and enjoy an easy-to-use blogroll.

## Technical details

With Octopress being a *"static"* blogging platform, I wanted to minimize the amount of *"dynamic"* work this plugin does. The original **WP Social Blogroll** provided lots of opportunities for customization whilst I've just added a few variables as described in the `_config.yml` file for use in the plugin. They control whether the ability to retrieve latest feeds is enabled and whether dynamic sorting of links based on last update time is enabled. Please read the `_config.yml` for more details one each variable.

To use *Octpress Blogroll*, you need to have a list of blogs. These should be placed as separate YAML files in a directory called `_blogroll`.  The `_blogroll` directory can be anywhere in your site tree (I put it alongside my `_posts`
directory).  The files containing blog details can be named anything you like --every single file within the `_blogroll` directory will be read and parsed as a blog.

Each file in `_blogroll` represents a single blog, as a YAML hash. The YAML file itself needs to contain the following information for the plugin to parse it properly: *name* and *url*. The *feedurl* and *description* variables are additional information without which the plugin will still work. Note that if you want feeds to be updated then a proper RSS/Atom feed URL must be provided. Please verify the `sampleblog.yaml` file if you are in doubt.

Once all the files have been parsed, the blogs are displayed in ascending order of blog name by default. This is the behaviour for now, but I hope to add the ability to sort by other parameters soon enough.

Each time any page is loaded, the latest updated feed for each of the blogs in your roll is retrieved and used to frame HTML that is then appended to your sidebar. Once this is done, the brilliant [Tinysort jQuery](http://tinysort.sjeiti.com/) plugin is used to sort the blogs in the list based on last update time.

## Too much dynamic code?

If you think retrieving the feed and sorting the blog list is too much dynamic work, you can disable all that and use the plugin purely to generate a static sidebar that might be sufficient enough for your purposes.

## Thank You

All the credit for this plugin goes to the original creators of the wonderful [WP Social Blogroll](http://www.weinschenker.name/plugin-feed-reading-blogroll/) plugin. All I had to do was understand what they had done and replicate it for Octopress. I even used the same plugins they used to achieve the job.

## Misc Info and Known Issues

I've tested this plugin with the latest versions of Chrome, Firefox and IE across multiple browsers, and it has worked flawlessly. Make sure javascript is enabled and all the proper rights have been given.

One known issue with the plugin is that it sometimes doesn't sort automatically in certain browsers. A force-refresh/cache-clearing should fix this almost all the time.

## Licencing, bug reports, patches, etc

This plugin is licenced under the terms of the [GNU GPL version 3](http://www.gnu.org/licenses/gpl-3.0.html).  If it works for you, great to know I've been of some help. If it doesn't, please [e-mail me](mailto:sivaraman.balajI@gmail.com) with a description of the bug. If you want to make changes and enhancements to the plugin, please feel free to do so, but please do give credit to all the original thinkers of the plugin.
