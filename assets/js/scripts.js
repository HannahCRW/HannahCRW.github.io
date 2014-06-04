
function check_top_menu() {
	if($('nav').css('position') != 'static') { // window width > 767px
		var top_h = $('.top-content').height();
		var nav_h = $('nav').height();
		var nav_h_string = "-" + nav_h + "px";
		if($(window).scrollTop() >= top_h - nav_h) { $('nav').stop().animate({top: 0}, 100); }
		else if($(window).scrollTop() < top_h - nav_h) { $('nav').stop().animate({top: nav_h_string}, 100); }
	}
}

function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		scroll_to = $(element_class).offset().top - nav_height - 60;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}

$(document).ready(function() {
	
    /*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		var nav_height = $('nav').height();
		if($('nav').css('position') != 'static') { // window width > 767px
			scroll_to($(this), nav_height);
		}
		else {
			scroll_to($(this), 0);
		}
	});
	
	$('.show-menu a').on('click', function(e){
		e.preventDefault();
		var menu_links = $('.nav-links a').not('.nav-links .show-menu a');
		if(menu_links.css('display') == 'none') {
			menu_links.css('display', 'inline-block');
		}
		else {
			menu_links.css('display', 'none');
		}
	});
	
	/*
	    Sticky top menu
	*/
	check_top_menu();
	$(window).on('scroll', function(){ check_top_menu(); });
	
	$(window).on('resize', function(){
		var menu_links = $('.nav-links a').not('.nav-links .show-menu a');
		if($('nav').css('position') != 'static') { // window width > 767px
			menu_links.css('display', 'inline-block');
		}
		else {
			menu_links.css('display', 'none');
		}
		check_top_menu();
	});
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch([
      "assets/img/backgrounds/sublimetextbackground.jpg", 
      "assets/img/backgrounds/cathodebackground.jpg", 
      "assets/img/backgrounds/medicodebackground.jpg"
    ], {duration: 3000, fade: 750});
    
    $('.lets-talk').backstretch("assets/img/backgrounds/sublimetextbackground.jpg");
    $('.service-1').backstretch("assets/img/backgrounds/cathodebackground.jpg");
    $('.service-3').backstretch("assets/img/backgrounds/medicodebackground.jpg");
    $('.our-motto').backstretch("assets/img/backgrounds/sublimetextbackground.jpg");
    $('.latest-tweets').backstretch("assets/img/backgrounds/cathodebackground.jpg");
    $('.skills-container').backstretch("assets/img/backgrounds/sublimetextbackground.jpg");
    
    /*
        Testimonials
    */
    $('.testimonial-active').html('<p>' + $('.testimonial-single:first p').html() + '</p>');
    $('.testimonial-single:first .testimonial-single-image img').css('opacity', '1');
    
    $('.testimonial-single-image img').on('click', function() {
    	$('.testimonial-single-image img').css('opacity', '0.5');
    	$(this).css('opacity', '1');
    	var new_testimonial_text = $(this).parent('.testimonial-single-image').siblings('p').html();
    	$('.testimonial-active p').fadeOut(300, function() {
    		$(this).html(new_testimonial_text);
    		$(this).fadeIn(400);
    	});
    });
    
    /*
	    Our skills
	*/
	$('.skills-active').html('<p>' + $('.skills-single:first p').html() + '</p>');
	$('.skills-single:first .skills-single-icon').addClass('active');
	
	$('.skills-single-icon').on('click', function() {
		$('.skills-single-icon').removeClass('active');
		$(this).addClass('active');
		var new_skills_text = $(this).siblings('p').html();
		$('.skills-active p').fadeOut(300, function() {
			$(this).html(new_skills_text);
			$(this).fadeIn(400, function() {
    			// reload background
    			$('.skills-container').backstretch("resize");
    		});
		});
	});
    
    /*
	    Show latest tweets
	*/
	$('.latest-tweets .tweets').tweet({
		modpath: 'assets/twitter/',
		username: 'anli_zaimi',
		page: 1,
		count: 5,
		loading_text: 'loading ...'
	});
	
	$('.latest-tweets .tweets .tweet_list li').append('<span class="tweet_nav"></span>');
	$('.latest-tweets .tweets .tweet_list li:first .tweet_nav').css('background', '#fff');
	$('.latest-tweets .tweets .tweet_list li .tweet_time').hide();
	$('.latest-tweets .tweets .tweet_list li .tweet_text').hide();
	$('.latest-tweets .tweet-active').html($('.latest-tweets .tweets .tweet_list li:first .tweet_text').html());

	$('.latest-tweets .tweets .tweet_list li .tweet_nav').on('click', function() {
		$('.latest-tweets .tweets .tweet_list li .tweet_nav').css('background', 'rgba(255, 255, 255, 0.6)');
		var clicked_tweet_nav = $(this);
    	var new_tweet_text = clicked_tweet_nav.siblings('.tweet_text').html();
    	$('.latest-tweets .tweet-active').fadeOut(300, function() {
    		$(this).html(new_tweet_text);
    		$(this).fadeIn(400, function() {
    			// reload background
    			$('.latest-tweets').backstretch("resize");
    		});
    	});
    	clicked_tweet_nav.css('background', '#fff');
    });
	
	/*
	    Google maps
	*/
	var position = new google.maps.LatLng(45.067883, 7.687231);
	$('.contact-address .map').gmap({'center': position, 'zoom': 15, 'disableDefaultUI':true, 'callback': function() {
	        var self = this;
	        self.addMarker({'position': this.get('map').getCenter() });	
	    }
	});

    /*
        Subscription form
    */
    $('.success-message').hide();
    $('.error-message').hide();

    $('.subscribe form').submit(function(e) {
    	e.preventDefault();
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: 'assets/subscribe.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn();
                }
                else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe form').hide();
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn();
                }
            }
        });
    });
    
    /*
	    Contact form
	*/
    $('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
    	$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
    });
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('contact-error');
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('contact-error');
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('contact-error');
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                });
	            }
	        }
	    });
	});

    
});


$(window).load(function(){
    /*
	    Portfolio
	*/
	$('.portfolio-masonry').masonry({
		columnWidth: '.portfolio-box', 
		itemSelector: '.portfolio-box',
		transitionDuration: '0.5s'
	});
	
	$('.portfolio-filters a').on('click', function(e){
		e.preventDefault();
		if(!$(this).hasClass('active')) {
	    	$('.portfolio-filters a').removeClass('active');
	    	var clicked_filter = $(this).attr('class').replace('filter-', '');
	    	$(this).addClass('active');
	    	if(clicked_filter != 'all') {
	    		$('.portfolio-box:not(.' + clicked_filter + ')').css('display', 'none');
	    		$('.portfolio-box:not(.' + clicked_filter + ')').removeClass('portfolio-box');
	    		$('.' + clicked_filter).addClass('portfolio-box');
	    		$('.' + clicked_filter).css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
	    	else {
	    		$('.portfolio-masonry > div').addClass('portfolio-box');
	    		$('.portfolio-masonry > div').css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
		}
	});
	
	// image popup	
	$('.portfolio-box-text').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.find('h3').text();
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.parent('.portfolio-box-text-container').siblings('img').attr('src');
			}
		}
	});
	
	$(window).on('resize', function(){ $('.portfolio-masonry').masonry(); });
});

