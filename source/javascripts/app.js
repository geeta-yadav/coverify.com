//= require "jquery"
//= require "bootstrap"

$(document).ready(function() { 
    $('.dropdown-toggle').dropdown();
    Socialite.load();
    
    var sidebar = $('body article .sidebar');
    var content = $('body article .content');

    // Bind the floating sidebar  
    var sidebarFloat = $('body article .sidebar-float');
    if (sidebarFloat.length) {
	var isTop, 
	    isHidden = false, 
	    topOffset = sidebarFloat.offset().top, 
	    bottomLimit;

	$(window).bind('scroll', function() {
	    bottomLimit = content.height() + topOffset - sidebar.height();
	    
	    if ($(this).scrollTop() >= bottomLimit) {
		//console.log('hide float sidebar');
		sidebarFloat.hide()
		isHidden = true;
	    }
	    else if ($(this).scrollTop() >= topOffset) {
		if (isHidden) {
		    isHidden = false;
		    sidebarFloat.show();
		}
		if (!isTop) {
		    isTop = true;
		    sidebarFloat.addClass('float');
		}
	    }
	    else if (isTop && $(this).scrollTop() <= topOffset) {
		//console.log('unfloat sidebar');
		if (isTop) {
		    isTop = false;
		    sidebarFloat.removeClass('float');
		}
	    }
	});
    }

    // Bind the toc
    var toc = $('.toc', sidebar)
    if (toc.length) {
	toc.find('h4').append('<a href="#top">&uArr;</a>')
	toc.find('ul#markdown-toc > li').each(function(i) {
	    var e = $(this)
	    var l = e.children('ul')
	    if (l.length) {
		var t = $('<a href="#" class="toggle"><span class="open">&dArr;</span><span class="close">&lArr;</span></a>')
		t.click(function() {
		    //l.slideToggle()
		    e.toggleClass('closed')
		    return false;
		})
		e.prepend(t)
		if (i > 0)
		    e.addClass('closed')
	    }
	    //console.log(l.length)
	})
	    }
});
