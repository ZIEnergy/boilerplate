$(document).ready(function () {

      $('.fancybox').fancybox({
        padding: 0
      });

      $('.banner').slick({
        arrows: false,
        slidesToShow: 1,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 8000,
        fade: true
      });
  
      $('.portfolio__slider').slick({
        centerMode: true,
//        slidesToShow: 1,
        centerPadding: '50%',
        variableWidth: true,
        infinite: true,
        initialSlide: 3
      });
  
      $('.item__gallery-thumbnail').click(function() {
        $('.item__gallery-thumbnail').removeClass('item__gallery-thumbnail--active');
        $(this).addClass('item__gallery-thumbnail--active');
      });

      $('.locomotives__list').slick({
        slidesToShow: 3,
        autoplay: false,
        infinite: false,
      });

      $('.story__btn').click(function (e) {
        e.preventDefault();
        $.fancybox.close();
      });

      $('.tibet__btn').click(function (e) {
        e.preventDefault();
        $.fancybox.close();
      });

      $('.banner__item-video').vide({
        mp4: '../img/video.mp4',
        webm: '../img/video.webm',
      }, {
        position: '50% 100%',
        bgColor: '#221b17'
      });

      $('.modal-form--order').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
          type: "post",
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function () {
            $('.modal-form__hidden-link--order').click();
          }
        });
      });

      $('.modal-form--testdrive').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
          type: "post",
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function () {
            $('.modal-form__hidden-link--testdrive').click();
          }
        });
      });

      $('.modal-form--advice').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
          type: "post",
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function () {
            $('.modal-form__hidden-link--advice').click();
          }
        });
      });

      $('.subscribe__form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
          type: "post",
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function () {
            $('.modal-form__comment-link').text($('.subscribe__input').val());
            $('.subscribe__hidden-link').click();
          }
        });
      });

      $('a[href*=#]:not(.fancybox)').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });

      // When the window has finished loading create our google map below
      google.maps.event.addDomListener(window, 'load', init);

      function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: 16,

          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(55.732025, 37.620671),
          // How you would like to style the map. 
          // This is where you would paste any style found on Snazzy Maps.
          styles: [{
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [{
              "visibility": "on"
            }, {
              "color": "#1c99ed"
            }]
          }, {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#1f79b5"
            }]
          }, {
            "featureType": "administrative.province",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#6d6d6d"
            }, {
              "visibility": "on"
            }]
          }, {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#555555"
            }]
          }, {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#999999"
            }]
          }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
              "color": "#f2f2f2"
            }]
          }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.attraction",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.government",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.medical",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#e1eddd"
            }]
          }, {
            "featureType": "poi.place_of_worship",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.school",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "poi.sports_complex",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
              "saturation": "-100"
            }, {
              "lightness": "45"
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
              "visibility": "simplified"
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#ff9500"
            }]
          }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{
              "visibility": "on"
            }, {
              "hue": "#009aff"
            }, {
              "saturation": "100"
            }, {
              "lightness": "5"
            }]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#ff9500"
            }]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [{
              "visibility": "off"
            }]
          }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [{
              "lightness": "1"
            }, {
              "saturation": "100"
            }, {
              "hue": "#009aff"
            }]
          }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#ffffff"
            }]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#8a8a8a"
            }]
          }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
              "visibility": "off"
            }]
          }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#ffffff"
            }]
          }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
              "visibility": "off"
            }]
          }, {
            "featureType": "transit.station.airport",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [{
              "lightness": "33"
            }, {
              "saturation": "-100"
            }, {
              "visibility": "on"
            }]
          }, {
            "featureType": "transit.station.bus",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "transit.station.rail",
            "elementType": "all",
            "stylers": [{
              "visibility": "on"
            }]
          }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
              "color": "#46bcec"
            }, {
              "visibility": "on"
            }]
          }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#4db4f8"
            }]
          }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
              "color": "#ffffff"
            }]
          }, {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "off"
            }]
          }]
        };
        
        $('.portfolio__close').click(function() {
          parent.$.fancybox.close();
        });

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(55.732025, 37.620671),
          map: map,
          title: 'Snazzy!'
        });


      };
  
});