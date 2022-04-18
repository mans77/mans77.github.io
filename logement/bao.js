(function( window, undefined ) {
	// Define a local copy of "Bao"
	Bao = function() {},

	window.bao = Bao;

	// Expose Bao as an AMD module
	if ( typeof define === "function" && define.amd ) {
		define( "Bao", [], function () { return Bao; } );
	}
})( window );