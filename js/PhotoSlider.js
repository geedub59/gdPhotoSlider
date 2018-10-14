$(document).ready(function () {

  /********************************************************************
  Global variables definition
  ********************************************************************/
  var photoDIR = $("body").data("photodir");
  var retrievePhotoDIR = "";
  var thumbDIR = $("body").data("thumbdir");
  var retrieveThumbDIR = "";

  var loadDelay = $("body").data("loaddelay") * 1000;
  var viewDelay = $("body").data("viewdelay") * 1000;

  var maxPhoto = 0; // The maximum number of photos
  var currentPhoto = 0; // The currently displayed photo

  var playButton = null; // Used for the time delay for viewing photos

  var albums = []; // Contains all album names
  var photoArr = []; // Contains the photo filenames

  var clickPhoto = -1; // will be zero or positve if a gallery photo is clicked

  var galleryMaxWidth = "117px";
  /*******************************************************************/

  /********************************************************************
  Set galleryMaxWidth if we're on a mobile device (assumes a touch screen is in use)
  ********************************************************************/
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile() !== null) {
    galleryMaxWidth = "100px";
  }
  /*******************************************************************/

  /********************************************************************
  Retrieve a list of album names from the albums folder
  ********************************************************************/
  var getAlbumRequest = encodeURI("php/_gd_returnJSON.php?sourceDir=albums");
  $.getJSON(getAlbumRequest, function (returnedData) {

    albums = returnedData;
    albums.sort();
    albums.forEach(addAlbums);

    getJSONPhotos();

  });

  /********************************************************************
  Retrieve a list of image files from the photoDir
  It will retrieve jpg, png, bmp & tif files
  ********************************************************************/
  function getJSONPhotos() {

    var getPhotoRequest = encodeURI("php/_gd_returnJSON.php?sourceDir=" + retrievePhotoDIR);

    $.getJSON(getPhotoRequest, function (returnedData) {

      photoArr = returnedData;
      photoArr.sort();
      photoArr.forEach(addPhotoDivs);
      maxPhoto = photoArr.length - 1;
      currrentPhoto = 0;

      isGalleryScrollable();

    });

  }

  function addAlbums(item, index) {

    var albumA = '<a class="dropdown-item" href="#">' + item + '</a>';
    $("#footerbox .dropdown .dropdown-menu").append(albumA);

    if (index == 0) {
      $("#albumMenuLink").text(item);
      retrievePhotoDIR = "albums/" + item + "/" + photoDIR;
      retrieveThumbDIR = "albums/" + item + "/" + thumbDIR;
    }

  }

  function addPhotoDivs(item, index) {

    var photoID = "photo" + index;
    var photoURL = retrievePhotoDIR + '/' + item;
    var photoDIV = '<div id="' + photoID + '" class="photo" style="opacity:0; z-index:1;">\
                      <img src="">\
                    </div>';
    var thumbURL = retrieveThumbDIR + '/' + item;
    var thumbSPAN = '<span data-index="' + index + '" data-photofilename="' + item + '"><img src="' + thumbURL + '"></span>';

    $("#photos").append(photoDIV);
    $("#gallery").append(thumbSPAN);

    var $photoID = $("#" + photoID);

    if (index == 0) {
      $("#gallery span[data-index='" + currentPhoto + "'] img").css({
        "-webkit-filter": "sepia(100%)",
        "filter": "sepia(100%)"
      });

      $photoID.css({
        "opacity": "1",
        "z-index": "2"
      });

      $photoID.find("img:first-child").attr("src", photoURL);

      $("#photofilename").text(item);
    }

  }
  /*******************************************************************/

  /********************************************************************
  Code for processing selection of a new album
  ********************************************************************/
  $("#footerbox").on("click", ".dropdown-item", function () {

    var newAlbum = $(this).text();

    $("#footerbox .fa-stop").trigger("click");

    $("#photos div").remove();
    $("#gallery span").remove();

    $("#albumMenuLink").text(newAlbum);
    retrievePhotoDIR = "albums/" + newAlbum + "/" + photoDIR;
    retrieveThumbDIR = "albums/" + newAlbum + "/" + thumbDIR;

    currentPhoto = 0;
    getJSONPhotos();

  })
  /*******************************************************************/

  /********************************************************************
  Code for processing click on NEXT button
  ********************************************************************/
  $("#next").on("click", function () {

    var $curPhoto = $("#photo" + currentPhoto);
    if (clickPhoto >= 0) {
      currentPhoto = clickPhoto;
      clickPhoto = -1;
    } else {
      if (currentPhoto == maxPhoto) {
        currentPhoto = 0;
      } else {
        currentPhoto += 1;
      }
    }
    var $nextPhoto = $("#photo" + currentPhoto);
    var newLeft = $curPhoto.width() * (-1);

    var photoURL = retrievePhotoDIR + '/' + photoArr[currentPhoto];
    $nextPhoto.css({
      "left": newLeft * (-1),
      "z-index": "2",
      "opacity": "0"
    });
    $nextPhoto.find("img:first-child").attr("src", photoURL);

    makeVisible(currentPhoto);

    $("#loader").animate({
      "width": "100%"
    }, loadDelay, function () {

      $curPhoto.animate({
        "opacity": "0",
        "left": newLeft,
        "z-index": "1"
      }, loadDelay);

      $nextPhoto.animate({
        "opacity": "1",
        "left": "0px",
        "z-index": "2"
      }, loadDelay);

      $("#gallery span img").css({
        "-webkit-filter": "none",
        "filter": "none"
      });

      $("#gallery span[data-index='" + currentPhoto + "'] img").css({
        "-webkit-filter": "sepia(100%)",
        "filter": "sepia(100%)"
      });

      $("#photofilename").text(photoArr[currentPhoto]);

      $("#loader").css("width", "0%");

    });

  });

  /********************************************************************
  Code for processing click on PREV button
  ********************************************************************/
  $("#prev").on("click", function () {

    var $curPhoto = $("#photo" + currentPhoto);
    if (clickPhoto >= 0) {
      currentPhoto = clickPhoto;
      clickPhoto = -1;
    } else {
      if (currentPhoto == 0) {
        currentPhoto = maxPhoto;
      } else {
        currentPhoto -= 1;
      }
    }
    var $nextPhoto = $("#photo" + currentPhoto);
    var newLeft = $curPhoto.width() * (-1);

    var photoURL = retrievePhotoDIR + '/' + photoArr[currentPhoto];
    $nextPhoto.css({
      "left": newLeft,
      "z-index": "2",
      "opacity": "0"
    });
    $nextPhoto.find("img:first-child").attr("src", photoURL);

    makeVisible(currentPhoto);

    $("#loader").animate({
      "width": "100%"
    }, loadDelay, function () {

      $curPhoto.animate({
        "opacity": "0",
        "left": newLeft * (-1),
        "z-index": "1"
      }, loadDelay);

      $nextPhoto.animate({
        "opacity": "1",
        "left": "0px",
        "z-index": "2"
      }, loadDelay);

      $("#gallery span img").css({
        "-webkit-filter": "none",
        "filter": "none"
      });

      $("#gallery span[data-index='" + currentPhoto + "'] img").css({
        "-webkit-filter": "sepia(100%)",
        "filter": "sepia(100%)"
      });

      $("#photofilename").text(photoArr[currentPhoto]);

      $("#loader").css("width", "0%");

    });

  });
  /*******************************************************************/


  /********************************************************************
  Code for processing clicks on PLAY and STOP buttons
  ********************************************************************/
  $("#footerbox .fa-play").on("click", function () {

    if (!$(this).hasClass("activated")) return;
    $("#next").trigger("click");
    playButton = setInterval(showPhotos, viewDelay);
    $(this).removeClass("activated");
    $("#footerbox .fa-stop").addClass("activated");

  });

  function showPhotos() {
    $("#next").trigger("click");
  }

  $("#footerbox .fa-stop").on("click", function () {

    if (!$(this).hasClass("activated")) return;
    clearInterval(playButton);
    $(this).removeClass("activated");
    $("#footerbox .fa-play").addClass("activated");

  });
  /*******************************************************************/

  /********************************************************************
  Code for processing clicks on gallery display options buttons
  ********************************************************************/
  $("#footerbox").on("click", ".fa-th, .fa-ruler-vertical", function () {

    if (!$(this).hasClass("activated")) return;

    $("#footerbox .fa-stop").trigger("click");

    if ($(this).hasClass("fa-th")) {
      $(this).removeClass("fa-th").addClass("fa-ruler-vertical")
      $("#photos").hide();
      $("#gallery").css({
        "width": "100%",
        "max-width": "none",
        "flex-direction": "row",
        "flex-wrap": "wrap"
      });
      $("#footerbox .fa-play").removeClass("activated");
      $("#footerbox .fa-indent").removeClass("activated");
      $("#gallery").data("mode", "tiled");
    } else {
      $(this).removeClass("fa-ruler-vertical").addClass("fa-th")
      $("#gallery").css({
        "width": "100px",
        "max-width": galleryMaxWidth,
        "flex-direction": "column",
        "flex-wrap": "nowrap"
      });
      $("#footerbox .fa-play").addClass("activated");
      $("#footerbox .fa-indent").addClass("activated");
      $("#gallery").data("mode", "column");
      $("#photos").show();
    }

  });
  /*******************************************************************/

  /********************************************************************
  Code for processing clicks on INDENT and OUTDENT buttons
  ********************************************************************/
  $("#footerbox").on("click", ".fa-indent, .fa-outdent", function () {

    if (!$(this).hasClass("activated")) return;

    if ($(this).hasClass("fa-indent")) {
      $(this).removeClass("fa-indent").addClass("fa-outdent")
      $("#gallery").animate({
        "right": "-120px"
      }, 300, "linear", function () {
        $("#gallery").css("display", "none");
      });
      $("#next").css({
        "right": "0px"
      });
      $("#footerbox .fa-th").removeClass("activated");
    } else {
      $(this).removeClass("fa-outdent").addClass("fa-indent")
      $("#gallery").css("display", "flex").animate({
        "right": "0px"
      }, 300, "linear");
      $("#next").css({
        "right": galleryMaxWidth
      });
      $("#footerbox .fa-th").addClass("activated");
    }

  });
  /*******************************************************************/

  /********************************************************************
  Code for processing click on a GALLERY image
  ********************************************************************/
  $("#gallery").on("click", "img", function () {

    if ($("#gallery").data("mode") == "tiled") {
      $("#footerbox .fa-ruler-vertical").trigger("click");
    }
    clickPhoto = $(this).parent().data("index");

    if (clickPhoto >= currentPhoto) {
      $("#next").trigger("click");
    } else {
      $("#prev").trigger("click");
    }

  });
  /*******************************************************************/

  /********************************************************************
  Code to see if the gallery is scrollable
  ********************************************************************/
  $(window).on("resize", isGalleryScrollable);

  function isGalleryScrollable() {

    if ($("#gallery").data("mode") != "tiled") {

      if ($("#gallery span[data-index='0']").isInViewport(125) &&
        $("#gallery span[data-index='" + maxPhoto + "']").isInViewport(125)) {
        $("#gallery").css({
          "width": "100px",
          "max-width": "100px"
        })
        $("#next").css({
          "right": "100px"
        });
      } else {
        $("#gallery").css({
          "width": galleryMaxWidth,
          "max-width": galleryMaxWidth
        })
        $("#next").css({
          "right": galleryMaxWidth
        });
      }
    }

  }
  /*******************************************************************/

  /********************************************************************
  Code to check that a gallery image is visible and scroll it to the top if it is not
  ********************************************************************/
  function makeVisible(currentPhoto) {

    var $spanElem = $("#gallery span[data-index='" + currentPhoto + "']");
    if (!$spanElem.isInViewport(125)) {
      $spanElem.parent().animate({
        scrollTop: currentPhoto * 100
      }, loadDelay);
    }

  }

  $.fn.isInViewport = function (vpAdjust) {

    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - vpAdjust;

    return elementBottom > viewportTop && elementTop < viewportBottom;

  };
  /*******************************************************************/

});