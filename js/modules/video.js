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
        var playing_class = 'playing';
        var autoplay_class = 'autoplay-enabled';
        var disable_remote_playback_attribute = 'disableRemotePlayback';
        var controls_disabled_class = 'controls-disabled';
        var initialized_attr = 'data-controls-initialized';
        var window_width = $(window).width();
        var mobile_max_width = 1024;
        var mobile_class = 'is-mobile';
        var ipad_class = 'is-ipad';
        var is_iPad = navigator.userAgent.indexOf("iPad") != -1 ;

        // general mobile check
        var is_mobile = false;
        // this includes tablet, EXPLUDING iPad
        if (window_width <= mobile_max_width && is_iPad === false ) {
            is_mobile = true;
        }

        // loop through video sections
        $videos.each( function(){

            // init
            var $vid = $( this );
            var $plugin_container = $vid.parents('.content-plugin');
            var $video_controls = $plugin_container.find('.video-controls');

            // if hidden, do not initialize video control trigger
            // use case: when used in a default modal
            if ($vid.is(":visible") === false) {
                return true;
            }

            // enable videos on iPads
            if (is_iPad) {
                enableInlineVideo($vid.get(0), {
                    iPad: true
                });
            }

            // add class to indicate we're on an iPad
            if (is_iPad) {
                $plugin_container.addClass(ipad_class);
            }

            // on mobile: make sure autoplay is disabled (data usage alert!)
            if (is_mobile) {
                $vid.removeAttr('autoplay');
                $plugin_container.removeClass(autoplay_class);
                // removing the attribute wasn't good enough, let's pause the video
                $vid.get(0).pause();
            }

            // in case of mobile but not iPad, hide the controls
            if (is_mobile && is_iPad === false) {
                // hide controls with CSS
                $plugin_container.addClass(controls_disabled_class);
                // make sure there is no remote playback button (Android)
                $vid.attr(disable_remote_playback_attribute,'');
            }else {
                $plugin_container.removeClass(controls_disabled_class);
                disable_remote_playback_attribute
                $vid.removeAttr(disable_remote_playback_attribute);
            }

            // after checking for mobile devices, continue slightly delayed
            setTimeout(function(){
                // add event listener to video controls, but only continue if autplay is DISABLED
                if ($plugin_container.hasClass(autoplay_class) === false) {
                    var controls_initialized = $video_controls.attr(initialized_attr);
                    // NOT initialized yet
                    if (typeof controls_initialized === 'undefined') {
                        $video_controls.
                            on('click',
                            function(){
                                // init
                                let $controls = $(this);
                                if( $plugin_container.hasClass( on_pause_class ) ) {
                                    // set src if it hasn't been done already
                                    let $source = $vid.find('source');
                                    if (typeof $source.attr('src') === 'undefined') {
                                        let video_src = $source.data('src');
                                        $source.attr('src', video_src);
                                        $vid.get(0).load();
                                    }
                                    // toggle classes
                                    $plugin_container.removeClass( on_pause_class );
                                    $plugin_container.addClass( playing_class );
                                    // let's play
                                    $vid.get(0).play();
                                    // and mark the video as loaded (for possible transitions)
                                    $plugin_container.addClass(loaded_class);
                                }else {
                                    // pause the video and..
                                    $vid.get(0).pause();
                                    // ..toggle classes
                                    $plugin_container.addClass( on_pause_class );
                                    $plugin_container.removeClass( playing_class );
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
            },100);

        });

    }

    // on page load
    initInlineVideo();

    // when scrolling has stopped
    $(window).videoScrollStopped(function(){
        initInlineVideo();
    });

    // when resizing the window
    $(window).on( 'initInlineVideo viewportWidthHasChanged softpage:opened default-modal:opened', function(){
        initInlineVideo();
    });

});
