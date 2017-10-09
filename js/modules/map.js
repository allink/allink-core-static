/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Map core functionality

Customize Map Styles:

https://snazzymaps.com/style/105672/django-cms-default

Requires the API key variable in base_root.html:

<script type="text/javascript">
    var GOOGLE_MAP_API_KEY = '{% settings_value "GOOGLE_MAP_API_KEY" %}';
</script>

*/

import { debounce, countObjectProperties } from './helper-functions';

export const initMap = function (options) {

    // initialize options
    var options = options || {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Default settings

    */

    if (!options.pin_url) {
        options.pin_url = '/static/images/map/pin.png';
    }
    if (!options.pin_width) {
        options.pin_width = 66;
    }
    if (!options.pin_height) {
        options.pin_height = 109;
    }
    if (!options.map_styles) {
        options.map_styles = [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebebeb"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#d1d8da"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ];
    }

    function createMarker(options, markerPos, infowindow_content, map) {
        var pin = {
            url: options.pin_url,
            size: new google.maps.Size(Math.floor(options.pin_width/2), Math.floor(options.pin_height/2)), // half the actual size (squeezed), otherwise the info window is not centered correctly
            scaledSize: new google.maps.Size(Math.floor(options.pin_width/2), Math.floor(options.pin_height/2)),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(Math.floor(options.pin_width/4), Math.floor(options.pin_height/2)
)          };

        var marker = new google.maps.Marker({
          position: markerPos,
          map: map,
          icon: pin,
          info: infowindow_content,
        });

        return marker;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    CallBack function assigned to window, so it can be called by
    the Google Map script.

    */

    window.initMap = () => {

        // init
        var numberOfMaps = window.MAPS.length;

        // / loop through instances
        for (var i = window.MAPS.length - 1; i >= 0; i--) {

            // init vars
            var mapID = window.MAPS[i].id;
            var totalNumberOfLocations = 0;
            var mapInstance = document.getElementById('map-' + mapID);
            var zoomLevel = parseInt(mapInstance.getAttribute('data-zoom-level'));
            var page_load_window_width = $(window).width();

            // fallback: determine total number of locations according to locations property
            if (typeof window.MAPS[i].totalNumberOfLocations === 'undefined') {
                totalNumberOfLocations = countObjectProperties(window.MAPS[i].locations);
            }
            // in newer templates, we get the 'totalNumberOfLocations' property
            else {
                totalNumberOfLocations = window.MAPS[i].totalNumberOfLocations;
            }

            // define map options
            var mapOptions = {
                mapTypeControl: false,
                zoomControl: true,
                scrollwheel: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER,
                    style: google.maps.ZoomControlStyle.LARGE
                },
                scaleControl: true,
                streetViewControl: false,
            };

            // map styles and settings
            var styledMap = new google.maps.StyledMapType(options.map_styles,{name: "Styled Map"});
            var map = new google.maps.Map(mapInstance, mapOptions);
            var bounds = new google.maps.LatLngBounds();
            var infoWindow = new google.maps.InfoWindow({
                content: 'Loading...',
              });
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

            for (var counter = 1; counter <= totalNumberOfLocations; counter++) {

                // init object
                var marker_obj = window.MAPS[i].locations[counter];

                // within a loop it can happen that a location doesn't contain coordinates, which skips some locations which creates a gap in the foorloop.counter (e.g. 1, 2, 3, 5, 6, 7). In this case we get an undefined variable and "continue" the journey.
                if (typeof marker_obj === 'undefined') {
                    continue;
                }

                // get marker values
                var lat = parseFloat(marker_obj.lat.replace(',', '.'));
                var lng = parseFloat(marker_obj.lng.replace(',', '.'));
                var infowindow_content = marker_obj.infowindow_content;

                // define and set marker
                var markerPos = new google.maps.LatLng(lat,lng);
                var marker = createMarker(options, markerPos, infowindow_content, map);

                // extend map boundaries
                bounds.extend(markerPos);

                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);

                // fill info box with individual content
                marker.addListener('click', function() {
                    infoWindow.setContent( this.info );
                    infoWindow.open(map, this);
                });

            }

            // delayed re-center the map when a user resizes the window
            var reCenterMap = debounce(function() {
                // init
                var window_width = $(window).width();
                // in any case, we want to fit all marker onto the map
                map.fitBounds(bounds);
                // set zoom level on larger screens
                if (window_width >= 768) {
                    map.setZoom(zoomLevel);
                }
            }, 500);
            // only when viewport width has changed
            $(window).on('viewportWidthHasChanged', function(){
                reCenterMap();
            });

            // handle zoom levels for different scenarios
            google.maps.event.addListenerOnce(map, 'bounds_changed', function(e) {
                this.setZoom(zoomLevel);
                // mobile: fit all marker onto the map
                if (page_load_window_width < 768) {
                    this.fitBounds(bounds);
                }
            });

        }
    };

    // 1. check if there is at least one map on the page
    var map_exists = document.querySelectorAll('.locations-map');
    if(map_exists.length > 0) {
        // 2. check if the script has NOT been included already
        if(typeof google == "undefined") {
            // 3. load google maps api
            let google_maps_script = document.createElement('script');
            // fallback API key
            let api_key = '';
            // custom API key
            if (window.GOOGLE_MAP_API_KEY && window.GOOGLE_MAP_API_KEY != 'None') {
                api_key = window.GOOGLE_MAP_API_KEY;
            }
            // check if key exists and warn if not
            if (api_key == '') {
                console.warn('Google Map API key is missing');
            }else {
                // get document language
                var lang = $('html').attr('lang');
                // load script
                google_maps_script.src = 'https://maps.googleapis.com/maps/api/js?key='+api_key+'&callback=initMap&language='+lang;
                document.body.appendChild(google_maps_script);
            }
        }

    }
};



