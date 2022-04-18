/*Toast*/
var toast = document.querySelector('.toast-container');
var toastMessage = document.querySelector('.toast-container .toast-text');
var toastTimer;

function showToast(order, message) {
    closeToast()
    if (!toast.classList.contains("show")) {
        toastMessage.innerHTML = message;
        if (order == "success") {
            toast.classList.remove("error");
            toast.classList.add("success");
        } else if (order == "error") {
            toast.classList.remove("success");
            toast.classList.add("error");
        }
        toast.classList.add("show");
        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 5000);
    }
    if (order == "close") {
        toast.classList.remove("show");
    }

}

function closeToast() {
    clearTimeout(toastTimer);
    toast.classList.remove("show");
}

/*Input*/
$(function () {

    $(".input-field-style .input-field-placeholder").on("click", function () {
        $(this).closest(".input-field-style").find("input").focus();
    });
    $(".input-field-style").on("click", function () {
        $(this).closest(".input-field-style").find("input").focus();
    });
    $(".input-field-style input").on("input", function () {
        var value = $.trim($(this).val());
        if (value) {
            $(this).closest(".input-field-style").addClass("hasValue");
        } else {
            $(this).closest(".input-field-style").removeClass("hasValue");
        }
    });

});

function initializeInput() {
    var inputField = $(".input-field-style input");
    inputField.each(function () {
        var value = $.trim($(this).val());
        if (value.length > 0) {
            $(this).closest(".input-field-style").addClass("hasValue");
        }
    });
}

$(function () {
    $("input[type='text']").change(function () {
        if (!$(this).parent().hasClass(".input-field-style")) {
            var value = $.trim($(this).val());
            if (value) {
                $(this).addClass("hasValue");
            } else {
                $(this).removeClass("hasValue");
            }
        };
    });

});
$(function () {
    $("input[type='number']").change(function () {
        if (!$(this).parent().hasClass(".input-field-style")) {
            var value = $.trim($(this).val());
            if (value) {
                $(this).addClass("hasValue");
            } else {
                $(this).removeClass("hasValue");
            }
        };
    });

});
$(function () {
    $("input[type='email']").change(function () {
        if (!$(this).parent().hasClass(".input-field-style")) {
            var value = $.trim($(this).val());
            if (value) {
                $(this).addClass("hasValue");
            } else {
                $(this).removeClass("hasValue");
            }
        };
    });

});
$(function () {
    $("input[type='tel']").change(function () {
        if (!$(this).parent().hasClass(".input-field-style")) {
            var value = $.trim($(this).val());
            if (value) {
                $(this).addClass("hasValue");
            } else {
                $(this).removeClass("hasValue");
            }
        };
    });

});
/*Input mot de passe*/
function showPassword(element) {
    var inputFieldStyle = element.parentNode;
    var input = inputFieldStyle.querySelector('input');
    if (input.getAttribute("type") == "password") {
        input.setAttribute("type", "text");
        element.classList.add("active");
    } else {
        input.setAttribute("type", "password");
        element.classList.remove("active");
    }

}


/*DatePicker écrit*/
$(function () {
    $("[date-autocomplete='true']").bind("keyup", "keydown", function (e) {
        if (this.getAttribute("data-range") === "true") {} else {
            if (e.which == 111) {
                var oldValue = this.value;
                var newValue = oldValue.substring(0, oldValue.length - 1);
                this.value = newValue;
            }
            if (e.which == 47) {
                var oldValue = this.value;
                var newValue = oldValue.substring(0, oldValue.length - 1);
                this.value = newValue;
            }
            if (e.which !== 8) {
                checkDateContent(this);
            }
        }

    });
});
$(function () {
    $(".datepicker-here").bind("keyup", "keydown", function (e) {
        if (this.getAttribute("data-range") === "true") {} else {
            if (e.which == 111) {
                var oldValue = this.value;
                var newValue = oldValue.substring(0, oldValue.length - 1);
                this.value = newValue;
            }
            if (e.which == 47) {
                var oldValue = this.value;
                var newValue = oldValue.substring(0, oldValue.length - 1);
                this.value = newValue;
            }
            if (e.which !== 8) {
                checkDateContent(this);
            }
        }

    });
});
if (window.innerWidth <= 800) {
    for (var i = 0; i < $(".datepicker-here").length; i++) {
        if ($(".datepicker-here")[i].getAttribute("data-range") === "true") {} else {
            $(".datepicker-here")[i].type = "date";
        }

    }
}

