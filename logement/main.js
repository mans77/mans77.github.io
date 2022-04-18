define(function(require, exports, module) {
	"use strict";

	// Initialisation des datepickers
	require("alteo-datepicker")({
		dateFormat: Bao.dateFormat,
		displayDateFormat: Bao.dateFormat
	});

	// Moteur de recherche
	require("modules/residences/search-engine");

	require("matchHeight");

	require("enquire");

	$(function() {

		$("a[href='#top']").click(function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});

		/* nav-mobile-search */
		$('.js-dropdown-search').click(function()
		{
			if ($('.js-nav-mobile-search').hasClass('active')) {
				$('.js-nav-mobile-search').removeClass('active');
				$('.js-dropdown-search').removeClass('active');
			}
			else {
				$('.js-nav-mobile-search').addClass('active');
				$('.js-dropdown-search').addClass('active');
			}
		});

		/* Match Height */
		if($('.login-box').matchHeight) {
			$('.login-box').matchHeight(true);
		}

		if($('.box-residence-services').matchHeight) {
			$('.box-residence-services').matchHeight(true);
		}

		/* popin selection-list */
		$(".js-popin-selection-close").on("click", function() {
			$("[data-container=container]").removeClass("active");
		});

		$(".js-popin-selection-open").on("click", function() {
			$("[data-container=container]").addClass("active");
		});

		/* input file upload */
		$(".input-file").on("change", function() {
			var filename = $(this).val().split('\\').pop();
			$(this).siblings(".input-file-js-return").html(filename);
		});

		/* date picker sur icône calendrier */
		$(".wrap-input-calendar").each(function(i, wrapInputDate){
			$(wrapInputDate).find(".i-calendar").on("click", function() {
				$(wrapInputDate).find(".hasDatepicker").focus();
			});
		});

		enquire.register("only screen and (max-width:1024px)", {
				match : function() {
					$('.tinymce').removeAttr('data-tinymce');
				}
		 });

		// slide pour les langues
		$(".lang").on("click", "[data-locale-region]", function() {
			var $this = $(this),
				$slide = $this.parents('.lang').find('ul');
			if($slide.is(':visible')) {
				$slide.slideUp();
			} else {
				$slide.slideDown();
			}
			return false;
		});

	}); // fin de function $();
});
