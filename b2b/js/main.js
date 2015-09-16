function hasLogined() {
	if(typeof(Storage)!=="undefined") {
		return localStorage.i_login == 'true';
	}else{
		// For ie6 or other browser without localStorage.
		if(getCookie("i_login")!="undefined"){
			return getCookie("i_login") == "true";
		}
	}
	return true;
}
//write cookies
function setCookie(name, value) {
	var Days = 365; //this cookie will keeps 365 days
	var exp = new Date(); //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//Read cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return (arr[2]);
	else {
		return null
	}
}

function check_link(e) {
	var self = $(this);

	if(!hasLogined()) {
		var href = self.attr('href');

		$('form .alert-warning').show();
		if(href) {
			$('form').attr('href', href);
		}
		$('#form').css('background-color', '#EAA');

		var target = $('form')[0];
		$('html, body').animate({scrollTop: $(target).offset().top - 10}, 300);

		e.preventDefault();
	}
}

$(document).ready(function() {
	// thow thanks box after submission
	//if("?thanks" == window.location.search) {
	//	$('.thanks').show();
	//}

	$("[name='from_industry']").on('change', function() {
		var self = $(this);
		var show = (this.selectedIndex == $('option', self).length - 1);

		if(show) {
			$('.from_industry_other').attr("style", "display: block !important");
		} else {
			$('.from_industry_other').attr("style", "display: none !important");
		}
	});

	$('#videos a, #files a').click(check_link);

	if(!hasLogined()) {
		$('.need_login').each(function() {
			var self = $(this);
			var w = self.width();
			var h = self.height();
			$("<div class='hook_for_to_need_login' style='position:absolute;margin-top:-" + h + "px;width:" + w + "px;height:"+ h + "px;background-color:#fff;opacity:0;filter:alpha(opacity=1)' ></div>")		
			.insertAfter(self)
			.click(check_link);

		});
	}

	$("[href='#form']").click(function(e) {
		e.preventDefault();

		$('html, body').animate({scrollTop: $('#form').offset().top - 80}, 300);
	});

	$('form').bootstrap3Validate(function(e, data) {
		e.preventDefault();

		var self = $(this);

		$('.progress', self).show();
		$("[type='submit']", self).hide();

		data.referer = location.href;

		$.ajax({
			url: 'thanks.php',
			type : "post",
			data: data
		})
		.done(function() {
			if(typeof(Storage)!=="undefined") {
				localStorage.i_login = 'true';
			}else{
				setCookie("i_login","true");// For ie6 or other browser without localStorage.
			}
			if($(self).attr('href')) {
				window.location = $(self).attr('href');
			}
			// clear form
			self.get(0).reset();
			
			$('.alert-success', self).show();
			$('.hook_for_to_need_login').remove();

			// redirect to other page
			window.location.assign('thanks.html');
		})
		.fail(function() {
			$('.alert-danger', self).text('提交失败').show();
		})
		.always(function() {
			$('.progress', self).hide();
			$("[type='submit']", self).show();
		});

	});

	// touch support
	if(jQuery().swipe) {
		$(".carousel-inner").swipe( {
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('next');
			},
			swipeRight: function() {
				$(this).parent().carousel('prev');
			},
			threshold:0
		});
	}
});