function checkDateContent(element) {
    if (element.value.length > 10) {
        var diff = element.value.length - 10;
        var oldValue = element.value;
        var newValue = oldValue.substring(0, oldValue.length - diff);
        element.value = newValue;
    } else {
        var numChars = element.value.length;
        if (numChars === 2 || numChars === 5) {
            var thisVal = element.value;
            thisVal += '/';
            element.value = thisVal;
        }
    }
}
$('.datepicker-here').on('click', function (event) {
    $('.datepicker-here').datepicker({
        onSelect: function (formattedDate, date, inst) {
            if ($(inst.el).val().length > 0)
                $(inst.el).trigger('change');
        }
    });
});

/*Menu navigation*/
var navDropDownMenuState = false;

function navDropDownMenu(element) {
    var dropDownMenuParent = $(element).closest('li');

    if (dropDownMenuParent.hasClass('open')) {
        dropDownMenuParent.removeClass('open');
        navDropDownMenuState = false;
    } else {
        $('nav .nav-links li').removeClass('open');
        $('nav.connected .nav-items-connected').removeClass('open');
        dropDownMenuParent.addClass('open');

        navDropDownMenuState = true;


    }
}

function mobileNavDropDownMenu(element) {
    if (element.classList.contains("open")) {
        element.classList.remove("open");
    } else {
        element.classList.add("open");
    }
}
/*Menu Overlay Mobile*/

function navMobileMenu() {
    var mobileMenuOverlayContainer = document.querySelector(".mobile-menu");
    var nav = document.querySelector("nav");
    if (mobileMenuOverlayContainer.classList.contains("open")) {
        mobileMenuOverlayContainer.classList.remove("open");
        mobileMenuOverlayContainer.classList.add("closed");
        nav.classList.remove("opened");
    } else {
        mobileMenuOverlayContainer.classList.add("open");
        mobileMenuOverlayContainer.classList.remove("closed");
        nav.classList.add("opened");
        $('nav.connected .nav-items-connected').removeClass('open');
        navNotificationOpenedState = false;
    }
}
/*Ouverture notifications & messages*/
var navNotificationOpenedState = false;

function navOpenNotification(element, order) {
    if (order == "profil") {
        if (screen.width <= 1170) {
            document.location.href = document.getElementById("profileURL").value;
        } else {
            var parent = element.parentNode;
            if (parent.classList.contains("open")) {
                parent.classList.remove("open");
                navNotificationOpenedState = false;
            } else {
                var openedNotifications = document.querySelectorAll("nav.connected .nav-items-connected.open");
                for (var i = 0; i < openedNotifications.length; i++) {
                    openedNotifications[i].classList.remove("open");
                }
                parent.classList.add("open");
                navNotificationOpenedState = true;
                if (document.querySelector("nav .nav-links li .nav-dropdown-menu").parentNode.classList.contains("open")) {
                    navDropDownMenu(document.querySelector("nav .nav-links li.open .nav-dropdown-menu"));
                }

            }
        }
    } else if (order == "notification") {
        var parent = element.parentNode;
        if (parent.classList.contains("open")) {
            parent.classList.remove("open");
            navNotificationOpenedState = false;
        } else {
            var openedNotifications = document.querySelectorAll("nav.connected .nav-items-connected.open");
            for (var i = 0; i < openedNotifications.length; i++) {
                openedNotifications[i].classList.remove("open");
            }
            parent.classList.add("open");
            navNotificationOpenedState = true;
            if (document.querySelector("nav .nav-links li .nav-dropdown-menu").parentNode.classList.contains("open")) {
                navDropDownMenu(document.querySelector("nav .nav-links li.open .nav-dropdown-menu"));
            }

        }
        if (element.id == "liNotificationSystem")
            readAllNotificationSystem();
    }
}
/*Fermeture des éléments lorsqu'on clic ailleurs*/

var navNotificationElements;
$(document).on('click', function (event) {
    var navDropDownMenuElement = document.querySelector("nav .nav-links li.open .nav-dropdown-menu");
    if (!$(event.target).closest('.nav-dropdown-menu-container').length && navDropDownMenuState && $(event.target).closest('nav').length == 0 && window.innerWidth >= 1170) {
        navDropDownMenu(navDropDownMenuElement); // DropdownMenu Navigation
    } else if (!$(event.target).closest('nav.connected .nav-items-connected.notification.open').length && navNotificationOpenedState && $(event.target).closest('nav').length == 0 && window.innerWidth >= 1170) {
        navNotificationElements = document.querySelector("nav.connected .nav-items-connected.notification.open .nav-items-icons");
        if (navNotificationElements == null) {
            navNotificationElements = document.querySelector("nav.connected .nav-items-connected.profil.open .nav-items-icons");
            navOpenNotification(navNotificationElements, 'profil'); // Fermeture du menu profil
        } else {
            navOpenNotification(navNotificationElements, 'notification'); // Fermeture des notifications
        }

    }

});

