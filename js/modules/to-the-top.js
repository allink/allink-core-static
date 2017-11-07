$(function(){
    // init
    var hover_class = 'hover';
    var $ttt = $('.to-the-top');
    $ttt.on('click',function(){
        $ttt.addClass(hover_class);
        setTimeout(function(){
            $ttt.removeClass(hover_class);
        },500);
    }).hover(
        function(){
            $ttt.addClass(hover_class);
        },
        function(){
            $ttt.removeClass(hover_class);
        }
    );
});
