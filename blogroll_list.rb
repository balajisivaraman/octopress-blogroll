# Blogroll for Octopress
# Created By: Balaji Sivaraman (sivaraman.balaji@gmail.com)
# =========================================================
# 
# Description:
# ------------
# This plugin will read a list of YAML files containing details of your daily blogroll and output <li> tags for use in your sidebar.
# The YAML file itself must be placed in a _blogroll folder, which can be in any hierarchy inside your blog's source directory. 
# All the files inside the _blogroll folder will be parsed.
# 
# Syntax for YAML file:
# ---------------------
# name: Blogname
# url: http://www.blogurl.com/
# feedurl: http://www.blogurl.com/atom.xml
# description: Blog Description
# 
# Licence:
# --------
# Distributed under the [GNU General Public License].
# 
# [GPL]: http://www.gnu.org/licenses/gpl.html
#
module Jekyll
  
  class BlogrollList < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
    end

    def render(context)
      source = context.registers[:site].source
      bloglist = getBlogroll(source)
      html = ''
      bloglist.sort! { |blog1,blog2| blog1["name"].downcase <=> blog2["name"].downcase }
      bloglist.each do |blog|
        html << "<li><a href='#{blog["url"]}' feedurl='#{blog["feedurl"]}' title = '#{blog["description"]}'>#{blog["name"]}</a></li>"
      end
      html
    end

    def getBlogroll(source)
      bloglist = Array.new
      Dir["#{source}/**/_blogroll/**/*"].sort.each do |blog|
        next unless File.file?(blog) and File.readable?(blog)
        yaml_data = Hash.new()
        yaml_data = YAML::load_file(blog)
        bloglist << yaml_data
      end
      bloglist
    end

  end
  
end

Liquid::Template.register_tag('blogroll_list', Jekyll::BlogrollList)
