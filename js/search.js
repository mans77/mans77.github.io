/*Scroll*/
var heaSearchPC = $(".search-main-container .search-container-overlay");

$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $(heaSearchPC).addClass("on-scroll");
    } else {
        $(heaSearchPC).removeClass("on-scroll");
    }
});


/*Switch de catégories*/
function switchSearchCat(order) {
    var searchMainContainer = $('.search-main-container');

    if (order == "coach") {
        $(searchMainContainer).removeClass("school");
        $(searchMainContainer).removeClass("entreprise");
        $(searchMainContainer).addClass("coach");
        $('#search-content').attr("placeholder", "Recherchez une matière. Ex : Maths, Anglais, Français...");
        window.location.href = "/recherche/cours-particuliers";
    } else if (order == "school") {
        $(searchMainContainer).removeClass("coach");
        $(searchMainContainer).removeClass("entreprise");
        $(searchMainContainer).addClass("school");
        $('#search-content').attr("placeholder", "Recherchez une école, une formation, un diplôme...");
        window.location.href = "/recherche/etablissement";
    } else if (order == "entreprise") {
        $(searchMainContainer).removeClass("school");
        $(searchMainContainer).removeClass("coach");
        $(searchMainContainer).addClass("entreprise");
        $('#search-content').attr("placeholder", "Recherchez un job, une entreprise, un domaine...");
    }
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
}

/*Slider Range*/
var maxTarifSlide = $("#coach-max-price").val();

function initializePriceSlider(maxValue) {
    $(".price-range-slider").slider({
        range: true,
        min: 0,
        max: maxValue,
        values: [0, maxValue],
        slide: function (event, ui) {
            $("#coach-min-price").val(ui.values[0]);
            $("#pc-coach-min-number-price").val(ui.values[0]);
            $("#mobile-coach-min-number-price").val(ui.values[0]);
            $("#coach-max-price").val(ui.values[1]);
            $("#pc-coach-max-number-price").val(ui.values[1]);
            $("#mobile-coach-max-number-price").val(ui.values[1]);
            hidePricesBars(((ui.values[0] * 100) / maxValue), ((ui.values[1] * 100) / maxValue));
            priceTemoin($(this), 0, maxValue, ui.values[0], ui.values[1]);
            if(ui.values[0] == 0 && ui.values[1] == 0)
            {
                $(".check-benevoles").prop("checked", true);
            }
            else 
            {
                $(".check-benevoles").prop("checked", false);
            }
        },
        change: function (event, ui) {
            $("#coach-min-price").val(ui.values[0]);
            $("#pc-coach-min-number-price").val(ui.values[0]);
            $("#mobile-coach-min-number-price").val(ui.values[0]);
            $("#coach-max-price").val(ui.values[1]);
            $("#pc-coach-max-number-price").val(ui.values[1]);
            $("#mobile-coach-max-number-price").val(ui.values[1]);
            hidePricesBars(((ui.values[0] * 100) / maxValue), ((ui.values[1] * 100) / maxValue));
            priceTemoin($(this), 0, maxValue, ui.values[0], ui.values[1]);
            if(ui.values[0] == 0 && ui.values[1] == 0)
            {
                $(".check-benevoles").prop("checked", true);
            }
            else 
            {
                $(".check-benevoles").prop("checked", false);
            }
        }
    });
}
initializePriceSlider(maxTarifSlide);


/*Barres des tarifs*/
function hidePricesBars(minValue, maxValue) {
    var pcBars = $('.filter-content .price-list.pc li');
    var mobileBars = $('.filter-content .price-list.mobile li');
    var leftNeedToHide = (pcBars.length * minValue) / 100;
    var rightNeedToHide = (pcBars.length * (100 - maxValue)) / 100;
    $(pcBars).removeClass("disabled");
    $(mobileBars).removeClass("disabled");
    for (var i = 0; i < leftNeedToHide; i++) {
        $(pcBars[i]).addClass("disabled");
        $(mobileBars[i]).addClass("disabled");
    }

    for (var x = pcBars.length; x >= pcBars.length - rightNeedToHide; x--) {
        $(pcBars[x]).addClass("disabled");
        $(mobileBars[x]).addClass("disabled");
    }
}

function priceInput(type, element) {
    if (type == "min") {
        if ($(element).val() <= $("#coach-max-price").val()) {
            $(".price-range-slider").slider('values', 0, $(element).val());
        } else {
            $(element).val($("#coach-min-price").val());
            $(".price-range-slider").slider('values', $("#coach-min-price").val(), 0);
        }
    } else {
        if ($(element).val() >= $("#coach-min-price").val()) {
            $(".price-range-slider").slider('values', 1, $(element).val());
        } else {
            $(element).val($("#coach-max-price").val());
            $(".price-range-slider").slider('values', $("#coach-max-price").val(), 1);
        }
    }
}

/*Filtres disponibilité*/
function swtichDispoFilter(element, order) {
    var calendarContainer = $('.calendar-container');
    var byDaysContainer = $('.by-days-container');
    var btnSwitch = $('.filter-content .filter-dispo-container .filter-dispo-switch .filter-dispo-switch-item');
    if (order == "date") {
        $(btnSwitch).removeClass("active");
        $(element).addClass("active");
        $(calendarContainer).show();
        $(byDaysContainer).hide();
    } else {
        $(btnSwitch).removeClass("active");
        $(element).addClass("active");
        $(byDaysContainer).show();
        $(calendarContainer).hide();
    }
}

/*Ouverture des filtres*/


