# gdPhotoSlider v1.0.0

A simple photo viewer that allows the photos to be grouped into albums.

# Dependencies

1. jQuery v3.3.1 - for DOM manipulation and animations
2. Bootstrap v4.1.3 - for some layout assistance
3. FontAwesome v5.3.1 - for buttons, etc.
4. mobile-detect v1.4.3 - for use indetermining if a mobile device is bein used

# Album structure

An "albums" folder must exist at the root level. The recommended/suggested structure is:

albums
|
|-- 01. Album A
|  |-- photos (contains fulle-size jpg, bmp, png, tif files)
|  |-- thumbs (contains thumbnails of photo files)
|
|-- 02. Album B
   |-- photos (contains full-size jpg, bmp, png, tif files)
   |-- thumbs (contains thumbnails of photo files)  
|
|-- etc. 

# User setup features

Four variables can be set by the user. This is done using data parameters attached to the body element as follows:

<body data-photodir="photos" data-thumbdir="thumbs" data-loaddelay="1" data-viewdelay="5">

data-photodir: used to set the name of the folder (relative to each album) containing the full-sized photos
data-thumbdir: used to set the name of the folder (relative to each album) containing the thumbnails
data-loaddelay: contains the number of seconds the load bar will display before the photo anumation commences
data-viewdelay: contains the number of seconds a photo is displayed before the next photo is loaded when auto-play has been activated

# Controls

Album Selection:                    a dropdown selector to choose the album
Play button:                        click to activate auto-play from the current photo (initial state - enabled)
Stop button:                        click to stop auto-play (initial state - disabled) 
Gallery Display - Grid:             click to display thumbnails in a grid format (initial state - enabled)
Gallery Display - Column (default): click to display the thumbnails in a column format (initial state - hidden)
Hide Gallery:                       click to hide the gallery column (initial state - enabled)
Show Gallery:                       click to shoe the gallery column (initial state - hidden)
Previous button:                    click to show the photo alphabetically prior to the current photo (will loop to the end from the first photo)
Next button:                        click to show the photo alphabetically after the current photo (will loop to the beginning from the last photo)

# License

MIT-License (see LICENSE file).

# Testing

gdPhotoSlider has been tested on a PC using:

Firefox 62.0.3 (64-bit)
Google Chrome Version 69.0.3497.100 (Official Build) (64-bit)
Internet Explorer Version 11.345.17134.0 (some image display issues)
Microsoft Edge 42.17134.1.0 Microsoft EdgeHTML 17.17134

Tested on iPhone and iPad using:
Firefox Latest Version
Safari Latest Version

# TODO

  * Nothing, unless I have brilliant idea (or someone suggests something)
