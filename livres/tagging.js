
function dataLayerSendEvent(slide, eventCategory, eventAction, eventLabel) {
    if ( TAGGING_CONSOLE ) {
        console.log('Event ' + slide + ' - ' + eventCategory + ' :: ' + eventAction + ' :: ' + eventLabel);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'uaevent',
        'eventCategory': eventCategory,
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'eventValue': 0
    });
}

function checkIfSendIt(send_it, category, percent){
    if(!send_it[0] && percent == 25){
        dataLayerSendEvent("Scroll down on "+category, category, "scroll_down", "25");
        send_it[0] = true;
    }
    if(!send_it[1] && percent == 50){
        dataLayerSendEvent("Scroll down on "+category, category, "scroll_down", "50");
        send_it[1] = true;
    }
    if(!send_it[2] && percent == 75){
        dataLayerSendEvent("Scroll down on "+category, category, "scroll_down", "75");
        send_it[2] = true;
    }
    if(!send_it[3] && percent == 100){
        dataLayerSendEvent("Scroll down on "+category, category, "scroll_down", "100");
        send_it[3] = true;
    }
}

let position = 0;
let send_it = [false, false, false, false];
function scrollTracking(category) {
    let current_position =  $(document).scrollTop();
    let max_scroll = $(document).height() - $(window).height();
    let scrolled_perc = parseFloat(((current_position / max_scroll) * 100).toFixed(2));

    if(current_position > position){
        if(scrolled_perc >= 25 && !send_it[0]){
            checkIfSendIt(send_it, category, 25);
        }
        else if (scrolled_perc >= 50 && !send_it[1]){
            checkIfSendIt(send_it, category, 50);
        }
        else if(scrolled_perc >= 75 && !send_it[2]){
            checkIfSendIt(send_it, category, 75);
        }
        else if(scrolled_perc == 100 && !send_it[3]){
            checkIfSendIt(send_it, category, 100);
        }
    }
    position = current_position;
}

function setCookieTaggging(paramName, value) {
    document.cookie = paramName+"="+value+"; expires=0; path=/";
}

function getCookieTaggging(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function deleteCookieTaggging(name) {
    if( getCookie(name) ) {
        document.cookie = name + '= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    }
}

dataLayerPush(); //reload page

function dataLayerPush() {

    var dataLayer = [];
    dataLayer['pageType'] = TIPO_PAGINA;

    if (THEME_TAGGING) {
        dataLayer['bookTheme'] = THEME_TAGGING;
    }

    if (SUBTHEME_TAGGING) {
        dataLayer['bookSubTheme'] = SUBTHEME_TAGGING;
    }

    if (SUBSUBTHEME_TAGGING) {
        dataLayer['bookSubTheme2'] = SUBSUBTHEME_TAGGING;
    }

    if (EDITORIAL) {
        dataLayer['editorial'] = javascript_decode(EDITORIAL);
    }

    if(BOOK_AUTHOR){
        dataLayer['bookAuthor'] = BOOK_AUTHOR;
    }

    if(BOOK_IMPRINT){
        dataLayer['groupImprints'] = BOOK_IMPRINT;
    }

    if(BOOK_FORMAT_FOR_HIT){
        dataLayer['bookFormatForHit'] = BOOK_FORMAT_FOR_HIT;
    }

    if(FOREIGN_RIGHT){
        dataLayer['bookforeignRight'] = FOREIGN_RIGHT;
    }

    if(PRODUCT_CYCLE){
        dataLayer['bookProductCicle'] = PRODUCT_CYCLE;
    }

    if (clientID) {
        dataLayer['userId'] = clientID;
    }

    if (podcastTitle) {
        dataLayer['podcastTitle'] = podcastTitle;
    }

    if (BOOK_COLLECTION) {
        dataLayer['bookCollection'] = BOOK_COLLECTION;
    }

    if(ENTITY){
        dataLayer['bookEditorial'] = ENTITY;
    }

    if(BOOK_NAME){
        dataLayer['bookName'] = BOOK_NAME;
    }

    if(SUBSUBSUBTHEME_TAGGING){
        dataLayer['bookSubTheme3'] = SUBSUBSUBTHEME_TAGGING;
    }

    if(AUTHOR_EDITORIAL){
        console.log(AUTHOR_EDITORIAL);
        dataLayer['authorEditorial'] = AUTHOR_EDITORIAL;
    }

    if (clientID !== '') {
        dataLayer['logged'] = 'logged';
    }
    else {
        dataLayer['logged'] = 'no logged';
    }

    if (NEWSLETTER_OPTIN !== '') {
        dataLayer['newsletterOptin'] = NEWSLETTER_OPTIN;
    }

    if (BOOK_LIST_TYPE !== '') {
        dataLayer['bookListType'] = BOOK_LIST_TYPE;
    }

    var dataLayerArray = [];
    dataLayerArray.push(dataLayer);
    
    if (TAGGING_CONSOLE) {
        console.log('TAB PAGES dataLayer');
        console.log(dataLayerArray);
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        dataLayerArray
    });
}

//ECOMMERCE TAB
function sendProductDetail(bookName, bookId, bookPrice, bookBrand, bookThematic, bookFormat) {
    if ( TAGGING_CONSOLE ) {
        console.log('ECOMMERCE - productDetail :: ' + bookName + ' :: ' + bookId + ' :: ' + bookPrice + ' :: ' + bookBrand + ' :: ' + bookThematic + ' :: ' + bookFormat);
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'ecommerce': {
            'detail': {
                'products': [{
                    'name': bookName,
                    'id': bookId,
                    'price': bookPrice,
                    'brand': bookBrand,
                    'category': bookThematic,
                    'variant': bookFormat,
                }]
            }
        }
    });
}

