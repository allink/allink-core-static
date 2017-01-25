/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

SEO scripts for e.g. Google Tag Manager

*/

import scrollDepth from 'scroll-depth';
import riveted from 'riveted';

$(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Scroll-Depth - Configuration

    http://scrolldepth.parsnip.io/

    */

    $.scrollDepth({
      minHeight: 0,
      elements: [],
      percentage: true,
      userTiming: false,
      pixelDepth: false,
      nonInteraction: true
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    Riveted - Initialization

    http://riveted.parsnip.io/

    */

    riveted.init();

});
