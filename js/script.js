/*
* Plugin Name: Native Emoji
* Plugin URI: http://native-emoji.davabuu.com
* Version: 1.0.
* Author: Davabuu Designs
* Author URI: http://davabuu.com
*/

(function($) {
	$(document).on('click', 'div.nep_mce-caller img.scroll', function(e){
		e.preventDefault();
		var $destiny = "#" + $(this).attr('data-target'),
			name = $(this).attr('data-name'),
			newOffset =	($(""+$destiny+"").position().left + $('div.nep_mce-shown').scrollLeft() -15);
		$('span.nep_mce-label').text(name);
		$('div.nep_mce-caller img.scroll').removeClass('active');
		$(this).addClass('active');
		$('div.nep_mce-shown').animate({scrollLeft: newOffset},500);
		if(newOffset >= 1 ){
			$('span.nep_mce-left-arrow').removeClass('nep_mce-arrow-inactive');
		}
		if(newOffset <= 0){
			$('span.nep_mce-left-arrow').addClass('nep_mce-arrow-inactive');
			$('span.nep_mce-left-arrow').removeClass('nep_mce-arrow-active');
		}
		if(newOffset <= 5361){
			$('span.nep_mce-right-arrow').removeClass('nep_mce-arrow-inactive');
		}
		if(newOffset >= 5362){
			$('span.nep_mce-right-arrow').addClass('nep_mce-arrow-inactive');
			$('span.nep_mce-right-arrow').removeClass('nep_mce-arrow-active');
		}
		return false;
	});
	
	var scrollHandle = 0,
        scrollStep = 5;			
	
	$(document).on('mouseenter', 'span.nep_mce-right-arrow', function(){ 
		if(!$(this).hasClass('nep_mce-arrow-inactive')){
	        $(this).addClass('nep_mce-arrow-active');
    	    startScrolling(1, scrollStep);
		}
	});
	$(document).on('mouseenter', 'span.nep_mce-left-arrow', function(){ 
		if(!$(this).hasClass('nep_mce-arrow-inactive')){
	        $(this).addClass('nep_mce-arrow-active');
    	    startScrolling(-1, scrollStep);
		}
	});
	$(document).on('mouseleave', 'span.nep_mce-arrow-box', function(){
		stopScrolling();
        $(this).removeClass('nep_mce-arrow-active');
	});
	
	
	function startScrolling(modifier, step) {
        if (scrollHandle === 0) {
            scrollHandle = setInterval(function () {
                var newOffset = ($('div.nep_mce-shown').scrollLeft() + (scrollStep * modifier));
                $('div.nep_mce-shown').scrollLeft(newOffset)	
				if(newOffset >= 1 ){
					$('span.nep_mce-left-arrow').removeClass('nep_mce-arrow-inactive');
				}
				if(newOffset <= 0){
					$('span.nep_mce-left-arrow').addClass('nep_mce-arrow-inactive');
					$('span.nep_mce-left-arrow').removeClass('nep_mce-arrow-active');
				}
				if(newOffset <= 5361){
					$('span.nep_mce-right-arrow').removeClass('nep_mce-arrow-inactive');
				}
				if(newOffset >= 5362){
					$('span.nep_mce-right-arrow').addClass('nep_mce-arrow-inactive');
					$('span.nep_mce-right-arrow').removeClass('nep_mce-arrow-active');
				}
				if(newOffset >= 0 && newOffset <= 926){
					$('div.nep_mce-caller img.scroll').removeClass('active');
					$("img[data-target=people]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_people);
				}
				else if(newOffset >= 927 && newOffset <= 1753){
					$('div.nep_mce-caller img.scroll').removeClass('active');
					$("img[data-target=nature]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_nature);
				}
				else if(newOffset >= 1754 && newOffset <= 2151){
					$('div.nep_mce-caller img.scroll').removeClass('active');
					$("img[data-target=food_drink]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_food_drink);
				}
				else if(newOffset >= 2152 && newOffset <= 2516){
					$('div.nep_mce-caller img.scroll').removeClass('active');
					$("img[data-target=celebration]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_celebration);
				}
				else if(newOffset >= 2517 && newOffset <= 2881){
					$('div.nep_mce-caller img.scroll').removeClass('active');
					$("img[data-target=activity]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_activity);
				}
				else if(newOffset >= 2882 && newOffset <= 3477){
					$('div.nep_mce-caller img.scroll').removeClass('active');
					$("img[data-target=travel_places]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_travel_places);
				}
				else if(newOffset >= 3478 && newOffset <= 5363){
					$('div.mce-caller img.scroll').removeClass('active');
					$("img[data-target=objects_symbols]").addClass('active');
					$('span.nep_mce-label').text(nep_emoji_plugin.nep_emoji_objects_symbols);
				}
            }, 10);			
        }
    }
    function stopScrolling() {
        clearInterval(scrollHandle);
        scrollHandle = 0;
    }
})(jQuery);