/*Comment ça marche ?*/
var owlCCM = $(".comment-marche-container .comment-marche-steps-container.mobile.first");
if (owlCCM.length != 0) {
    $(document).ready(function () {
        owlCCM.owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            dotsContainer: '.comment-marche-container .comment-marche-nav-mobile.first',
        });
        $('.comment-marche-container .comment-marche-nav-mobile.first li').click(function () {
            owlCCM.trigger('to.owl.carousel', [$(this).index(), 300]);
        });
    });
    var owlCCMMobile = $(".comment-marche-container .comment-marche-steps-container.mobile.second");
    $(document).ready(function () {
        owlCCMMobile.owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            dotsContainer: '.comment-marche-container .comment-marche-nav-mobile.second',
        });
        $('.comment-marche-container .comment-marche-nav-mobile.second li').click(function () {
            owlCCMMobile.trigger('to.owl.carousel', [$(this).index(), 300]);
        });
    });

}


function commentMarcheCatSwitch(order) {
    var commentMarcheFirstContainer = document.querySelector(".comment-marche-container .comment-marche-first-container");
    var commentMarcheSecondContainer = document.querySelector(".comment-marche-container .comment-marche-second-container");
    var commentMarcheSwitchBtnFirst = document.querySelector(".comment-marche-container .comment-marche-cat-left-button");
    var commentMarcheSwitchBtnSecond = document.querySelector(".comment-marche-container .comment-marche-cat-right-button");
    if (order == "first") {
        commentMarcheFirstContainer.classList.add("active");
        commentMarcheSecondContainer.classList.remove("active");
        commentMarcheSwitchBtnFirst.classList.add("active");
        commentMarcheSwitchBtnSecond.classList.remove("active");
    } else if (order == "second") {
        commentMarcheSecondContainer.classList.add("active");
        commentMarcheFirstContainer.classList.remove("active");
        commentMarcheSwitchBtnSecond.classList.add("active");
        commentMarcheSwitchBtnFirst.classList.remove("active");
    }
}


/*Inscription Coach - Formats des cours*/
function changeCoursShPerimetre(element) {
    var valueRange = element.value;
    var kmRange = document.getElementById("coursKmRange");
    kmRange.innerHTML = valueRange + " km";
}
/*Page CCM Switch*/
function ccmChangeSelection(order) {
    var container = document.getElementById("ccm-container-id");
    if (order == "coach") {
        container.classList.remove("eleve");
        container.classList.add("coach");
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    } else if (order == "eleve") {
        container.classList.add("eleve");
        container.classList.remove("coach");
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    }
}
/*Page FAQ Switch*/
function faqChangeSelection(order) {
    var container = document.getElementById("faq-container-id");
    if (order == "coach") {
        container.classList.remove("eleve");
        container.classList.add("coach");
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    } else if (order == "eleve") {
        container.classList.add("eleve");
        container.classList.remove("coach");
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    }
}
/*FAQ Items*/
function openFaq(element) {
    var faqItem = element;
    if (faqItem.classList.contains("open")) {
        faqItem.classList.remove("open");
    } else {
        faqItem.classList.add("open");
    }
}


/*Switch photos/vidéos*/
function switchPhotoVideo(element, number) {
    var parent = element.parentNode;
    var container = parent.parentNode;
    var selecteurs = parent.querySelectorAll('.selecteur');
    var mediaContainer = container.querySelectorAll('.medias-container');

    for (var i = 0; i < selecteurs.length; i++) {
        selecteurs[i].classList.remove('active');
    }
    element.classList.add('active');

    for (var i = 0; i < mediaContainer.length; i++) {
        mediaContainer[i].style.display = "none";
    }
    mediaContainer[number].style.display = "block";

}

/*Viewer d'images*/
function openImage(element) {
    var items = [];
    var container = element.parentNode;
    var imgs = container.querySelectorAll('img');
    items.push({
        src: element.src,
        w: element.naturalWidth,
        h: element.naturalHeight
    })
    for (var i = 0; i < imgs.length; i++) {
        items.push({
            src: imgs[i].src,
            w: imgs[i].naturalWidth,
            h: imgs[i].naturalHeight
        })
    }
    items = items.filter(function (obj) {
        return obj.src !== element.src;
    });
    items.unshift({
        src: element.src,
        w: element.naturalWidth,
        h: element.naturalHeight
    })
    callGallery(items);
}

