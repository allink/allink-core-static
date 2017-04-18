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

    function handleVideoPlayback() {

        // init
        var $videos = $( '.the-video' );
        var loaded_class = 'loaded';
        var on_pause_class = 'on-pause';
        var isIpad = navigator.userAgent.indexOf("iPad") != -1 ;

        // loop through video sections
        $videos.each( function(){

            // init
            var $vid = $( this );

            // first of all, check whether we're on mobile or not
            var show_video = toggleVideoVisibility( $vid );

            // enable videos on iPads
            enableInlineVideo($vid.get(0), {
                iPad: true
            });

            // in the mobile version the video element is not visible
            if( true === show_video ) {

                // start video when element is on screen
                if( $vid.videoIsOnScreen() ) {

                    // per default, a video is "on pause" - let's remove this and don't come back here when there is no on_pause_class, because that means the video is playing
                    if( $vid.hasClass( on_pause_class ) ) {
                        // remove class
                        $vid.removeClass( on_pause_class );
                        // let's play
                        $vid.get(0).play();
                        // and mark the video as loaded (for possible transitions)
                        $vid.parents('.video-content').addClass(loaded_class);
                    }

                }
                // not on screen? pause it
                else {

                    // pause the video and..
                    $vid.get(0).pause();

                    // ..add class
                    $vid.addClass( on_pause_class );

                }

            }

        });

    }

    function toggleVideoVisibility( $vid ) {

        // init
        var window_width = parseInt( $( window ).width() );
        var min_width_breakpoint = 768;
        var show_video = false;
        var loaded_class = 'loaded';

        // don't re-apply the changes
        if( !$vid.hasClass( loaded_class ) ) {

            // make sure to ONLY load the video when not on mobile
            if( window_width >= min_width_breakpoint ) {

                // set poster
                var poster = $vid.attr( 'data-poster' );
                $vid.attr( 'poster', poster );

                // set video source
                var $source = $vid.find( 'source' );
                var video_source = $source.attr( 'data-src' );
                $source.attr( 'src', video_source );

                // set flag so we won't do it again
                $vid.addClass( loaded_class );

                // set return value
                show_video = true;

            }

        }else {
            show_video = true;
        }

        return show_video;

    }

    // on page load
    handleVideoPlayback();

    // when scrolling has stopped
    $(window).videoScrollStopped(function(){
        handleVideoPlayback();
    });

    // when resizing the window
    $(window).on( 'viewportWidthHasChanged', function(){
        handleVideoPlayback();
    });

});