// Click logo capçalera (FILA. 8)
$('.site-brand .logotip > a').click(function(e) {
    dataLayerSendEvent('click on main logo', 'header:logo', 'click', 'lisez');
});

// Click newsletter header (FILA. 10 FILA. 17)
$('.user-login-nav a.subscribenewsletter:not(.second-visit)').click(function() {
    if (!$(this).hasClass('second-visit')) {
        dataLayerSendEvent('Click in the header box row 10', 'header', 'newsletter', 'subscribe');
        dataLayerSendEvent('Click on newsletter button row 17', 'newsletter', 'view', 'Lisez');
    }
    else {
        $(this).removeClass('second-visit')
    }
});

$('.menu-mobile .promo-newsletter a.subscribe').click(function() {
    dataLayerSendEvent('Click in the header box row 10', 'header', 'newsletter', 'subscribe');
    dataLayerSendEvent('Click on newsletter button row 17', 'newsletter', 'view', 'Lisez');
    dataLayerSendEvent('Click when the mega-menu is displayed 20', 'mega_menu', 'newsletter', 'subscribe');
});

// Click xxss header (FILA. 11 - 13)
$('.user-login-nav .xxss-list .xxss-icon').click(function() {
    dataLayerSendEvent('Click in the header box', 'header', 'social', $(this).data('tagging'));
});

$('.menu-mobile .social-media .xxss-list .xxss-icon').click(function() {
    dataLayerSendEvent('Click in the header box', 'header', 'social', $(this).data('tagging'));
});


// Click menu (FILA. 14)
$('.menu-principal .seccio .link-directe > a').click(function() {
    dataLayerSendEvent('click main menu category 14', 'menu', 'click', $(this).data('tagging'));
});

$('.menu-mobile .seccio .link-directe > a').click(function() {
    dataLayerSendEvent('click main menu category 14', 'menu', 'click', $(this).data('tagging'));
});


// Click submenu (FILA. 15)
$('.menu-principal .seccio .seccio-opcions a').click(function() {
    if($(this).data('tagging')){
        dataLayerSendEvent('click main menu category 15', 'menu:submenu', 'click', $(this).data('tagging')+':'+$(this).attr('title'));
    }
});