function callGallery(items) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
        bgOpacity: 0.8,
        index: 0,
        tapToClose: true,
        shareButtons: [{
                id: 'facebook',
                label: 'Facebook',
                url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}'
            },
            {
                id: 'twitter',
                label: 'Tweet',
                url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'
            },
            {
                id: 'pinterest',
                label: 'Pinterest',
                url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'
            },
            {
                id: 'download',
                label: 'Télécharger',
                url: '{{raw_image_url}}',
                download: true
            }
        ],
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}

/*Étapes de progression du profil*/
function showProfilSteps() {
    var profilStepsContainer = $('.complete-steps-container');
    var seeMore = $('.complete-steps-container + .see-more');
    if ($(profilStepsContainer).hasClass('open')) {
        $(profilStepsContainer).removeClass('open');
        seeMore.html('Tout voir <div class="arrow-bottom"></div>')
    } else {
        $(profilStepsContainer).addClass('open');
        seeMore.html('Voir moins <div class="arrow-bottom"></div>')
    }
}

/*Checkbox list input*/
// $(function () {
//     $(".cases-list-container ul li").on("click", function () {
//         if ($(this).find("input").is(":checked")) {
//             $(this).find("input[type=checkbox]").prop("checked", false);
//             return false;
//         } else if ($(this).find("input").is(":not(:checked)")) {
//             $(this).find("input").prop("checked", true);
//             return false;
//         }
//     });
// });

/*Quill Focus*/
$(function () {
    $(".quill-container .quill-content").on("click", function () {
        $(this).find('.ql-editor').focus();
    });
});

/*Vérif du numéro de téléphone*/
function showPhoneValidation() {
    var codeValidationContainer = $('#TelCodeVerif');
    $(codeValidationContainer).show();
}

function switchPhoneValidationInput(element, callback) {
    var codeVerifInput = $('#TelCodeVerif input');
    var numberOfValues = 0;

    for (var i = 0; i < codeVerifInput.length; i++) {
        if ($(codeVerifInput[i]).val().length >= 1) {
            numberOfValues++;
        }
    }

    if ($(element).val().length >= 1 && numberOfValues < 5) {

        for (var i = 0; i < codeVerifInput.length; i++) {

            if ($(element).is($(codeVerifInput[i]))) {

                if (i < 4) {
                    $(codeVerifInput[i + 1].focus())
                    break;
                }
            }
        }
    } else {

        if (numberOfValues >= 5) {
            showToast('success', 'Validation en cours...');
            if (callback !== undefined)
                callback();
        }
    }

}
$('#TelCodeVerif input').keyup(function (e) {
    if (e.keyCode == 8) {

        var codeVerifInput = $('#TelCodeVerif input');
        for (var i = 0; i < codeVerifInput.length; i++) {

            if ($(this).is($(codeVerifInput[i]))) {

                if (i > 0) {
                    $(codeVerifInput[i - 1].focus())
                    break;
                }
            }
        }
    }
});

function addTelVerifError() {
    var codeVerifInputContainer = $('#TelCodeVerif .code-input-container');
    $(codeVerifInputContainer).removeClass('valid');
    $(codeVerifInputContainer).addClass('error');
    setTimeout(function () {
        $(codeVerifInputContainer).removeClass('error');
    }, 1000);
}

function addTelVerifValid() {
    var codeVerifInputContainer = $('#TelCodeVerif .code-input-container');
    $(codeVerifInputContainer).removeClass('error');
    $(codeVerifInputContainer).addClass('valid');
}

/*Vérif code email*/
function showMailValidation() {
    var codeValidationContainer = $('#MailCodeVerif');
    $(codeValidationContainer).show();
}

function switchMailValidationInput(element, callback) {
    var codeVerifInput = $('#MailCodeVerif input');
    var numberOfValues = 0;

    for (var i = 0; i < codeVerifInput.length; i++) {
        if ($(codeVerifInput[i]).val().length >= 1) {
            numberOfValues++;
        }
    }

    if ($(element).val().length >= 1 && numberOfValues < 5) {

        for (var i = 0; i < codeVerifInput.length; i++) {

            if ($(element).is($(codeVerifInput[i]))) {

                if (i < 4) {
                    $(codeVerifInput[i + 1].focus())
                    break;
                }
            }
        }
    } else {

        if (numberOfValues >= 5) {
            showToast('success', 'Validation en cours...');
            if (callback !== undefined)
                callback();
        }
    }

}
$('#MailCodeVerif input').keyup(function (e) {
    if (e.keyCode == 8) {

        var codeVerifInput = $('#MailCodeVerif input');
        for (var i = 0; i < codeVerifInput.length; i++) {

            if ($(this).is($(codeVerifInput[i]))) {

                if (i > 0) {
                    $(codeVerifInput[i - 1].focus())
                    break;
                }
            }
        }
    }
});

