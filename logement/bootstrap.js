requirejs.config({
	paths: {
		// libraries path
		"bao": "libs/bao",
		"jquery": "libs/jquery/jquery-2.1.1.min",
		"jquery-ui": "libs/jquery/ui/jquery-ui-1.10.4.custom.min",
		"class": "libs/class",
		"jquery-ui-timepicker": "libs/jquery/plugins/jquery.ui-timepicker.min",
		"jquery-ui-datepicker-fr": "libs/jquery/locales/jquery-ui-datepicker-fr",
		"jquery-ui-timepicker-fr": "libs/jquery/locales/jquery-ui-timepicker-fr",
		"alteo-autocomplete": "libs/alteo/autocomplete",
		"alteo-confirm": "libs/alteo/confirm",
		"alteo-datepicker": "libs/alteo/datepicker",
		"alteo-slugify": "libs/alteo/slugify",
		"alteo-sortable": "libs/alteo/sortable",
		"alteo-dynamic-cart": "modules/cart/dynamic-cart",
		"alteo-jquery-ui-catcomplete": "libs/alteo/jquery-ui-catcomplete",
		"async" : "libs/requirejs/async",
		"alteo-googlemap-geolocation": "libs/alteo/googlemap-geolocation",
		"jquery-infinitescroll": "libs/jquery/plugins/jquery.infinitescroll.min",
		"respond" : "libs/respond.min",
		"enquire": "libs/enquire",
		"bxslider": "libs/jquery/plugins/jquery.bxslider.min",
		'matchHeight': 'libs/jquery/plugins/jquery.matchHeight-min',
		"select2": "libs/select2.min",
		"select2-fr": "libs/select2/i18n/fr",
		"tinymce": "tinymce",
		"alteo-tinymce": "libs/alteo/tinymce",
		"waypoints": "libs/jquery/plugins/jquery.waypoints.min",
		"waypoints-infinite": "libs/jquery/plugins/jquery.waypoints.infinite.alteo"
	},
	// The shim section allows you to specify
	// dependencies between non AMD compliant files
	// "somejqueryplugin" must be loaded after "jquery" for example.
	// The "exports" attribute tells requirejs what global variable
	// it must assign as the module value for each shim.
	// For example: By using the configutation below for jquery,
	// when you request the "jquery" module, requirejs will
	// give the value of global "$" (this value will be cached, so it is
	// ok to modify/delete the global "$" after all plugins are loaded.
	shim: {
		"main": { deps: ["bao", "config", "jquery"] },
		"bao": { exports: "bao" },
		"config": { deps: ["bao"] },
		"jquery": { exports: "$" },
		"jquery-ui": { deps: ["jquery"] },
		"jquery-ui-datepicker-fr": { deps: ["jquery-ui"] },
		"jquery-ui-timepicker": { deps: ["jquery-ui"] },
		"jquery-ui-timepicker-fr": { deps: ["jquery-ui-timepicker"] },
		"alteo-datepicker": { deps: ["class", "modernizr", "jquery-ui-datepicker-fr", "jquery-ui-timepicker-fr"] },
		"alteo-dynamic-cart": { deps: ["class"] },
		"alteo-jquery-ui-catcomplete": { deps: ["jquery-ui"] },
		"alteo-googlemap-geolocation": { deps: ["class", "async"] },
		"enquire": { deps : ['respond'] },
		"bxslider": { deps: ["jquery"] },
		'matchHeight': { deps: ['jquery'] },
		"select2-fr": { deps: ["select2"] },
		"tinymce": { deps: ["jquery"] },
		"alteo-tinymce": { deps: ["class", "jquery-ui", "libs/tinymce/jquery.tinymce.min"] },
		"waypoints-infinite": { deps: ["waypoints"] }
	},
	urlArgs: "2018110701"
});

define("modernizr", [], Modernizr);

require(["main", "modernizr"], function() {
	var module = document.querySelector("script[data-main][data-module]");
	if (module) {
		require([module.getAttribute("data-module") || module.dataset.module]);
	}
});
