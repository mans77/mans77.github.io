define(function(require, exports, module) {
	"use strict";

	require("alteo-jquery-ui-catcomplete");

	$(function() {
		var $scope = $("[data-search-engine=form]");

		if (0 < $scope.length) {
			var $autocompleteFields	= $("[data-autocomplete-field]", $scope);
			var $fieldsId			= $autocompleteFields.filter("[data-autocomplete-field]");

			$("[data-autocomplete=city-school]", $scope).catcomplete({
				minLength: 3,
				delay: 300,
				messages: {
					noResults: "",
					results: function() {}
				},
				source: function(request, response) {
					$.ajax({
						url: bao.baseUrl + "rechercher-villes-ecoles.json",
						type: "post",
						dataType: "json",
						data: {
							query: request.term
						}
					}).done(function(data) {
						response($.map(data, function(item) {
							return item;
						}));
					});
				},
				select: function(event, ui) {
					var item	= ui.item;
					var $field	= $autocompleteFields.filter("[data-autocomplete-field=" + item.type + "]");

					$autocompleteFields.val("");
					$field.val(item.id);

					$(this).val(item.value);

					return false;
				}
			}).on("keyup", function (e) {
				if (13 === e.which) {
					return;
				}

				if (5 > this.value.length) {
					$fieldsId.val("");
				}
			});
		}

		/* Moteur de recherche : budget */
		var $sliderRangeBudget		= $("#slider-range-budget");
		var $minimumBudget			= $("#minimum_budget");
		var $minimumBudgetInvisible	= $("#minimum_budget_invisible");
		var $maximumBudget			= $("#maximum_budget");
		var $maximumBudgetInvisible	= $("#maximum_budget_invisible");
		var $budgetValues			= $('.wrap-budget-value');

		$sliderRangeBudget.slider({
			range: true,
			min: 0,
			max: $maximumBudget.data("max"),
			values: [$minimumBudgetInvisible.val(), $maximumBudgetInvisible.val()],
			slide: function(event, ui) {
				$minimumBudget.val(ui.values[0] + " €");
				$minimumBudgetInvisible.val(ui.values[0]);
				$maximumBudget.val(ui.values[1] + " €");
				$maximumBudgetInvisible.val(ui.values[1]);
			}
		});

		$minimumBudget.val($sliderRangeBudget.slider("values", 0) + " €");
		$minimumBudgetInvisible.val($sliderRangeBudget.slider("values", 0));
		$maximumBudget.val($sliderRangeBudget.slider("values", 1) + " €");
		$maximumBudgetInvisible.val($sliderRangeBudget.slider("values", 1));

		$budgetValues.css('display', 'block');

		/* Moteur de recherche : area */
		var $sliderRangeArea		= $("#slider-range-area");
		var $minimumArea			= $("#minimum_area");
		var $minimumAreaInvisible	= $("#minimum_area_invisible");
		var $maximumArea			= $("#maximum_area");
		var $maximumAreaInvisible	= $("#maximum_area_invisible");
		var $areaValues				= $('.wrap-area-value');

		$sliderRangeArea.slider({
			range: true,
			min: 0,
			max: $maximumArea.data("max"),
			values: [$minimumAreaInvisible.val(), $maximumAreaInvisible.val()],
			slide: function(event, ui) {
				$minimumArea.val(ui.values[0] + " m²");
				$minimumAreaInvisible.val(ui.values[0]);
				$maximumArea.val(ui.values[1] + " m²");
				$maximumAreaInvisible.val(ui.values[1]);
			}
		});

		$minimumArea.val($sliderRangeArea.slider("values", 0) + " m²");
		$minimumAreaInvisible.val($sliderRangeArea.slider("values", 0));
		$maximumArea.val($sliderRangeArea.slider("values", 1) + " m²");
		$maximumAreaInvisible.val($sliderRangeArea.slider("values", 1));

		$areaValues.css('display', 'block');
	});
});