function addMailVerifError() {
    var codeVerifInputContainer = $('#MailCodeVerif .code-input-container');
    $(codeVerifInputContainer).removeClass('valid');
    $(codeVerifInputContainer).addClass('error');
    setTimeout(function () {
        $(codeVerifInputContainer).removeClass('error');
    }, 1000);
}

function addMailVerifValid() {
    var codeVerifInputContainer = $('#MailCodeVerif .code-input-container');
    $(codeVerifInputContainer).removeClass('error');
    $(codeVerifInputContainer).addClass('valid');
}
/*Barre de recherche*/
var searchEmbedBarOpen = false;
$('.search-container-overlay .input-search-container .content .search-content').on('focus', function () {
    var overlay = $(this).closest('.search-container-overlay');
    $(overlay).addClass('is-typing');
    $(overlay).removeClass('is-typing-location');

    if (screen.width <= 1170) {
        location.hash = "OpenSuggestions";
        setTimeout(function () {
            searchEmbedBarOpen = true;
        }, 50);
    }
});

function closeSearchSuggestions() {
    $('.search-container-overlay').removeClass('is-typing');
    $('.search-container-overlay').removeClass('is-typing-location');
}

$(document).on('click', function (event) {
    if (!$(event.target).closest('.search-container-overlay .input-search-container').length) {
        $('.search-container-overlay').removeClass('is-typing');
        $('.search-container-overlay').removeClass('is-typing-location');
        searchEmbedBarOpen = false;
    }
});

$('.search-container-overlay .input-search-container .mobile-close-suggestions').on('click', function () {
    var overlay = $(this).closest('.search-container-overlay');
    $(overlay).removeClass('is-typing');
    searchEmbedBarOpen = false;
    history.pushState("", document.title, window.location.pathname);
});

$('.search-container-overlay .input-search-container .content .location-bar').on('focus', function () {
    var overlay = $(this).closest('.search-container-overlay');
    $(overlay).addClass('is-typing-location');
    $(overlay).removeClass('is-typing');
});

$(function () {
    $.fn.hScroll = function (amount) {
        amount = amount || 120;
        $(this).bind("DOMMouseScroll mousewheel", function (event) {
            var oEvent = event.originalEvent,
                direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
                position = $(this).scrollLeft();
            position += direction > 0 ? -amount : amount;
            $(this).scrollLeft(position);
            event.preventDefault();
        })
    };
});

$(document).ready(function () {
    $('.search-container-overlay .search-suggestions-container .suggestions-preset').hScroll(60);
});

$(document).ready(function () {
    $('.nav-items-dropdown-menu.search .suggestions-preset').hScroll(60);
});

window.onhashchange = function () {
    if (searchEmbedBarOpen) {
        $('.search-container-overlay').removeClass('is-typing');
        $(".search-container-overlay .input-search-container .content .search-content").blur();
        searchEmbedBarOpen = false;
    }
}

/*Ajout de favoris*/
var FAVaddedToList = $('.add-fav-overlay .added-to-list');
var FAVselectList = $('.add-fav-overlay .select-list');
var FAVcreateList = $('.add-fav-overlay .create-list');
var allAddFavOverlay = $('.add-fav-overlay .list-content');
var isAddFavOpen = false;
var openFavTimeOut;

function addElementToFav(id, element, callback) {

    if ($(element).hasClass('liked') || $(element).hasClass('saved')) {
        $(element).removeClass('liked');
        $(element).removeClass('saved');
        clearTimeout(openFavTimeOut);
        $(allAddFavOverlay).removeClass('open');
        isAddFavOpen = false;
        if (callback !== undefined)
            callback(id, false);
    } else {

        if ($(element).hasClass('like-container')) {
            $(element).addClass('liked');
        } else {
            $(element).addClass('saved');
        }
        $(FAVaddedToList).addClass('open');
        isAddFavOpen = true;
        openFavTimeOut = setTimeout(function () {
            $(FAVaddedToList).removeClass('open');
            isAddFavOpen = false;
        }, 5000);
        if (callback !== undefined)
            callback(id, true);
    }

}

$('.add-fav-overlay .added-to-list .list-btns .create').on('click', function () {
    clearTimeout(openFavTimeOut);
    $(allAddFavOverlay).removeClass('open');
    $(FAVcreateList).addClass('open');
});

$('.add-fav-overlay .added-to-list .list-btns .change').on('click', function () {
    clearTimeout(openFavTimeOut);
    $(allAddFavOverlay).removeClass('open');
    $(FAVselectList).addClass('open');
});

