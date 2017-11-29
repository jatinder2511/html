
/********** Accordian **********/
( function( $ ) {
$( document ).ready(function() {
$('.accr > ul > li > a').click(function() {
  $('.accr li').removeClass('active');
  $(this).closest('li').addClass('active');	
  var checkElement = $(this).next();
  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    checkElement.slideUp('normal');
  }
  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
    $('.accr ul ul:visible').slideUp('normal');
    checkElement.slideDown('normal');
  }
  if($(this).closest('li').find('ul').children().length == 0) {
    return true;
  } else {
    return false;	
  }		
});
});
} )( jQuery );
/************Slider Div*************/

function slider() {

    function animate_slider() {
        $('.slider #' + shown).animate({
            'opacity': '0','display':'none' // fade out
        }, 500);
        $('.slider #' + next_slide).animate({
            'opacity': '1', 'display': 'block ' // fade in
        }, 500);
       console.log(shown, next_slide);
        shown = next_slide;
    }

    function choose_next() {
        next_slide = (shown == sc) ? 1 : shown + 1;
        animate_slider();
    }

    $('.slider #1').css({ 'opacity': '1','display':'block' }); //show 1st image
    var shown = 1;
    var next_slide;
    var sc = $('.slider .adl-padding').length; // total images
    var iv = setInterval(choose_next,85500);
    $('.slider_nav').hover(function () {
        clearInterval(iv); // stop animation
    }, function () {
        iv = setInterval(choose_next,85500); // resume animation
    });
    $('.slider_nav span').click(function (e) {
        var n = e.target.getAttribute('name');
        //console.log(e.target.outerHTML, n);
        if (n == 'prev') {
            next_slide = (shown == 1) ? sc : shown - 1;
        } else if (n == 'next') {
            next_slide = (shown == sc) ? 1 : shown + 1;
        } else {
            return;
        }
        animate_slider();
    });
}

window.onload = slider;


/************Slider Div close*************/

/************ Toogle ***********/
$(document).ready(function(){
    $('.toggle-body').hide();
    $('.toggle-body.first').show();
$('.toggle-menu').click(function () {
	$(this).toggleClass('active');
    $(this).next().slideToggle(300);
});
});

/********** Modal popUP **********/
function open_Model(obj)
{	
	$('div.adl-modal').hide();
	var id = $(obj).attr('forModel');
	$('#'+id).css('height',$(window).height()+'px');
	$('#'+id).fadeIn('fast', function() {		
		$('.adl-modal-content').animate({ 'top' : '12%' }, 500);
		});
}
function close_Model()
{	
	$('.adl-modal-content').animate({ 'top': '-100%' }, 500, function () {
		$('div.adl-modal').fadeOut('fast');
		});		
		$('div.adl-pop-dropdown').hide();	
		
}
/*$('.adl-modal-content').css('height',$(".adl-modal-content").height());*/
/********** Dropdown within POPUP --'POP UP Dropdown'-- ****adl-pop-dropdown******/
function pop_dropdown_open(obj)
{	
	$('div.adl-pop-dropdown').hide();
	var heigh=$('.adl-modal-content').height()-120;
	var id = $(obj).attr('forPop');
	$('#'+id).find('div.pop-dropdown-wrap').height(heigh);	
	$('#'+id).fadeIn('fast', function() {
		$('.adl-pop-dropdown').animate({ 'top' : '76px' }, 500);
		});
}
function pop_dropdown_close(obj)
{	
	$('.adl-pop-dropdown').animate({ 'top': '-100%' }, 500);
}

/* for Menu list on Mouse Over*/
$(document).ready(function () {

    // var id = $(obj).attr('for-drop-menu');
    $('.adl-btn-head').mouseover(function () {

        var atr = $(this).attr('for-drop-menu');
        $('#' + atr).show();
        $('#' + atr).mouseover(function () {
            $(this).show();
            $(this).click(function () {
                $(this).hide();
            });
        });
    });
    $('.adl-btn-head').mouseout(function () {
        var atr = $(this).attr('for-drop-menu');
        $('#' + atr).hide();
        $('#' + atr).mouseout(function () {
            $(this).hide();
        });
    });
});

/********** ----- Tabbed Pannel  ---- **********/
function show_partner_health() {
   
    document.getElementById('adl-client-health').style.display = "none";
    document.getElementById('adl-partner-health').style.display = "block";
    document.getElementById('show_partner').setAttribute("class", "tab_selected col-10 control-label");
    document.getElementById('hide_client').removeAttribute("class", "tab_selected");
    document.getElementById('hide_client').setAttribute("class", "label_common col-10 control-label");

}
function show_client_health() {

    document.getElementById('adl-client-health').style.display = "block";
    document.getElementById('adl-partner-health').style.display = "none";
    document.getElementById('hide_client').setAttribute("class", "tab_selected col-10 control-label");
    document.getElementById('show_partner').removeAttribute("class", "tab_selected");
    document.getElementById('show_partner').setAttribute("class", "label_common col-10 control-label");
}
function show_partner_health_chrome() {
    
    document.getElementById('adl-client-health').style.display = "none";
    document.getElementById('adl-partner-health').style.display = "block";
    document.getElementById('show_partner').setAttribute("class", "chrome_tab_selected chrome_tab");
    document.getElementById('hide_client').removeAttribute("class", "chrome_tab_selected");
    document.getElementById('hide_client').setAttribute("class", "chrome_tab");
    document.getElementById('drop-arrow_chrome').style.display = "block";
   

}
function show_client_health_chrome() {

    document.getElementById('adl-client-health').style.display = "block";
    document.getElementById('adl-partner-health').style.display = "none";
    document.getElementById('hide_client').setAttribute("class", "chrome_tab_selected chrome_tab");
    document.getElementById('show_partner').removeAttribute("class", "chrome_tab_selected");
    document.getElementById('show_partner').setAttribute("class", "chrome_tab");
    document.getElementById('drop-arrow_chrome').style.display = "none";
   
}