function openPCFilters(element) {
    var allFilters = $('.search-main-container .filters-container .filters-list-container .filters-list li');
    var filterParent = $(element).parent();

    if ($(filterParent).hasClass('open')) {
        $(allFilters).removeClass('open');
    } else {
        $(allFilters).removeClass('open');
        $(filterParent).addClass('open');
    }
}

/*Fermeture des filtres lors d'un clic a l'extérieur*/
$(document).on('click', function (event) {
    var allFilters = $('.search-main-container .filters-container .filters-list-container .filters-list li');
    if (!$(event.target).closest('.filter-item').length && window.innerWidth >= 1100 && !$(event.target).closest('.filter-matiere-tag').length) {
        $(allFilters).removeClass('open');
    }
});

/*Ouverture des sous catégories des filtres*/
$('.cases-list-group-title').on('click', function (event) {

    if ($(this).parent().hasClass('open')) {
        $('.filter-content .cases-list-group').removeClass('open');
    } else {
        $('.filter-content .cases-list-group').removeClass('open');
        $(this).parent().addClass('open');
    }
});

/*Témoin des filtres*/

 $('.filter-content input').on('change', function () {
     var filterContent = $(this).closest('.filter-content');
     var filterItem = $(filterContent).closest('.filter-item');
     if ($(filterContent).find('input:checked').length > 0) {
         $(filterItem).addClass('active');
         $('.search-main-container .filters-container .delete-filters').addClass('visible');
     } else {
         $(filterItem).removeClass('active');
         $('.search-main-container .filters-container .delete-filters').removeClass('visible');
     }
 });

$('.filter-content .filter-content-reset .reset').on('click', function () {
    var filterContent = $(this).closest('.filter-content');
    var filterItem = $(filterContent).closest('.filter-item');
    $(filterContent).find('input').prop("checked", false);
    $(filterContent).find('input').val("");
    $(filterItem).removeClass('active');
    $('.search-main-container .filters-container .delete-filters').removeClass('visible');
});

$('.filter-content .filter-content-reset .reset.price').on('click', function () {
    var filterContent = $(this).closest('.filter-content');
    var filterItem = $(filterContent).closest('.filter-item');
    $(".price-range-slider").slider('values', 1, maxTarifSlide);
    $(".price-range-slider").slider('values', 0, 0);
    $(filterItem).removeClass('active');
    $('.search-main-container .filters-container .delete-filters').removeClass('visible');
});

function priceTemoin(element, minValue, maxValue, currentMin, currentMax) {
    if (maxValue > currentMax || minValue < currentMin) {
        $(element).closest('.filter-item').addClass('active');
        $('.search-main-container .filters-container .delete-filters').addClass('visible');
    } else {
        $(element).closest('.filter-item').removeClass('active');
        $('.search-main-container .filters-container .delete-filters').removeClass('visible');
    }
}

$('.filter-content .filter-content-reset button').on('click', function () {
    var filterItem = $(this).closest('.filter-item');
    $(filterItem).removeClass('open');
});

$('.filter-content .keywords-container li').on('click', function () {
    var filterContent = $(this).closest('.filter-content');
    var filterContent = $("#TagListViewSubject li").closest('.filter-content');
    var filterItem = $(filterContent).closest('.filter-item');
    if ($(filterContent).find('.keywords-container.delete li').length > 0) {
        $(filterItem).addClass('active');
        $('.search-main-container .filters-container .delete-filters').addClass('visible');
    } else {
        $(filterItem).removeClass('active');
        $('.search-main-container .filters-container .delete-filters').removeClass('visible');
    }
});

$('.filter-content .filter-content-reset .reset.tags').on('click', function () {
    var filterContent = $(this).closest('.filter-content');
    var filterItem = $(filterContent).closest('.filter-item');
    $(filterContent).find('.keywords-container.delete li').remove();
    $(filterContent).find('.filter-content input').val("");
    $(filterItem).removeClass('active');
    $('.search-main-container .filters-container .delete-filters').removeClass('visible');
});

$('.search-main-container .filters-container .delete-filters').on('click', function () {
    $('.filter-content input').prop("checked", false);
    $('.filter-content input').val("");
    $(".price-range-slider").slider('values', 1, maxTarifSlide);
    $(".price-range-slider").slider('values', 0, 0);
    $('.filter-content .keywords-container.delete li').remove();
    $('.filter-item').removeClass('active');
    $('.search-main-container .filters-container .delete-filters').removeClass('visible');
});



$('.search-main-container .search-container-overlay .filters-btn').on('click', function () {
    var filtersMainContainer = $('.mobile-filters-container');
    $(filtersMainContainer).addClass('open');
});

$('.mobile-filters-section .mobile-filters-section-results button').on('click', function () {
    var filtersMainContainer = $('.mobile-filters-container');
    $(filtersMainContainer).removeClass('open');
});

$('.mobile-filters-section .mobile-filters-section-results .back').on('click', function () {
    var filtersMainContainer = $('.mobile-filters-container');
    $(filtersMainContainer).removeClass('open');
});

$('.check-benevoles').on('change', function () {
    if ($(this).prop('checked')) {
        $(".check-benevoles").prop("checked", true);
        $(".price-range-slider").slider('values', 1, 0);
        $(".price-range-slider").slider('values', 0, 0);
    } else {
        $(".check-benevoles").prop("checked", false);
        $(".price-range-slider").slider('values', 1, maxTarifSlide);
        $(".price-range-slider").slider('values', 0, 0);
    }
});