$('.add-fav-overlay .select-list .fav-list li').on('click', function () {
    clearTimeout(openFavTimeOut);
    $(allAddFavOverlay).removeClass('open');
    $(FAVaddedToList).addClass('open');
    isAddFavOpen = true;
    openFavTimeOut = setTimeout(function () {
        $(FAVaddedToList).removeClass('open');
        isAddFavOpen = false;
    }, 5000);
});

$('.add-fav-overlay .create-list .create-list-content .create').on('click', function () {
    clearTimeout(openFavTimeOut);
    $(allAddFavOverlay).removeClass('open');
    $(FAVaddedToList).addClass('open');
    isAddFavOpen = true;
    openFavTimeOut = setTimeout(function () {
        $(FAVaddedToList).removeClass('open');
        isAddFavOpen = false;
    }, 5000);
});

$('.add-fav-overlay .create-list .create-list-content .annuler').on('click', function () {
    clearTimeout(openFavTimeOut);
    $(allAddFavOverlay).removeClass('open');
    isAddFavOpen = false;
});

$('.add-fav-overlay .list-content .close').on('click', function () {
    clearTimeout(openFavTimeOut);
    $(allAddFavOverlay).removeClass('open');
    isAddFavOpen = false;
});

$(document).on('click', function (event) {
    if (!$(event.target).closest('.add-fav-overlay').length && !$(event.target).closest('.like-container').length && !$(event.target).closest('.save-event').length && isAddFavOpen) {
        clearTimeout(openFavTimeOut);
        $(allAddFavOverlay).removeClass('open');
    }
});

$('.add-fav-overlay').mouseover(function () {
    if (window.innerWidth >= 800) {
        clearTimeout(openFavTimeOut);
    }
});

$('.add-fav-overlay').mouseout(function () {
    if (window.innerWidth >= 800) {
        openFavTimeOut = setTimeout(function () {
            $(FAVaddedToList).removeClass('open');
            isAddFavOpen = false;
        }, 1000);
    }
});

/*PopUp Overlay*/
var confirmPopUpCallBack;
var confirmPopUpArg1;
var confirmPopUpArg2;

function confirmPopUp(state, message, callback, arg1, arg2) {
    var popUp = $('.pop-up-overlay-container');
    var popUpContent = $('.pop-up-overlay-container .pop-up-overlay-content');
    var popUpTxt = $('.pop-up-overlay-container .pop-up-overlay-content .popup-text');
    if (state == 'delete') {
        popUp.addClass('delete');
        popUp.find('.confirm').html('Supprimer');
        popUpTxt.html(message);
    } else {
        popUp.removeClass('delete');
        popUp.find('.confirm').html('Confirmer');
        popUpTxt.html(message);
    }

    popUpContent.css({
        'left': 'calc(50% - ' + (popUpContent.outerWidth() / 2) + 'px)',
        'top': 'calc(50% - ' + (popUpContent.outerHeight() / 2) + 'px)'
    });
    popUp.addClass('open');
    confirmPopUpCallBack = callback;
    confirmPopUpArg1 = arg1;
    confirmPopUpArg2 = arg2;
}
$('.pop-up-overlay-container .pop-up-overlay-content .annuler').on('click', function () {
    $(this).closest('.pop-up-overlay-container').removeClass('open');
});

$('.pop-up-overlay-container .pop-up-overlay-content .confirm').on('click', function () {
    $(this).closest('.pop-up-overlay-container').removeClass('open');
    confirmCallBackPopUp();
});

$('.pop-up-overlay-container .pop-up-overlay-content .close').on('click', function () {
    $(this).closest('.pop-up-overlay-container').removeClass('open');
});

$('.pop-up-overlay-container .pop-up-overlay-background').on('click', function () {
    $(this).closest('.pop-up-overlay-container').removeClass('open');
});

function confirmCallBackPopUp() {
    if (confirmPopUpCallBack !== undefined) {
        window[confirmPopUpCallBack](confirmPopUpArg1, confirmPopUpArg2);
    }
}

/*Ajout secteurs et fonctions school*/
var originalNumberSect = 0;
var original = document.getElementById('sect_content');


