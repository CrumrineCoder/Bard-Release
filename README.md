# Bardic Inspiration
 
User Stories to work on:
* Need a way to be "casual" with it; eg. a list to just play in the bg without thinking about every song.

Currently: 
* Breaking apart Post.js so I can more easily edit it

Features to Add:
* Song-boards
* Chrome Add-On to add a song from a Youtube page and tag it
* Break tags into Instruments, Mood, Speed, and Use in Game
* Good tracks don't have prevalence
* Longer BG music for stock stuff - playlist support
* No user playlists
* No community help
* Message functionality for when the user posts the same links, 403s, etc.
* Random Sorting
* Mini mode to just show TAGS, and you can open to see the video and comments on a button press.
* Change volume controls, or make the youtube video at the top and larger. 
* Audio player fixed position?
* Update messages, X messages found!
* Blacklist songs for yourself
* Search for songs
* Filter tags
* BPM
* Source list or something; autocomplete. 
* Call the backend for only the visible, not every single song. 
* Profile. 
* About & Credits page
* Tag upvotes? 
* Reset password
* Admin accounts
* Recommended Tags

Improvements:
* Don't reload all posts when updating one
* Iterations - tag a song as Final Fantasy 8 or 7, or Silent Hill 1, or 2 etc.
* Handle non-Youtube links (like soundcloud)
* Only get tags when needed, don't get all at once.
* Loading screens
* Highlight tags that are being searched for
* Sort tags by popularity
* Formatting issue of songs. 
* Drafts/unlisted playlists for broken links. 
* SCSS cleanup
* Check if video is valid 
* Break down Post component
* Check sources doesn't need to call the backend everytime. 
* Responsive
* Video game OST vs songs
* all tags should be checked in lowercase, even if written in upper.
* Don't clear sources when searching for a tag

Bugs:
* Entering "winter\" breaks the textbox when adding a tag because of regular expressions
* 404
* Whimsical has no results but returns everything
* Fix success inconsistency in header, need to sort out the response and redux structure

**DONE!!**
* Show all Tags mode 
* Stop site from logging out user automtatically after 1 hr. 
* Close autocomplete 
* Scroll speed, if it would take too long just go faster. 
* bug w/ endless scroll on scrolling to bottom of another page 
* Bug: Multiple comments, edit one. 
* Move cards back to vertical but make smaller, cut excess and make two table
* Make home and music page the same thing with parallex z indes scrolling. 
* Infinite scroll 
* Bug with reaching end of infinite scroll 
* Default instead of youtube iframe with a generated preview? 
* Optimization, getting all tags for each post probably isn't good. Might want to move to its own component. 
* copy link with button 
* number of notes on Notes tab
* Search by bad tag should return nothing. 
* bug w/ multi tag indexing for one result?
* Fix overlay for when the user is posting a new song, it shouldn't fire and shouldn't allow clicking behind it. 
* Autocomplete add tag should include Words document 
* Comment formatting & turn into notes
* Improve Search from Home page 
* Search bar in nav 
* Ellipis logout, and post song in nav.
* Sticky Nav 
* Multi-tag indexing 
* Too many of the same tag / similar tags (categories) 
* Users can check tags 
* Have to open YT links in new tabs (add embed video player) 
* Break up dashboard & its reducer. 
* Delete & edit tags & posts 
* Tag bubbles 
* Close all songs that are playing when the user searches. 
* Register User message issue 
* Home Page 
* Button styling 
* Login modal 
* Allow users to go to catalog, but they have to login to use some features 
* Home page search 
* Check if the user is logged in for the catalog and show the right stuff. 
* Readd Words counter functionality 
* If no results are returned by the search, tell the user instead of showing them results they don't want. 
* Empty comment / tag message Be the first to commment/tag!
* Figure out color scheme
* No record keeping of actual use in games 
* No division between tags, descriptors, places to use it, where they were used, and categories of tags *for now*
* No ex/including OSTs *no excluding yet*
* Autocomplete tags & sources 
* Sorting *for now* [Can do more later tho, this is just reversing it, but maybe by amount of tags?]
* Why is the sorting reversed when the user searches? 
* Routing Issue, 404 on refresh *
* Bug with updating the posts - the newest one plays the video. hotfixed by reloading all posts when a new one is added.  *Not the best fix*
* Filter general tags 
* Get suggested tags
* Hide / progressively(infinite) comments
* Logout 
* Show Categorical tags 
* Register message is wrong 
* D&D aesthetic *in progress*
* Make the tags the top priority, not the song 
* Sort out the response system *for now*
* There are No Tags Yet bug when searching for 'Western' in general tab 
* Inclusive vs Exclusive tag search 
* Inclusive & Exclusive "Apply" and "Clear" buttons *Irrelevant*
* Kill server on change, getting eardarinuse 8080 
* Autocomplete on homepage 
* No updating YT links / getting extended versions *updating YT links is done!*