$('.menu-mobile .seccio .capsa-desplegable a').click(function() {
    if($(this).data('tagging')){
        dataLayerSendEvent('click main menu category 15', 'menu:submenu', 'click', $(this).data('tagging')+':'+$(this).attr('title'));
    }
});

//Click when the mega-menu is displayed (FILA. 20)
$('.seccio-opcions .promo-newsletter a.subscribe').click(function(){
    dataLayerSendEvent('Click when the mega-menu is displayed 20', 'mega_menu', 'newsletter', 'subscribe');
});

//click when the mega-menu is displayer (FILA. 22)
$('.desplegable .seccio-opcions .events-miniatures .imatge-gran-left').click(function () {
    dataLayerSendEvent('click on top article of megamenu', 'mega_menu', 'top_article', $(this).children('.text').children('.event-title')[0].innerText);
});

//click search results all results (FILA. 24)
$('.megacercador-receptor .veure-tots').on('click',function () {
    dataLayerSendEvent('click search results all results', 'search_results', 'see_results', 'all');
});

//Click in the search results (FILA. 25 FILA. 26)
$('.tab-resultats .menu-tabs li a').click(function () {
    dataLayerSendEvent('click search results see results', 'search_results', 'see_results', $(this).data('tagging'));
});

//FILA. 28
function clickAutocompleteSearch(cerca) {
    dataLayerSendEvent('search autocomplete row 28', 'search', 'autocomplete', cerca);
}

$(document).on('click', '.megacercador-receptor .dreta .llista-autors .llista-elements a', function(e){
    clickAutocompleteSearch($('#megacercador-form .megacercador-casella').val() + ':' + $(this).data('posicio') + ':' + $(this).data('nom'))
});

$(document).on('click', '.megacercador-receptor .dreta .llista-tematiques .llista-elements a', function(e){
    clickAutocompleteSearch($('#megacercador-form .megacercador-casella').val() + ':' + $(this).data('posicio') + ':' + $(this).data('nom'))
});

$(document).on('click', '.megacercador-receptor .dreta .llista-coleccio .llista-elements a', function(e){
    clickAutocompleteSearch($('#megacercador-form .megacercador-casella').val() + ':' + $(this).data('posicio') + ':' + $(this).data('nom'))
});

$(document).on('click', '.megacercador-receptor .dreta .llista-actualitat .llista-elements a', function(e){
    clickAutocompleteSearch($('#megacercador-form .megacercador-casella').val() + ':' + $(this).data('posicio') + ':' + $(this).data('nom'))
});

//search autocomplete click element (FILA. 30)
$(document).on("click","#megacercador-capsa .llista-llibres ul.llista-elements li a", function() {
    //llibre
    dataLayerSendEvent('Search result', 'search', 'result-click:book', $('#megacercador-form .megacercador-casella').val()+':'+$(this).data("posicio")+':'+$(this).data("nom"));
});
$(document).on("click","#megacercador-capsa .llista-autors ul.llista-elements li a", function() {
    //autors
    dataLayerSendEvent('Search result', 'search', 'result-click:author', $('#megacercador-form .megacercador-casella').val()+':'+$(this).data("posicio")+':'+$(this).data("nom"));
});

//Click logout (FILA. 33)
$('.les-meves-dades .sortir').click(function() {
    dataLayerSendEvent('click logout', 'logout', clientID, '');
});

//Click login in popup (FILA. 34)
function loginXarxesSocials(loginType) {
    dataLayerSendEvent('connection', 'login', 'click', loginType);

    setCookieTaggging('logintype', loginType);
}

$('.popup-wrapper .login-box .accedir-xxss .boto-acces-facebook').click(function(){
    loginXarxesSocials($(this).data('tagging'));
});
$('#FormLogin .form-actions #LoginButton').click(function(){
    loginXarxesSocials($(this).data('tagging'));
});

//Click in 'Me connecter (FILA. 36)'
$('.footer-list .without-login a').click(function(){
    dataLayerSendEvent('Click on view login popup row 36', 'pop_up', 'view', window.location.pathname);
});

//Click share on social media (FILA. 50)
$('.share-xxss > .compactats > a').click(function() {
    dataLayerSendEvent('Share on social media row 50', 'share', 'click', window.location.pathname);
});