function addLineSect(element) {
    var sectsNumber = $('[id^=sect_content]').length;
    if (sectsNumber < 5) {

        var clone = original.cloneNode(true);
        clone.id = "sect_content" + ++i;
        var notes_matiere_new = clone.querySelector('#topNameSect');
        notes_matiere_new.setAttribute("name", "topNameSect" + originalNumberSect);
        notes_matiere_new.value = "";
        var note_new = clone.querySelector('#topPercentSect');
        note_new.setAttribute("name", "topPercentSect" + originalNumberSect);
        note_new.value = "";
        var poubelle = clone.querySelector('.delete-line');
        switch (sectsNumber) {
            case 1:
                notes_matiere_new.placeholder = "Ex : Digital";
                note_new.placeholder = "Ex : 25";
                break;
            case 2:
                notes_matiere_new.placeholder = "Ex : Industries agroalimentaires";
                note_new.placeholder = "Ex : 20";
                break;
            case 3:
                notes_matiere_new.placeholder = "Ex : Energie & Environnement";
                note_new.placeholder = "Ex : 15";
                break;
            case 4:
                notes_matiere_new.placeholder = "Ex : Communication & Evénementiel";
                note_new.placeholder = "Ex : 10";
                break;
        }
        poubelle.style.display = "block";
        original.parentNode.insertBefore(clone, element);
        $(clone).find('input:first-child').focus();

    } else {
        showToast('error', 'Vous pouvez ajouter jusqu\'à 5 secteurs d\'activités exercés');
    }
}

var originalNumberFonc = 0;
var original2 = document.getElementById('fonc_content');

function addLineFonc(element) {
    var foncNumber = $('[id^=fonc_content]').length;
    if (foncNumber < 5) {
        var clone = original2.cloneNode(true);
        clone.id = "fonc_content" + ++originalNumberFonc;
        var notes_matiere_new = clone.querySelector('#topNameFonc');
        notes_matiere_new.setAttribute("name", "topNameFonc" + originalNumberFonc);
        notes_matiere_new.value = "";
        var note_new = clone.querySelector('#topPercentFonc');
        note_new.setAttribute("name", "topPercentFonc" + originalNumberFonc);
        note_new.value = "";
        switch (foncNumber) {
            case 1:
                notes_matiere_new.placeholder = "Ex : Chef(fe) de Projet";
                note_new.placeholder = "Ex : 25";
                break;
            case 2:
                notes_matiere_new.placeholder = "Ex : Chargé(e) des Ressources Humaines";
                note_new.placeholder = "Ex : 20";
                break;
            case 3:
                notes_matiere_new.placeholder = "Ex : Responsable marketing digital";
                note_new.placeholder = "Ex : 15";
                break;
            case 4:
                notes_matiere_new.placeholder = "Ex : Responsable communication et événementiel";
                note_new.placeholder = "Ex : 10";
                break;
        }
        var poubelle = clone.querySelector('.delete-line');
        poubelle.style.display = "block";
        original2.parentNode.insertBefore(clone, element);
        $(clone).find('input:first-child').focus();
    } else {
        showToast('error', 'Vous pouvez ajouter jusqu\'à 5 fonctions exercées');
    }
}

function deleteLine(element) {
    element.parentNode.remove();
}

/*Popup vérification profil*/
function openPopUpGetVerified(order) {
    var popUp = $('.pop-up-profil-no-verified');
    if (order) {
        popUp.addClass('open');
    } else {
        popUp.removeClass('open');
    }
}

$('.pop-up-profil-no-verified .close').on('click', function () {
    openPopUpGetVerified(false);
});
$('.pop-up-profil-no-verified .annuler').on('click', function () {
    openPopUpGetVerified(false);
});

$('.pop-up-profil-no-verified .pop-up-overlay-background').on('click', function () {
    openPopUpGetVerified(false);
});

/*PopUp add student info*/
function openPopUpStudentInfo(order) {
    var popUp = $('.pop-up-student-missing-info');
    if (order) {
        popUp.addClass('open');
    } else {
        popUp.removeClass('open');
    }
}

$('.pop-up-student-missing-info .close').on('click', function () {
    openPopUpStudentInfo(false);
});
$('.pop-up-student-missing-info .annuler').on('click', function () {
    openPopUpStudentInfo(false);
});

$('.pop-up-student-missing-info .pop-up-overlay-background').on('click', function () {
    openPopUpStudentInfo(false);
});

/*Select*/
$('.select-checkbox-container .title-container').click(function () {
    var container = $(this).closest('.select-checkbox-container');
    if ($(container).hasClass('open')) {
        $(container).removeClass('open');
    } else {
        $(container).addClass('open');
    }
});
$('.select-checkbox-container .cases-list-container li').click(function () {
    var container = $(this).closest('.select-checkbox-container');
    if ($(container).find('input').is(':checked')) {
        $(container).addClass('hasValue');
    } else {
        $(container).removeClass('hasValue');
    }
});
$('.select-container .title-container').click(function () {
    var container = $(this).closest('.select-container');
    if ($(container).hasClass('open')) {
        $(container).removeClass('open');
    } else {
        $(container).addClass('open');
    }
});