/********** ----- Calculator Popup ---- **********/
function show_metric() {

    document.getElementById('pop_height').style.display = 'block';
}
function close_pop_height() {

    document.getElementById('pop_height').style.display = 'none';
}
function show_metric_width() {

    document.getElementById('pop_weight').style.display = 'block';
}
function close_pop_width() {

    document.getElementById('pop_weight').style.display = 'none';
}
/********** ----- fofa tr show hide ---- **********/


/********** ----- test model ---- **********/
/*function open_Model_t(obj)
{	
	$('div.adl-popup').hide();
	var id = $(obj).attr('forModel');
	$('#'+id).css('height',$(window).height()+'px');
	$('#'+id).fadeIn('fast', function() {
		$('.adl-modal-content').animate({ 'top' : '12%' }, 500);
		});
}
function adl_close()
{	
	$('.adl-modal-content').animate({ 'top': '-100%' }, 500, function () {
		$('div.adl-popup').fadeOut('fast');
		});
}*/

/* workflow popup */
//function open_Workflow() {
//    document.getElementById('tools_Workflow').style.display = 'block';
//}
//function close_pop() {
//    document.getElementById('tools_Workflow').style.display = 'none';
//}




/* --BY testing -----*/
/*jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } 
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
return this;
}
function open_Model(obj)
{	
	$('div.adl-modal').hide();
	var id = $(obj).attr('forModel');
	$('#'+id).css('height',$(window).height()+'px');
	$('#'+id).fadeIn('fast', function() {
		$('.adl-modal-content').animate(500).center(true);
		});   
}*/

function show_strength() {
    document.getElementById('adl-strength').style.display = "block";
    document.getElementById('adl-diff').style.display = "none";
    document.getElementById('adl-score').style.display = "none";
    document.getElementById('adl-map').style.display = "none";

    document.getElementById('hide_strength').setAttribute("class", "tab_selected col-10 control-label");
    document.getElementById('show_diff').removeAttribute("class", "tab_selected");
    document.getElementById('show_diff').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_score').removeAttribute("class", "tab_selected");
    document.getElementById('show_score').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_map').removeAttribute("class", "tab_selected");
    document.getElementById('show_map').setAttribute("class", "label_common col-10 control-label");
}
function show_diff() {
    document.getElementById('adl-strength').style.display = "none";
    document.getElementById('adl-diff').style.display = "block";
    document.getElementById('adl-score').style.display = "none";
    document.getElementById('adl-map').style.display = "none";

    document.getElementById('show_diff').setAttribute("class", "tab_selected col-10 control-label");
    document.getElementById('hide_strength').removeAttribute("class", "tab_selected");
    document.getElementById('hide_strength').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_score').removeAttribute("class", "tab_selected");
    document.getElementById('show_score').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_map').removeAttribute("class", "tab_selected");
    document.getElementById('show_map').setAttribute("class", "label_common col-10 control-label");

}
function show_score() {
    document.getElementById('adl-strength').style.display = "none";
    document.getElementById('adl-diff').style.display = "none";
    document.getElementById('adl-score').style.display = "block";
    document.getElementById('adl-map').style.display = "none";

    document.getElementById('show_score').setAttribute("class", "tab_selected col-10 control-label");
    document.getElementById('hide_strength').removeAttribute("class", "tab_selected");
    document.getElementById('hide_strength').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_diff').removeAttribute("class", "tab_selected");
    document.getElementById('show_diff').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_map').removeAttribute("class", "tab_selected");
    document.getElementById('show_map').setAttribute("class", "label_common col-10 control-label");

}
function show_map() {
    document.getElementById('adl-strength').style.display = "none";
    document.getElementById('adl-diff').style.display = "none";
    document.getElementById('adl-score').style.display = "none";
    document.getElementById('adl-map').style.display = "block";

    document.getElementById('show_map').setAttribute("class", "tab_selected col-10 control-label");
    document.getElementById('hide_strength').removeAttribute("class", "tab_selected");
    document.getElementById('hide_strength').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_diff').removeAttribute("class", "tab_selected");
    document.getElementById('show_diff').setAttribute("class", "label_common col-10 control-label");
    document.getElementById('show_score').removeAttribute("class", "tab_selected");
    document.getElementById('show_score').setAttribute("class", "label_common col-10 control-label");

}