$(document).ready(() => {
    // Click hotnews right arrow (FILA. 60)
    $('.hotnews-list > .owl-controls .icon-angle-right').click(() => {
        dataLayerSendEvent("Click hotnews right arrow",'home_page','hot_news','right_arrow');
    });

    // Click hotnews left arrow (FILA. 61)
    $('.hotnews-list > .owl-controls .icon-angle-left').click(() => {
        dataLayerSendEvent("Click hotnews left arrow",'home_page','hot_news','left_arrow');
    });
});

// Click on hotnews (FILA. 63)
$('.hotnews-list li a ').click(function() {
    dataLayerSendEvent("Click on hotnews a tag", 'home_page', 'hot_news', $(this).find('.text')[0].innerText);
});

//Click on the filters choices NEWS (FILA. 87 FILA. 88 FILA. 106 FILA. 107)
$('.caixa-filtres-cercador .filtres-cercador ul li a').click(function(){
    if($(this).data('tagging')){
        dataLayerSendEvent("Click on the first filter choice", $(this).data('tagging'), $(this).data('filters'), $(this).data('nom'));
    }
});

//Click on go when filters applied AGENDA (FILA. 96 FILA. 97 FILA. 98 FILA. 99) i (FILA. 112 FILA. 113 FILA. 114 FILA. 115)
$('#eventSearchFrom a').click(function() {
    if($(this).data('tagging')){
        let select2_type = ($("#select2-event_type-container").attr('title') != "Type") ? $("#select2-event_type-container").attr('title') : "";
        let select2_date = ($("#select2-event_date-container").attr('title') != "Date") ? $("#select2-event_date-container").attr('title') : "";
        let select2_region = ($("#select2-event_region-container").attr('title') != "Région") ? $("#select2-event_region-container").attr('title') : "";
        let input_value = $("#event_search").val();

        if(select2_type != ""){
            dataLayerSendEvent("Type selection changed", $(this).data('tagging'), 'finder_type', select2_type);
        }
        if(select2_date != ""){
            dataLayerSendEvent("Date selection changed", $(this).data('tagging'), 'finder_date', select2_date);
        }
        if(select2_region != ""){
            dataLayerSendEvent("Region selection changed", $(this).data('tagging'), 'finder_region', select2_region);
        }
        if(input_value != ""){
            dataLayerSendEvent("Finder words input changed", $(this).data('tagging'), 'finder_key_words', input_value);
        }
    }
});

//click on the filters choices (FILA. 123)
$('.autors-llistat .autors-graella li').click(function(){
    dataLayerSendEvent('Click on author in author page row 123', 'authors_page', 'author_name', $(this).data('tagging'));
});

//Click to see the reviews (FILA. 127)
$('.ancla-babelio a').click(function(){
    dataLayerSendEvent('Click to see the reviews row 127', 'book_page', 'reviews', $('h1.titol').text() + ':' + $('#tagging_format').val());
});

//Click on read first chapter (FILA. 131 FILA. 139)
$('.botons-magrada .primer-capitol').click(function(){
    dataLayerSendEvent("Click on read first chapter row 131", 'book:read-first-chapter', 'click', $('.titol-pagina').text());
    dataLayerSendEvent("Click on read first chapter row 139", 'sample:read', 'click', $('#isbn_llibre').data('llibre'));
});