$('.select-container ul li').click(function () {
    var optionVal = $(this).attr('option-value');
    var textVal = $(this).html();
    $(this).closest('.select-container').find('.title-container .title').html(textVal);
    $(this).closest('.select-container').attr('select-value', optionVal);
    $(this).closest('.select-container').removeClass('open');
    $(this).closest('.select-container').addClass('hasValue');
    $('.select-container ul li').removeClass('selected');
    $(this).addClass('selected');
});
$(document).on('click', function (event) {
    if (!$(event.target).closest('.select-checkbox-container')
        .length) {
        if ($('.select-checkbox-container') != undefined) {
            $('.select-checkbox-container').removeClass('open');
        }
    }
    if (!$(event.target).closest('.select-container')
        .length) {
        if ($('.select-container') != undefined) {
            $('.select-container').removeClass('open');
        }
    }
});


function loadCheckboxList(listId, callback) {
    //Remplissage de la liste 
    var domainsList = $('#' + listId + '').val().split('|');

    //Création des checkboxs
    for (var i = 0; i < domainsList.length; i++) {
        $('[data-list-id="' + listId + '"] ul').append('<li><label><input type="checkbox" id="' + listId + '-' + i + '" name="' + listId + '-' + i + '"><span>' + domainsList[i] + '</span><span class="checkmark"></span></label></li>');
    }

    //Initialisation de l'event listener sur les checkbox
    $('[data-list-id="' + listId + '"] ul li input').change(function () {
        if ($(this).is(':checked'))
            selectCheckboxList(listId, $(this).attr('id').replace('' + listId + '-', ''), callback);
        else
            unSelectCheckboxList(listId, $(this).attr('id').replace('' + listId + '-', ''), callback);
    });

    //Check des checkboxs
    if ($('#' + listId + '-checked').length) {
        //Remplissage
        var checkedList = $('#' + listId + '-checked').val().split('|');

        var checkboxList = $('[data-list-id="' + listId + '"]  input')

        //Checks
        for (var x = 0; x < checkedList.length; x++) {
            $(checkboxList[checkedList[x]]).prop("checked", true).trigger("change");
        }

    }
}

function selectCheckboxList(listId, itemId, callback) {
    //Remplissage des listes
    var domainsList = $('#' + listId + '').val().split('|');
    var checkedList = $('#' + listId + '-checked').val().split('|');
    //Ajout du tags
    var tempListId = "'" + listId + "'";
    $('[data-list-id-summary="' + listId + '"] ul.keywords-container').append('<li onclick="unSelectCheckboxList(' + tempListId + ', ' + itemId + ', ' + callback + ')" tag-list-id="' + listId + '-' + itemId + '"> <p>' + domainsList[itemId] + '</p><span>×</span> </li>');

    //Nombre de sélection
    var nbrselected = $('[data-list-id="' + listId + '"] ul li input:checked').length;
    if (nbrselected > 0) {
        $('[data-list-id-summary="' + listId + '"]').find('.selected-title').show();
        $('[data-list-id="' + listId + '"]').closest('.select-checkbox-container').addClass('hasValue');
    } else {
        $('[data-list-id-summary="' + listId + '"]').find('.selected-title').hide();
        $('[data-list-id="' + listId + '"]').closest('.select-checkbox-container').removeClass('hasValue');
    }

    var found = false;
    for (var i = 0; i < checkedList.length; i++) {
        if (checkedList[i] == itemId) {
            found = true;
            break;
        }
    }

    if(!found)
    {
        checkedList.push(itemId);
        $('#' + listId + '-checked').val(checkedList.join('|'))
    }


    if (callback !== undefined)
        callback(itemId);
}

function unSelectCheckboxList(listId, itemId, callback) {
    var checkedList = $('#' + listId + '-checked').val().split('|');
    //Supression du tag
    $('[tag-list-id="' + listId + '-' + itemId + '"]').remove();

    //Uncheck
    $('#' + listId + '-' + itemId + '').prop("checked", false);

    //Nombre de sélection
    var nbrselected = $('[data-list-id="' + listId + '"] ul li input:checked').length;

    if (nbrselected > 0) {
        $('[data-list-id-summary="' + listId + '"]').find('.selected-title').show();
        $('[data-list-id="' + listId + '"]').closest('.select-checkbox-container').addClass('hasValue');
    } else {
        $('[data-list-id-summary="' + listId + '"]').find('.selected-title').hide();
        $('[data-list-id="' + listId + '"]').closest('.select-checkbox-container').removeClass('hasValue');
    }


    for (var i = 0; i < checkedList.length; i++) {
        if (checkedList[i] == itemId) {
            checkedList.splice(i, 1);
            $('#' + listId + '-checked').val(checkedList.join('|'))
            break;
        }
    }

    if (callback !== undefined)
        callback(itemId);
}