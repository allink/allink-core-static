/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Video functionality for our "Content Plugin"

*/

// Enable support for iPads
// https://github.com/bfred-it/iphone-inline-video
import enableInlineVideo from 'iphone-inline-video';

$(() => {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Helper Functions and Events

    */

    $.fn.videoIsOnScreen = function videoIsOnScreen() {
        const element = this.get(0);
        const bounds = element.getBoundingClientRect();

        return bounds.top < window.innerHeight && bounds.bottom > 0;
    };

    $.fn.videoScrollStopped = function videoScrollStopped(callback) {
        // init
        const timeout = 50;

        // fire delayed scroll
        $(this).scroll(() => {
            if ($(this).data('scrollTimeout')) {
                clearTimeout($(this).data('scrollTimeout'));
            }
            $(this).data('scrollTimeout', setTimeout(callback, timeout, this));
        });
    };


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Handle Video Playback

    */

    function initInlineVideo(e) {
        // init
        const $videos = $('.the-video');
        const loadedClass = 'loaded';
        const onPauseClass = 'on-pause';
        const playingClass = 'playing';
        const autoplayClass = 'autoplay-enabled';
        const autoplayMobileClass = 'autoplay-mobile-enabled';
        const disableRemotePlaybackAttribute = 'disableRemotePlayback';
        const controlsDisabledClass = 'controls-disabled';
        const initializedAttr = 'data-controls-initialized';
        const windowWidth = $(window).width();
        const mobileMaxWidth = 1023;
        const ipadClass = 'is-ipad';
        const isiPad = navigator.userAgent.indexOf('iPad') !== -1;

        // general mobile check
        let isMobile = false;
        // this includes tablet, EXPLUDING iPad
        if (windowWidth <= mobileMaxWidth && isiPad === false) {
            isMobile = true;
        }

        // loop through video sections
        $videos.each((_, element) => {
            // init
            const $vid = $(element);

            let $pluginContainer = $vid.parents('.content-plugin');
            if ($pluginContainer.length === 0) {
                $pluginContainer = $vid.parents('.content-section__video-container');
            }
            const $videoControls = $pluginContainer.find('.video-controls');

            // if hidden, do not initialize video control trigger
            // use case: when used in a default modal
            if ($vid.is(':visible') === false) {
                return true;
            }

            // enable videos on iPads
            if (isiPad) {
                enableInlineVideo($vid.get(0), {
                    iPad: true,
                });
            }

            // add class to indicate we're on an iPad
            if (isiPad) {
                $pluginContainer.addClass(ipadClass);
            }

            if ($pluginContainer.hasClass(autoplayMobileClass)) {
                isMobile = false;
            }

            // on mobile: set pause indicator
            if (isMobile) {
                $pluginContainer.addClass(onPauseClass);
            }

            // set src if it hasn't been done already
            const $source = $vid.find('source');
            if (typeof $source.attr('src') === 'undefined' && !isMobile) {
                const videoSrc = $source.data('src');
                $source.attr('src', videoSrc);
            }

            // set poster in any case
            if (typeof $vid.attr('poster') === 'undefined') {
                const posterSrc = $vid.data('poster');
                $vid.attr('poster', posterSrc);
            }

            // in case of iPad but not mobile, hide the controls
            if (!isMobile && isiPad) {
                $pluginContainer.removeClass(controlsDisabledClass);
                $vid.removeAttr(disableRemotePlaybackAttribute);
            }

            // add event listener to video controls, but only continue if autoplay is DISABLED, or when we're on mobile
            if ($pluginContainer.hasClass(autoplayClass) === false || $pluginContainer.hasClass(autoplayMobileClass) === false || isMobile) {
                const controlsInitialized = $videoControls.attr(initializedAttr);
                // NOT initialized yet
                if (typeof controlsInitialized === 'undefined') {
                    $videoControls.on('click',
                        () => {
                            // mobile: set src if it hasn't been done already
                            if (isMobile) {
                                if (typeof $source.attr('src') === 'undefined') {
                                    const videoSrc = $source.data('src');
                                    $source.attr('src', videoSrc);
                                }
                            }
                            // init
                            if ($pluginContainer.hasClass(onPauseClass)) {
                                // after SRC has been set, load it
                                if ($pluginContainer.hasClass(loadedClass) === false) {
                                    $vid.get(0).load();
                                }
                                // toggle classes
                                $pluginContainer.removeClass(onPauseClass);
                                $pluginContainer.addClass(playingClass);
                                // let's play
                                $vid.get(0).play();
                                // and mark the video as loaded (for possible transitions)
                                $pluginContainer.addClass(loadedClass);
                            } else {
                                // pause the video and..
                                $vid.get(0).pause();
                                // ..toggle classes
                                $pluginContainer.addClass(onPauseClass);
                                $pluginContainer.removeClass(playingClass);
                            }
                        });
                    // mark as initialized
                    $videoControls.attr(initializedAttr, '');
                }
            }

            // only continue if autoplay is enabled, and we are NOT on mobile
            if ($pluginContainer.hasClass(autoplayClass) || ($pluginContainer.hasClass(autoplayMobileClass) && !isMobile)) {
                // start video when element is on screen
                if ($vid.videoIsOnScreen() || (e && (e.type === 'softpage:opened' || e.type === 'default-modal:opened'))) {
                    // per default, a video is "on pause" - let's remove this and don't come back here when there is no on_pause_class, because that means the video is playing
                    if ($pluginContainer.hasClass(onPauseClass)) {
                        // has video been loaded?
                        if ($pluginContainer.hasClass(loadedClass) === false) {
                            // only load the video. calling play() is not needed here because we are in autoplay mode
                            $vid.get(0).load();
                        }
                        // remove class
                        $pluginContainer.removeClass(onPauseClass);

                        // only play video if it was playing already. otherwise it would interfere with autoplay
                        if ($vid.get(0).currentTime > 0) {
                            $vid.get(0).play();
                        }

                        // and mark the video as loaded (for possible transitions)
                        $pluginContainer.addClass(loadedClass);
                    }
                } else { // not on screen? pause it
                    // pause the video and..
                    $vid.get(0).pause();
                    // ..add class
                    $pluginContainer.addClass(onPauseClass);
                }
            }

            return true;
        });
    }

    // on page load
    initInlineVideo();

    // when scrolling has stopped
    $(window).videoScrollStopped((e) => {
        initInlineVideo(e);
    });

    // when resizing the window
    $(window).on('initInlineVideo viewportWidthHasChanged softpage:opened default-modal:opened', (e) => {
        initInlineVideo(e);
    });

    // re-init after cms page refresh
    if (window.CMS) {
        CMS.$(window).on('cms-content-refresh', (e) => {
            initInlineVideo(e);
        });
    }
});
