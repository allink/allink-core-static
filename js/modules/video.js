/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Video functionality for our "Content Plugin"

*/

// Enable support for iPads
// https://github.com/bfred-it/iphone-inline-video
import enableInlineVideo from 'iphone-inline-video';

$(function () {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Helper Functions and Events

    */

    $.fn.videoIsOnScreen = function () {

        var element = this.get(0);
        var bounds = element.getBoundingClientRect();

        return bounds.top < window.innerHeight && bounds.bottom > 0;

    };

    $.fn.videoScrollStopped = function (callback) {

        // init
        var timeout = 50;

        // fire delayed scroll
        $(this).scroll(function () {
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout, self));
        });

    };


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Handle Video Playback

    */

    function initInlineVideo() {

        // init
        var $videos = $('.the-video');
        var loaded_class = 'loaded';
        var on_pause_class = 'on-pause';
        var playing_class = 'playing';
        var autoplay_class = 'autoplay-enabled';
        var disable_remote_playback_attribute = 'disableRemotePlayback';
        var controls_disabled_class = 'controls-disabled';
        var initialized_attr = 'data-controls-initialized';
        var window_width = $(window).width();
        var mobile_max_width = 1023;
        var mobile_class = 'is-mobile';
        var ipad_class = 'is-ipad';
        var is_iPad = navigator.userAgent.indexOf("iPad") != -1;

        // general mobile check
        var is_mobile = false;
        // this includes tablet, EXPLUDING iPad
        if (window_width <= mobile_max_width && is_iPad === false) {
            is_mobile = true;
        }

        // loop through video sections
        $videos.each(function () {
            // init
            var $vid = $(this);
            var $plugin_container = $vid.parents('.content-plugin');
            if ($plugin_container.length === 0) {
                $plugin_container = $vid.parents('.content-section__video-container');
            }
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

            // on mobile: set pause indicator
            if (is_mobile) {
                $plugin_container.addClass(on_pause_class);
            }

            // set src if it hasn't been done already
            let $source = $vid.find('source');
            if (typeof $source.attr('src') === 'undefined' && !is_mobile) {
                let video_src = $source.data('src');
                $source.attr('src', video_src);
            }

            // set poster in any case
            if (typeof $vid.attr('poster') === 'undefined') {
                let poster_src = $vid.data('poster');
                $vid.attr('poster', poster_src);
            }

            // in case of iPad but not mobile, hide the controls
            if (!is_mobile && is_iPad) {
                $plugin_container.removeClass(controls_disabled_class);
                $vid.removeAttr(disable_remote_playback_attribute);
            }

            // after checking for mobile devices, continue slightly delayed
            setTimeout(function () {
                // add event listener to video controls, but only continue if autplay is DISABLED, or when we're on mobile
                if ($plugin_container.hasClass(autoplay_class) === false || is_mobile) {
                    var controls_initialized = $video_controls.attr(initialized_attr);
                    // NOT initialized yet
                    if (typeof controls_initialized === 'undefined') {
                        $video_controls.on('click',
                            function () {
                                // init
                                let $controls = $(this);
                                if ($plugin_container.hasClass(on_pause_class)) {
                                    // mobile: set src if it hasn't been done already
                                    if (is_mobile) {
                                        let $source = $vid.find('source');
                                        if (typeof $source.attr('src') === 'undefined') {
                                            let video_src = $source.data('src');
                                            $source.attr('src', video_src);
                                        }
                                    }
                                    // after SRC has been set, load it
                                    if ($plugin_container.hasClass(loaded_class) === false) {
                                        $vid.get(0).load();
                                    }
                                    // toggle classes
                                    $plugin_container.removeClass(on_pause_class);
                                    $plugin_container.addClass(playing_class);
                                    // let's play
                                    $vid.get(0).play();
                                    // and mark the video as loaded (for possible transitions)
                                    $plugin_container.addClass(loaded_class);
                                } else {
                                    // pause the video and..
                                    $vid.get(0).pause();
                                    // ..toggle classes
                                    $plugin_container.addClass(on_pause_class);
                                    $plugin_container.removeClass(playing_class);
                                }
                            }
                        );
                        // mark as initialized
                        $video_controls.attr(initialized_attr, '');
                    }
                }

                // only continue if autoplay is enabled, and we are NOT on mobile
                if ($plugin_container.hasClass(autoplay_class) && !is_mobile) {
                    // start video when element is on screen
                    if ($vid.videoIsOnScreen() || e.type == 'softpage:opened' || e.type == 'default-modal:opened') {
                        // per default, a video is "on pause" - let's remove this and don't come back here when there is no on_pause_class, because that means the video is playing
                        if ($plugin_container.hasClass(on_pause_class)) {
                            setTimeout(function () {
                                // has video been loaded?
                                if ($plugin_container.hasClass(loaded_class) === false) {
                                    $vid.get(0).load();
                                }
                                // remove class
                                $plugin_container.removeClass(on_pause_class);
                                // let's play
                                $vid.get(0).play();
                                // and mark the video as loaded (for possible transitions)
                                $plugin_container.addClass(loaded_class);
                            }, 100);
                        }
                    }
                    // not on screen? pause it
                    else {
                        // pause the video and..
                        $vid.get(0).pause();
                        // ..add class
                        $plugin_container.addClass(on_pause_class);
                    }
                }

            }, 100);

        });

    }

    // on page load
    initInlineVideo();

    // when scrolling has stopped
    $(window).videoScrollStopped(function () {
        initInlineVideo();
    });

    // when resizing the window
    $(window).on('initInlineVideo viewportWidthHasChanged softpage:opened default-modal:opened', function () {
        initInlineVideo();
    });

});
