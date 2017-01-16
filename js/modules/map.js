/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Map core functionality

An object with options can be passed to the map:



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
        options.pin_width = 33;
    }
    if (!options.map_control_padding) {
        options.map_control_padding = 30;
    }
    if (!options.pin_height) {
        options.pin_height = 53;
    }
    if (!options.map_styles) {
        options.map_styles = [
            {
                "featureType":"water",
                "elementType":"geometry.fill",
                "stylers":[{"color":"#d3d3d3"}]
            },{
                "featureType":"transit",
                "stylers":[{"color":"#808080"},{"visibility":"off"}]
            },{
                "featureType":"road.highway",
                "elementType":"geometry.stroke",
                "stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]
            },{
                "featureType":"road.highway","elementType":"geometry.fill","stylers":[
                {"color":"#ffffff"}
                ]
            },{
                "featureType":"road.local","elementType":"geometry.fill","stylers":[
                {"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]
            },{
                "featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]
            },{
                "featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]
            },{
                "featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]
            },{
                "featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]
            },{
                "featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]
            },{
                "featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]
            },{
                "featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]
            },{
                "featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]
            },{
                "featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]
            },{
                "featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]
            },{
                "featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]
            },{
                "featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]
            },{
                "featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]
            },{
                "featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]
            }

        ];
    }

    function createMarker(options, markerPos, infowindow_content, map) {
        var pin = {
            url: options.pin_url,
            size: new google.maps.Size(options.pin_width, options.pin_height), // half the actual size (squeezed), otherwise the info window is not centered correctly
            scaledSize: new google.maps.Size(options.pin_width, options.pin_height),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(options.pin_width/2, options.pin_height)
          };

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
            var mapInstance = document.getElementById('map-' + mapID);
            var zoomLevel = parseInt(mapInstance.getAttribute('data-zoom-level'));
            var numberOfMarkers = countObjectProperties(window.MAPS[i].locations);

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

            for (var counter = 1; counter <= numberOfMarkers; counter++) {

                // init object
                var marker_obj = window.MAPS[i].locations[counter];

                // get merker values
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
                // recenter map after resizing
                map.fitBounds(bounds);
                // Single Marker: fitBounds zooms in way too close when there's only one marker.
                if (numberOfMarkers == 1) {
                    map.setZoom(zoomLevel);
                }
            }, 500);
            // only when viewport width has changed
            $(window).on('viewportWidthHasChanged', function(){
                reCenterMap();
            });

            // handle zoom levels for different scenarios
            google.maps.event.addListenerOnce(map, 'bounds_changed', function(e) {
                // Single Marker: fitBounds zooms in way too close when there's only one marker.
                if (numberOfMarkers == 1) {
                    this.setZoom(zoomLevel);
                }
                // Multiple Markers: No need to do anything for now
                else {
                    // niente
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
                google_maps_script.src = 'https://maps.googleapis.com/maps/api/js?key='+api_key+'&callback=initMap';
                document.body.appendChild(google_maps_script);
            }
        }

    }
};