$('.boto, .fer-like, .visible').click(function(){
    //Click add/remove from wishlist
    if ($(this).data('llibrewish')) {
        if ($(this).hasClass('activat')) {
            //FILA. 134
            dataLayerSendEvent('Remove to the wishList row 134','wishlist:remove','click',$(this).data('llibrewish'));
        }
        else {
            //FILA. 132 FILA. 133
            dataLayerSendEvent('Add to the wishList row 132','wishlist:i-want-it','click',$(this).data('tagging'));
            dataLayerSendEvent('Add to the wishList row 133','wishlist:add','click',$(this).data('llibrewish'));
        }
    }

    //Click add/remove from "i have to read"
    if ($(this).data('llibrellegit')) {
        if ($(this).hasClass('activat')) {
            //FILA. 137
            dataLayerSendEvent('Remove to read list row 137', 'readlist:remove', 'click', $(this).data('llibrellegit'));
        }
        else {
            //FILA. 135 FILA. 136
            dataLayerSendEvent('Add have read it row 135', 'book:i-have-read-it', 'click', $(this).data('tagging'));
            dataLayerSendEvent('Add to read list row 136', 'readlist:add', 'click', $(this).data('llibrellegit'));
        }
    }

    if ($(this).data('canvillibrellegit')) {
        //FILA. 135 FILA. 136
        dataLayerSendEvent('Add have read it row 135', 'book:i-have-read-it', 'click', $(this).data('tagging'));
        dataLayerSendEvent('Add to read list row 136', 'readlist:add', 'click', $(this).data('canvillibrellegit'));
    }

});

//Click on readmore (FILA. 138)
$('.info-llibre .informacio .sinopsi .veure-mes').click(function(){
    dataLayerSendEvent('Click read more sinopsis book row 138','book:sinopsis-read-more','click',$('h1.titol').text());
});

//Click on download extra content (FILA. 141)
$('.descarregar .btn').click(function() {
    dataLayerSendEvent('Click on extra content download row 141', 'book:extra-content', 'download', $(this).data('tipus') + ':' +$(this).data('arxiu'))
});

//Click on publisher logo (FILA. 143)
$('.venda .segell #logo_libros a').click(function(){
    dataLayerSendEvent('Click on publisher logo row 143', 'book:imprint_logo', 'click', $(this).data('tagging'));
});
$('.portada-fitxatecnica .segell #logo_libros a').click(function(){
    dataLayerSendEvent('Click on publisher logo row 143', 'book:imprint_logo', 'click', $(this).data('tagging'));
});

//Click on recommended books (FILA. 144) falta la opció de thematic que esta a un altre lloc!
$('.bloc-llibres .llibres-miniatures .imatge-gran').click(function() {
    dataLayerSendEvent('Click on Carrousel of book row 44', 'book:other_books_' + $(this).parent().parent().data('booktype'), 'click', $(this).find('.info-inferior .titol a').text());
});

//Click on buy the book (FILA. 145)
$('.opciones-compra .soportes .boto_comprar .compralo').click(function() {
    dataLayerSendEvent('Click on buy button row 145', 'book:buy_book','buy_detail', $(this).data('suport')+ ':' + $(this).data('titol'));
});

//Scroll depth tracking article page (FILA. 150 FILA. 151 FILA. 152 FILA. 153)
$(window).scroll(function (event) {
    var path = window.location.pathname;

    if(path.includes('/actualites/')){
        scrollTracking('article_page');
    }
});

//Click to register an account(FILA. 158)
function registerWebsite(loginType) {
    dataLayerSendEvent("Try register button row 158", "register:large", "try", loginType);

    setCookieTaggging('registertype', loginType);
}

$(document).on('click', '.form-registre .boto-acces-facebook', function(e){
    registerWebsite($(this).data('tagging'));
});
$(document).on('click', '.bloc-registre .new-register', function(e){
    registerWebsite($(this).data('tagging'));
});

//Cancel newsletter subscription (FILA. 164)
$('.dades-usuari .newsletters .unsubscribe-newsletter').click(function(){
    dataLayerSendEvent('Cancel newsletter subscription row 164', 'account_unsubscription', 'click', $(this).data('id'));
});

function javascript_decode(str){
    str = str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
    return str;
}

// Click to play the podcast (FILA. 153)
$('.fitxa-podcast .episodi-audio a').click(function() {
    dataLayerSendEvent("Click to play the podcast", 'podcast_page', 'audio_play_title', $(this).data('title'));
});

$('.fitxa-podcast .llistat-episodis .play a').click(function() {
    dataLayerSendEvent("Click to play the podcast", 'podcast_page', 'audio_play_title', $(this).data('title'));
});
