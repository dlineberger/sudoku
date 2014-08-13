# Sudoku


## Technologies

My first inclination was to leverage AngularJS, since using an MVC framework such as Angular would help create a clean, modular, easy-to-understand code base. Since we were advised against using such frameworks, I decided to create what I imagined would be the next best thing: a jQuery plugin. I had never created a jQuery plugin before, so there was a bit of a learning process involved. I tried to make the code as modular as the plugin architecture would allow. I also used Sass for styling, but other than that, everything was coded by hand.

I wanted to go for a clean design of the puzzle, as if the puzzle was printed in a newspaper. I think that too much styling and color might be distracting for a regular sudoku player. However, I readily admit that I am not a graphic artist, and graphic design is not my strongest feature.

I made sure that keyboard navigation using the arrow keys and number keys worked, as more advanced users would prefer to use keys instead of the mouse while in a desktop browser.

I verified that the page rendered correctly in Safari, Chrome, and IE11, as well as Safari on my iPhone 5S, as well as Chrome on a Samsung Galaxy S.

## Improvements

If more time was allowed, I would have liked to add the following features:

* True support for more than one <div class="sudoku"> in the document like a good jQuery plugin should
* Prevent background from being clicked while modal open
* Highlighting matching numbers when cell focused.
* Support for selecting multiple candidate numbers in the number chooser popup
* Better number chooser popup styling
* A 'Clear' button on the number chooser popup
* Sudoku puzzle generator
* Print Media Query to hide header on print
