var j = jQuery.noConflict();

j(function(){
	j('#header .search-toggle').click(function() {
		j('#header #search-form-wrapper').fadeToggle('slow');
	});

	j('#header #primary-nav-toggle').click(function() {
		j('#header #primary-nav').slideToggle('slow');
	})

	j(window).scroll(function () {
		if (j(window).scrollTop() != 0) {
			j('#header').addClass('header-fixed');
		} else {
			j('#header').removeClass('header-fixed');
		}
	});

	if (j('#slider .slides').length) {
		j('#slider .slides').cycle({ 
			fx:     'scrollLeft', 
			speed:  '400',
			timeout: '6000', 
			pager:  '#slider-nav ul',
			pagerEvent: 'hover',
			allowPagerClickBubble: true,
	        pagerAnchorBuilder: function(idx, slide) {
	            // return sel string for existing anchor
	            return '#slider-nav ul li:eq(' + (idx) + ') a';
	        }
		});
	}
	
	/* ****************************
	    Responsive MegaMenu System
	******************************* */
	j('#primary-nav > .region-main-menu > ul > li > a[rel]').parent('li').addClass('has-megamenu');
	var megamenuParents = j('#primary-nav li.has-megamenu');
	megamenuParents.each(function() {
		var megamenuid = j('a',this).attr('rel'),
			megamenu = j(megamenuid)[0].outerHTML;
		j(megamenu).appendTo(this);
	});

	if (isTouchDevice()) {
		megamenuParents.click(function() {
			var clickedMenu = j(this);
			if (clickedMenu.hasClass('active-megamenu-li')) {
				j(this).removeClass('active-megamenu-li').children('.megamenu').hide(0);
				j('#header').removeClass('megamenu-open');
				return false;
			} else {
				megamenuParents.removeClass('active-megamenu-li').children('.megamenu').hide(0);
				j(this).addClass('active-megamenu-li').children('.megamenu').show(0);
				j('#header').addClass('megamenu-open');
				return false;
			}
		});
	} else {
		megamenuParents.on({
			mouseenter: function() {
	    		j(this).addClass('active-megamenu-li').children('.megamenu').show(0);
				j('#header').addClass('megamenu-open');
			}, mouseleave: function() {
				j(this).removeClass('active-megamenu-li').children('.megamenu').hide(0);
				j('#header').removeClass('megamenu-open');
			}
		});
	}

	// Tabs
	j('.crucial-tabs a').click(function(){
		switch_tabs(j(this));
		return false;
	});
	switch_tabs(j('.defaulttab'));	
});

function switch_tabs(obj) {
	j('.tab-content').css({'display': 'none'});
	j('.crucial-tabs a').removeClass('selected');
	var id = obj.attr('rel');
	
	j('#'+id).css({'display': 'block'});
	obj.addClass('selected');
}

function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}