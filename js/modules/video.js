/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Video functionality for our "Content Plugin"

*/

// Enable support for iPads
// https://github.com/bfred-it/iphone-inline-video
import enableInlineVideo from 'iphone-inline-video';

$(function() {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Helper Functions and Events

    */

    $.fn.videoIsOnScreen = function(){

        var element = this.get(0);
        var bounds = element.getBoundingClientRect();

        return bounds.top < window.innerHeight && bounds.bottom > 0;

    };

    $.fn.videoScrollStopped = function(callback) {

        // init
        var timeout = 50;

        // fire delayed scroll
        $( this ).scroll(function(){
            var self = this, $this = $( self );
            if ( $this.data( 'scrollTimeout' ) ) {
                clearTimeout( $this.data( 'scrollTimeout' ) );
            }
            $this.data( 'scrollTimeout' , setTimeout( callback, timeout, self ) );
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Handle Video Playback

    */

    function initInlineVideo() {

        // init
        var $videos = $( '.the-video' );
        var loaded_class = 'loaded';
        var on_pause_class = 'on-pause';
        var autoplay_class = 'autoplay-enabled';
        var initialized_attr = 'data-controls-initialized';
        var window_width = $(window).width();
        var mobile_max_width = 1024;
        var mobile_class = 'is-mobile';
        var ipad_class = 'is-ipad';
        var isIpad = navigator.userAgent.indexOf("iPad") != -1 ;

        // general mobile check
        var is_mobile = false;
        // this includes tablet, EXPLUDING iPad
        if (window_width <= mobile_max_width && isIpad === false ) {
            is_mobile = true;
        }

        // loop through video sections
        $videos.each( function(){

            // init
            var $vid = $( this );
            var $plugin_container = $vid.parents('.app-content-plugin');
            var $video_controls = $plugin_container.find('.video-controls');

            // enable videos on iPads
            if (isIpad) {
                enableInlineVideo($vid.get(0), {
                    iPad: true
                });
            }

            // add class to indicate we're on an iPad
            if (isIpad) {
                $plugin_container.addClass(ipad_class);
            }

            // on mobile: make sure autoplay is disabled (data usage alert!)
            if (is_mobile) {
                $vid.removeAttr('autoplay');
                $plugin_container.removeClass(autoplay_class);
            }

            // add event listener to video controls, but only continue if autplay is DISABLED
            if ($plugin_container.hasClass(autoplay_class) === false) {
                var controls_initialized = $video_controls.attr(initialized_attr);
                // NOT initialized yet
                if (typeof controls_initialized === 'undefined') {
                    $video_controls.
                        on('click',
                        function(){
                            if( $plugin_container.hasClass( on_pause_class ) ) {
                                // remove class
                                $plugin_container.removeClass( on_pause_class );
                                // let's play
                                $vid.get(0).play();
                                // and mark the video as loaded (for possible transitions)
                                $plugin_container.addClass(loaded_class);
                            }else {
                                // pause the video and..
                                $vid.get(0).pause();
                                // ..add class
                                $plugin_container.addClass( on_pause_class );
                            }
                        }
                    );
                    // mark as initialized
                    $video_controls.attr(initialized_attr,'');
                }
            }

            // only continue if autoplay is enabled
            if ($plugin_container.hasClass(autoplay_class)) {
                // start video when element is on screen
                if( $vid.videoIsOnScreen() ) {
                    // per default, a video is "on pause" - let's remove this and don't come back here when there is no on_pause_class, because that means the video is playing
                    if( $plugin_container.hasClass( on_pause_class ) ) {
                        setTimeout(function(){
                            // remove class
                            $plugin_container.removeClass( on_pause_class );
                            // let's play
                            $vid.get(0).play();
                            // and mark the video as loaded (for possible transitions)
                            $plugin_container.addClass(loaded_class);
                        },100);
                    }
                }
                // not on screen? pause it
                else {
                    // pause the video and..
                    $vid.get(0).pause();
                    // ..add class
                    $plugin_container.addClass( on_pause_class );
                }
            }

        });

    }

    // on page load
    initInlineVideo();

    // when scrolling has stopped
    $(window).videoScrollStopped(function(){
        initInlineVideo();
    });

    // when resizing the window
    $(window).on( 'viewportWidthHasChanged softpage:opened', function(){
        initInlineVideo();
    });

});
