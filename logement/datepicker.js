define(function(require, exports, module) {
	"use strict";

	var DatePicker = Class.extend({
		init: function(options) {
			$("[type=date],[type=datetime],[type=datetime-local]").each(function() {
				var $this = $(this);

				if ($this.data("datepicker-initialize")) {
					return true; // continue equivalent
				}

				var value		= $this.val();
				var type		= $this.attr('type');
				var pickerType	= (type !== 'text') ? type : $this.data("datepicker");
				var min			= (type !== 'text') ? $this.attr('min') : $this.data("datepicker-min");
				var max			= (type !== 'text') ? $this.attr('max') : $this.data("datepicker-max");

				// if (type !== 'text') {
					// if(Modernizr.inputtypes.date) {
						// return true; // continue equivalent
					// }
					// if(Modernizr.inputtypes.datetime || Modernizr.inputtypes["datetime-local"]) {
						// return true; // continue equivalent
					// }
				// }
				
				if(Modernizr.inputtypes[pickerType]) {
                    return true; // continue equivalent
                }

				var $alternate	= $this.clone();

				$alternate
					.removeAttr("data-datepicker")
					.removeAttr("class")
					.attr("name", $this.attr("name"))
					.attr("id", $this.attr("id"))
					.hide()
					.insertAfter($this);

				$this
					.attr("name", $this.attr("name") + "_datepicker")
					.attr("id", $this.attr("id") + "_datepicker")
					.data("datepicker-initialize", true);

				var options = {
					altField: $alternate,
					altFormat: "yy-mm-dd",
					changeYear: true,
					changeMonth: true,
					constrainInput: true,
					dateFormat: "dd/mm/yy",
					yearRange: "c-90:c+20"
				};

				var dateFormat = "yy-mm-dd";
				var displayDateFormat = "dd/mm/yy";
				var timeFormat = "HH:mm:ss";
				var dateParse= null;
				var timeParse = null;

				if (pickerType === 'date') {
					dateParse = $.datepicker.parseDate(dateFormat, value);
					if (dateParse) {
						$this.val($.datepicker.formatDate(displayDateFormat, dateParse));
						$alternate.val(value);
					}

				} else {
					var valueSplit = value.split("T");
					if (valueSplit[0] && valueSplit[1]) {
						dateParse = $.datepicker.parseDate(dateFormat, valueSplit[0]);
						timeParse = $.datepicker.parseTime(timeFormat, valueSplit[1]);
					}
					if (dateParse && timeParse) {
						$this.val($.datepicker.formatDate(displayDateFormat, dateParse) + " " + $.datepicker.formatTime(timeFormat, timeParse));
						$alternate.val(value);
					}
				}

				if (min) {
					$.extend(options, {
						minDate: (pickerType === 'date') ?
							$.datepicker.parseDate(dateFormat, min) :
							$.datepicker.parseDateTime(dateFormat, timeFormat, min)
					});
				}
				if (max) {
					$.extend(options, {
						maxDate: (pickerType === 'date') ?
							$.datepicker.parseDate(dateFormat, max) :
							$.datepicker.parseDateTime(dateFormat, timeFormat, max)
					});
				}

				switch (pickerType) {
					case "date":
						$this.datepicker(options);

						break;
					case "datetime":
					case "datetime-local":
						$.extend(options, {
							altFieldTimeOnly: false,
							alwaysSetTime: false,
							"timeFormat": timeFormat
						});

						$this.datetimepicker(options);

						break;
				}

				$this.on("blur change", function() {
					var $this = $(this);
					var displayValue = $this.val();
					var alternateValue = "";

					try {
						if ($this.attr('type') === 'date') {
							dateParse = $.datepicker.parseDate(displayDateFormat, displayValue);
							if (dateParse) {
								alternateValue = $.datepicker.formatDate(dateFormat, dateParse);
							}
						} else {
							var displayValueSplit = displayValue.split(" ");
							if (!displayValueSplit[1]) {
								displayValueSplit[1] = "00:00:00";
							}
							dateParse = $.datepicker.parseDate(displayDateFormat, displayValueSplit[0]);
							timeParse = $.datepicker.parseTime(timeFormat, displayValueSplit[1]);
							if (dateParse && timeParse) {
								alternateValue = $.datepicker.formatDate(dateFormat, dateParse) + "T" + $.datepicker.formatTime(timeFormat, timeParse);
							}
						}

						$alternate.val(alternateValue);
					} catch (e) {
						$alternate.val("");
					}
				});
			});
		}
	});

	return function(options) {
		return new DatePicker(options);
	};
});
