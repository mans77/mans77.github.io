$(document).on('keyup keypress', 'form input[type="text"]', function (e) {
    if (e.which === 13) {
        e.preventDefault();
        return false;
    }
});

// Create Base64 Object
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }


function getComponent(e, eltSourceId) {
    var elem, evt = e ? e : event;
    if (evt.srcElement) elem = evt.srcElement;
    else if (evt.target) elem = evt.target;

    var elemId;
    if (eltSourceId !== undefined)
        elemId = eltSourceId;
    else
        elemId = elem.id;

    if (elemId.indexOf('comp_') >= 0)
    {
        var elts = elemId.split('_');
        var eltComp = elts[1];
        switch (eltComp) {
            case "ReviewsArea":
                if ($("#ReviewsArea").html().trim() === '') {
                    $("#ReviewsArea").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/AppUserDetailedReviewsList", {
                        id: $("#ReviewsArea_settings_id").val(),
                        fullPict: $("#ReviewsArea_settings_fullPict").val(),
                        halfPict: $("#ReviewsArea_settings_halfPict").val(),
                        emptyPict: $("#ReviewsArea_settings_emptyPict").val(),
                        dashboardMode: false,
                        asCoach: true
                    }, function (data) {
                        $("#ReviewsArea").html(data);
                    });
                }
                break;
                
            case "BookingCalendarArea":
                var force = elts.length > 1;
                if ($("#BookingCalendarArea").html().trim() === '' || force) {
                    $("#BookingCalendarArea").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/BookingCalendar", {
                        id: $("#BookingCalendarArea_settings_id").val(),
                        day: $("#BookingCalendarArea_settings_day").val(),
                        month: $("#BookingCalendarArea_settings_month").val(),
                        year: $("#BookingCalendarArea_settings_year").val()
                    }, function (data) {
                            $("#BookingCalendarArea").html(data);
                    });
                }
                break;

            case "CalendarArea":
                var force = elts.length > 1;
                if ($("#CalendarArea").html().trim() === '' || force) {
                    $("#CalendarArea").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/AppUserCalendar", {
                        id: $("#CalendarArea_settings_id").val(),
                        month: $("#CalendarArea_settings_month").val(),
                        year: $("#CalendarArea_settings_year").val()
                    }, function (data) {
                            $("#CalendarArea").html(data);
                    });
                }
                break;

            case "CalendarDispArea":
                var force = elts.length > 1;
                if ($("#CalendarDispArea").html().trim() === '' || force) {
                    $("#CalendarDispArea").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/AppUserCalendarDisp", {
                        id: $("#CalendarDispArea_settings_id").val(),
                        month: $("#CalendarDispArea_settings_month").val(),
                        year: $("#CalendarDispArea_settings_year").val()
                    }, function (data) {
                            $("#CalendarDispArea").html(data);
                    });
                }
                break;

            case "CalendarHoursDispArea":
                var force = elts.length > 1;
                if (elts.length >= 4) {
                    var dElts = elts[3].split('-');
                    if (dElts.length == 3) {
                        $("#CalendarDispArea_settings_day").val(dElts[2]);
                        $("#CalendarDispArea_settings_month").val(dElts[1]);
                        $("#CalendarDispArea_settings_year").val(dElts[0]); 
                    }
                }                    
                if ($("#CalendarHoursDispArea").html().trim() === '' || force) {
                    $("#CalendarHoursDispArea").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/AppUserCalendarHoursDisp", {
                        id: $("#CalendarDispArea_settings_id").val(),
                        day: $("#CalendarDispArea_settings_day").val(),
                        month: $("#CalendarDispArea_settings_month").val(),
                        year: $("#CalendarDispArea_settings_year").val()                        
                    }, function (data) {
                            $("#CalendarHoursDispArea").html(data);
                    });
                }
                break;

            case "HoursArea":
                //$("#HoursArea").html("<div style='width:340px;'><img src='/images/icons/loading.svg' style='width:64px;margin-left:auto; margin-right: auto;display:block' alt='Chargement...'></div>");
                if (elts.length > 1) {
                    var dtElts = elts[2].split('-');
                    if (dtElts.length > 2) {
                        $.get("/Component/AppUserDayCalendar", {
                            id: $("#HoursArea_settings_id").val(),
                            year: parseInt(dtElts[0], 10),
                            month: parseInt(dtElts[1], 10),
                            day: parseInt(dtElts[2], 10)
                        }, function (data) {
                            $("#HoursArea").html(data);
                        });
                    }
                }
                break;

            case "DashboardBooking":
                if ($("#dashboardBooking").html().trim() === "") {
                    $("#dashboardBooking").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/GetdashboardBooking", {
                        id: $("#Dashboard_id").val()
                    }, function (data) {
                        $("#dashboardBooking").html(data);
                    });
                }
                break;

            case "DashboardReview":
                if ($("#dashboardReview").html().trim() === "") {
                    $("#dashboardReview").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/GetdashboardReview", {
                        id: $("#Dashboard_id").val()
                    }, function (data) {
                        $("#dashboardReview").html(data);
                    });
                }
                break;

            case "DashboardStats":
                if ($("#dashboardStats").html().trim() === "") {
                    $("#dashboardStats").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    $.get("/Component/GetdashboardStats", {
                        id: $("#Dashboard_id").val()
                    }, function (data) {
                            $("#dashboardStats").html(data);

                            var eltsValuesBeginning = $("#TrackingValues-beginning").val().split(',');
                            var arrValuesBeginning = [];
                            Array.prototype.forEach.call(eltsValuesBeginning, function (elt) {
                                arrValuesBeginning.push(parseInt(elt, 10));
                            });
                            var eltsSearchValuesBeginning = $("#TrackingSearchValues-beginning").val().split(',');
                            var arrSearchValuesBeginning = [];
                            Array.prototype.forEach.call(eltsSearchValuesBeginning, function (elt) {
                                arrSearchValuesBeginning.push(parseInt(elt, 10));
                            });
                            
                            var eltsValuesMonth = $("#TrackingValues-month").val().split(',');
                            var arrValuesMonth = [];
                            Array.prototype.forEach.call(eltsValuesMonth, function (elt) {
                                arrValuesMonth.push(parseInt(elt, 10));
                            });
                            var eltsSearchValuesMonth = $("#TrackingSearchValues-month").val().split(',');
                            var arrSearchValuesMonth = [];
                            Array.prototype.forEach.call(eltsSearchValuesMonth, function (elt) {
                                arrSearchValuesMonth.push(parseInt(elt, 10));
                            });

                            var eltsValuesWeek = $("#TrackingValues-week").val().split(',');
                            var arrValuesWeek = [];
                            Array.prototype.forEach.call(eltsValuesWeek, function (elt) {
                                arrValuesWeek.push(parseInt(elt, 10));
                            });
                            var eltsSearchValuesWeek = $("#TrackingSearchValues-week").val().split(',');
                            var arrSearchValuesWeek = [];
                            Array.prototype.forEach.call(eltsSearchValuesWeek, function (elt) {
                                arrSearchValuesWeek.push(parseInt(elt, 10));
                            });

                            fillStatsGraph('visibility-beginning', $("#TrackingLabels-beginning").val().split(','), arrSearchValuesBeginning, arrValuesBeginning);
                            fillStatsGraph('visibility-month', $("#TrackingLabels-month").val().split(','), arrSearchValuesMonth, arrValuesMonth);
                            fillStatsGraph('visibility-week', $("#TrackingLabels-week").val().split(','), arrSearchValuesWeek, arrValuesWeek);
                    });
                }
                break;
        }
    }
}

function fillStatsGraph(area, labels, datas1, datas2) {
    /*Graphiques des stats*/
    var visitePageCanvas = document.getElementById(area);
    var visitePage = new Chart(visitePageCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
            {
                pointBorderColor: 'rgba(25, 207, 137, 1)',
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointBorderWidth: 2,
                pointRadius: 4,
                label: 'Apparition dans les recherches',

                data: datas1,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)'

                ],
                borderColor: [
                    'rgba(25, 207, 137, 0.5)'

                ],
                borderWidth: 3
            },
            {
                pointBorderColor: 'rgba(3, 160, 241, 1)',
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointBorderWidth: 2,
                pointRadius: 4,
                label: 'Vues du profil',
                data: datas2,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)'

                ],
                borderColor: [
                    'rgba(3, 160, 241, 0.5)'

                ],
                borderWidth: 3
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                position: 'bottom'
            }
        }
    });
}

function updateCurrentBooking() {
    var subjects = $("#utdSubjects").val() !== "" ? $("#utdSubjects").val().split(',') : [];
    var nbNotSelectedSubjects = 0;
    var formats = $("#utdFormats").val() !== "" ? $("#utdFormats").val().split(',') : [];
    var appointment = [];
    var date = $("#selectedDate");

    if ($("#utdSubjects").val() === "") {
        var arrSubjectsElts = $(".resa-matiere-box input");
        Array.prototype.forEach.call(arrSubjectsElts, function (elt) {
            if (elt.checked) {
                if (elt.name.startsWith('case_'))
                    subjects.push(elt.value);
            }
            else
                if (elt.name.startsWith('case_'))
                    nbNotSelectedSubjects++;
        });
    }

    if ($("#utdFormats").val() === "") {
        var arrSubjectsElts = $(".resa-matiere-box input");
        Array.prototype.forEach.call(arrSubjectsElts, function (elt) {
            if (elt.checked) {
                if (elt.name === 'courseLocation')
                    formats.push(elt.value);
            }
        });
    }

    if (date.length > 0) {
        appointment.push(date.val());
        if ($("#selectedStartTime").val() !== undefined && $("#selectedStartTime").val() !== "") {
            appointment.push($("#selectedStartTime").val());
            if ($("#selectedEndTime").val() !== undefined && $("#selectedEndTime").val() !== "") 
                appointment.push($("#selectedEndTime").val());
        }
    }

    if (nbNotSelectedSubjects > 0 || subjects.length > 0)
        checkLiConcerned(subjects, 0, $("#liSubjects"));
    else
        checkLiConcerned("force", 0, $("#liSubjects"));
    checkLiConcerned(formats, 0, $("#liFormat"));
    checkLiConcerned(appointment, 2, $("#comp_BookingCalendarArea"));
    checkLiConcerned($("#bookingMessage").val(), 0, $("#liMessage"));

    var datas = {
        Year: 0,
        Month: 0,
        Day: 0,
        StartTime: "",
        EndTime: "",
        Subjects: subjects.join(','),
        Formats: formats.join(','),
        Message: $("#bookingMessage").val()
    }
    updateUserTemporaryDatas(datas, function () {
        $.get("/Component/BookingSynthesis", {
            id: $("#idCoach").val()
        }, function (data) {
            $("#bookingSynthesis").html(data);
        });
    });
}

function selectResaFormat(format, idCoach) {
    var datas = {
        Year: 0,
        Month: 0,
        Day: 0,
        StartTime: "",
        EndTime: "",
        Subjects: "",
        Formats: format,
        Message: ""
    }
    updateUserTemporaryDatas(datas, function () {
        window.location.href = "/reserver/" + idCoach;
    });
}

function checkBooking(confirmation) {
    var subjects = $("#utdSubjects").val() !== "" ? $("#utdSubjects").val().split(',') : [];
    var nbNotSelectedSubjects = 0;
    var formats = $("#utdFormats").val() !== "" ? $("#utdFormats").val().split(',') : [];
    var appointment = [];
    var date = $("#selectedDate");

    if ($("#utdSubjects").val() === "") {
        var arrSubjectsElts = $(".resa-matiere-box input");
        Array.prototype.forEach.call(arrSubjectsElts, function (elt) {
            if (elt.checked) {
                if (elt.name.startsWith('case_'))
                    subjects.push(elt.value);
            }
            else
                if (elt.name.startsWith('case_'))
                    nbNotSelectedSubjects++;
        });
    }

    if ($("#utdFormats").val() === "") {
        var arrSubjectsElts = $(".resa-matiere-box input");
        Array.prototype.forEach.call(arrSubjectsElts, function (elt) {
            if (elt.checked) {
                if (elt.name === 'courseLocation')
                    formats.push(elt.value);
            }
        });
    }

    if (date.length > 0)
        appointment.push(date.val());

    var hoursCont = $("#title-box-hour");
    if (hoursCont.length > 0) {
        var hoursElts = document.getElementById("title-box-hour").getElementsByClassName("cv");
        Array.prototype.forEach.call(hoursElts, function (elt) {
            appointment.push(elt.innerHTML);
        });
    }

    if (nbNotSelectedSubjects > 0 && (subjects.length == 0 || subjects[0] == ""))
        showToast('error', 'Vous devez choisir une matière pour ce cours !');
    else if (formats.length == 0 || formats[0] == "")
        showToast('error', 'Vous devez choisir un lieu pour ce cours !');
    else if ($("#selectedStartTime").val() == "" || $("#selectedEndTime").val() == "")
        showToast('error', 'Vous devez choisir une date et une durée pour ce cours !');
    else if (confirmation !== undefined && confirmation) {
        $("#synthRecapStudent").append("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loaderSynth'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.ajax({
            type: "POST",
            url: "/AppUser/SaveBooking",
            dataType: 'json',
            data: {
                idCoach: $("#idCoach").val()
            },
            success: function (response) {
                $.ajax({
                    type: "POST",
                    url: "/Message/sendBookingInformations",
                    dataType: 'json',
                    data: {
                        typeInformation: 'booked',
                        sendNotification: true,
                        sendEmail: true,
                        sendSMS: true
                    },
                    success: function (response) {
                        removeUserTemporaryDatas();
                        window.location.href = "/reserveration-complete/" + $("#idCoach").val();                    },
                    error: function (response) {
                    }
                });
            },
            error: function (response) {
            }
        });
    }
}


function checkLiConcerned(eltToCheck, miniLength, liConcerned) {
    if (eltToCheck.length > miniLength) {
        if (!$(liConcerned).hasClass("valid"))
            $(liConcerned).addClass("valid")
    }
    else {
        if ($(liConcerned).hasClass("valid"))
            $(liConcerned).removeClass("valid")
    }
}

function calendarChangeDate(year, month, callback) {
    $("#CalendarArea_settings_year").val(year);
    $("#CalendarArea_settings_month").val(month);

    $("#CalendarDispArea_settings_year").val(year);
    $("#CalendarDispArea_settings_month").val(month);

    $("#BookingCalendarArea_settings_year").val(year);
    $("#BookingCalendarArea_settings_month").val(month);

    $("#BookingCalendarDispArea_settings_year").val(year);
    $("#BookingCalendarDispArea_settings_month").val(month);

    if (callback !== undefined)
        callback();
}

function userPictureLoaded(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#userCustPict').attr('src', e.target.result);
            $("#pdp-container").css({ display: 'none' });
            $("#croppie-container").css({ display: 'block' });            
            var resize = new Croppie($('#userCustPict')[0], {
                viewport: { width: 150, height: 150 },
                boundary: { width: 200, height: 200 },
                showZoomer: true,
                enableResize: false,
                enableOrientation: true
            });
            $('#btnValid').on('click', function () {                
                resize.result({
                    type: "canvas",
                    size: { width: 300, height: 300 }, //"original",
                    format: "png",
                    quality: 1
                }).then(function (dataImg) {
                    $("#userPict").attr('src', dataImg);                    
                    $('#UserPictString').attr('value', dataImg.substring(dataImg.indexOf(",") + 1));
                    $("#pdp-container").css({ display: 'block' });
                    $(".croppie-container").remove();
                    $("#croppie-container").append('<img id="userCustPict" src="#">');
                    $("#croppie-container").css({ display: 'none' });

                    $.ajax({
                        type: "POST",
                        url: "/AppUser/SetCurrentUserImageFile",
                        dataType: 'json',
                        data: {
                            userPictString: $('#UserPictString').val()
                        },
                        success: function (response) {

                        },
                        error: function (response) {
                        }
                    });
                });
            });
            $('#btnCancel').on('click', function () {
                $("#pdp-container").css({ display: 'block' });
                $(".croppie-container").remove();
                $("#croppie-container").append('<img id="userCustPict" src="#">');
                $("#croppie-container").css({ display: 'none' });
            });
            $("#rotateBtn").on('click', function () { resize.rotate(-90); });
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function userIdentityLoaded(input, immediateProcess) {
    if (input.files && input.files[0]) {

        var formData = new FormData();
        for (var i = 0; i != input.files.length; i++) {
            formData.append("files", input.files[i]);
        }

        if (immediateProcess) {
            $.ajax({
                type: "POST",
                url: "/Account/setIdentityFile",
                async: true,
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    var s = Math.ceil(input.files[0].size / 1024) + ' Ko';
                    $("#identityFileInfos").html(input.files[0].name + ' - ' + s);
                    $("#UserIdentityFileName").val(input.files[0].name);
                    $("#fileInfosArea").css({ display: 'block' });
                    $('#identityLoadedDiv').css({ display: 'block' });
                    $('#identityInputDiv').css({ display: 'none' });
                },
                error: function (response) {
                }
            });
        }
    }
}

function gradesDocLoaded(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#GradesDocString').attr('value', e.target.result.substring(e.target.result.indexOf(",") + 1));
            $("#GradesDocName").val(input.files[0].name);
            $("#gradesDocName").html(input.files[0].name);
            $("#GradeDocArea").css("display", "block");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function deleteGradesDoc() {
    $('#GradesDocString').attr('value', '');
    $("#GradesDocName").val('');
    $("#gradesDocName").html('');
    $("#GradeDocArea").css("display", "none");
}

function certifDocLoaded(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#CertifScoString').attr('value', e.target.result.substring(e.target.result.indexOf(",") + 1));
            $("#CertifScoName").val(input.files[0].name);
            $("#certifScoName").html(input.files[0].name);
            $("#CertifScoArea").css("display", "block");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function deleteCertifSco() {
    $('#CertifScoString').attr('value', '');
    $("#CertifScoName").val('');
    $("#certifScoName").html('');
    $("#CertifScoArea").css("display", "none");
}

function category_view(e) {
    var elem, evt = e ? e : event;
    if (evt.srcElement) elem = evt.srcElement;
    else if (evt.target) elem = evt.target;

    var letter = elem.id.substring(elem.id.length - 1);
    if(elem.checked)
        $("#Area" + letter).css("display", "block");
    else
        $("#Area" + letter).css("display", "none");
}

function addKeyword(e, KeywordListCtrlId, KeywordCtrlId, TagListViewCtrlId, callback) {
    var elem, evt = e ? e : event;
    if (evt.srcElement) elem = evt.srcElement;
    else if (evt.target) elem = evt.target;

    var keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === 13 || e.currentTarget.localName === 'span' || e.currentTarget.localName === 'button') {
        var newKW = $("#" + KeywordCtrlId).val();
        if (newKW !== "") {
            var displayedNewKW = newKW.charAt(0).toUpperCase() + newKW.slice(1);
            var curContent = $("#" + TagListViewCtrlId).html();
            $("#" + TagListViewCtrlId).html(curContent + '<li class="filter-matiere-tag"><p>' + displayedNewKW + '</p><span onclick="removeKeyword(event,\'' + KeywordListCtrlId + '\')">×</span></li>');

            updateKeywordList(KeywordListCtrlId, newKW, KeywordCtrlId, "ADD", callback);
            $('.search-main-container .filters-container .delete-filters').addClass('visible');
            $(elem).closest('.filter-item').addClass('active');
        }
    }    
}

function removeKeyword(e, KeywordListCtrlId, callback) {
    var elem, evt = e ? e : event;
    if (evt.srcElement) elem = evt.srcElement;
    else if (evt.target) elem = evt.target;

    if (elem != null) {
        var subject = elem.previousElementSibling.innerText;
        var KeyWordSuggestedListSubject = "Soutien-scolaire|Mathématiques|Anglais|Français|Physique-chimie|SVT|Aide-aux-devoirs|Espagnol|Allemand|Informatique";
        if (KeyWordSuggestedListSubject.toLowerCase().indexOf(subject.toLowerCase()) >= 0)
            if ($("#SuggestedTagListViewSubject").length)
                $("#SuggestedTagListViewSubject").append('<li class="filter-matiere-tag"><p onclick="addSuggestedKeyword(event,"' + subject + '","KeyWordListSubject","TagListViewSubject",updateCoachSubjectsList)">' + subject + '</p><span onclick="addSuggestedKeyword(event,"' + subject + '","KeyWordListSubject","TagListViewSubject",updateCoachSubjectsList)">×</span></li>');

        updateKeywordList(KeywordListCtrlId, subject, null, "REMOVE", callback);
        elem.parentElement.parentElement.removeChild(elem.parentElement);
    }
}

function addSuggestedKeyword(e, NewKW, KeywordListCtrlId, TagListViewCtrlId, callback) {
    var elem, evt = e ? e : event;
    if (evt.srcElement) elem = evt.srcElement;
    else if (evt.target) elem = evt.target;

    if (elem != null) {
        var newKW = (NewKW !== undefined && NewKW != '') ? NewKW : elem.previousElementSibling.innerText;
        var curContent = $("#" + TagListViewCtrlId).html();
        $("#" + TagListViewCtrlId).html(curContent + '<li class="filter-matiere-tag"><p>' + newKW + '</p><span onclick="removeKeyword(event,\'' + KeywordListCtrlId + '\')">×</span></li>');

        updateKeywordList(KeywordListCtrlId, newKW, null, "ADD", callback);
        elem.parentElement.parentElement.removeChild(elem.parentElement);
    }
}

function updateKeywordList(keywordListCtrlId, newKW, keywordCtrlId, type, callback) {
    var list;
    if (type == "ADD") {
        list = $("#" + keywordListCtrlId).val().length > 0 ? $("#"+keywordListCtrlId).val().split('|') : [];
        list.push(newKW);
        $("#" + keywordListCtrlId).val(list.join('|'));
        if (keywordCtrlId != null)
            $("#" + keywordCtrlId).val("");
    }
    else if (type == "REMOVE") {
        list = $("#" + keywordListCtrlId).val().length > 0 ? $("#" + keywordListCtrlId).val().toLowerCase().split('|') : [];
        var index = list.indexOf(newKW.toLowerCase());
        if (index >= 0)
            list.splice(index, 1);
        $("#" + keywordListCtrlId).val(list.join('|'));
        if (list.length == 0) {
            $('.keywords-container.coach.delete').closest('.filter-item').removeClass('active');
            $('.search-main-container .filters-container .delete-filters').removeClass('visible');
        }
    }

    if (callback !== undefined)
        callback();
}

function updateCoachSubjectsList() {
    $.ajax({
        type: "POST",
        url: "/AppUser/updateUserSubjects",
        dataType: 'json',
        data: {
            keyWordListSubject: $("#KeyWordListSubject").val()
        },
        success: function (response) {
            var p1 = "<ul class=\"subjects-list margin - top5\"><li onclick=\"openEditPopUp('subjects', true);\">";
            p1 += "<div class=\"content\"><div class=\"cb w7 rem125\"><img src=\"./images/icons/ic_plus_blue.svg\" alt=\"Ajouter\" class=\"ic-text margin-right5\">Ajouter/modifier une matière</div></div></li>";

            var arrElts = $("#KeyWordListSubject").val().split('|');
            Array.prototype.forEach.call(arrElts, function (elt) {
                p1 += "<li><div class=\"content\"><div class=\"rem125 w5\">" + elt + "</div>";
                p1 += "<div class=\"overlay-recap-subjects\">";
                p1 += "<img src=\"./images/icons/ic_calendar_blue.svg\" alt=\"Calendrier\">";
                p1 += "<div class=\"w7 rem125\">Aucun cours de  " + elt + " prévu</div></div></div></li>";
            });

            p1 += "</ul>";

            $("#AppUserCoachedSubjectsList").html(p1);
        },
        error: function (response) {
        }
    });
}

function removeUserCoachingFormat(format) {
    $.ajax({
        type: "POST",
        url: "/AppUser/removeUserCoachingFormat",
        dataType: 'json',
        data: {
            format: format
        },
        success: function (response) {

        },
        error: function (response) {
        }
    });
} 

function setDispos(typeNext, src) {
    var hourContainers = document.getElementsByClassName("hour-list");
    var days = { "monday": [], "tuesday": [], "wednesday": [], "thursday": [], "friday": [], "saturday": [], "sunday": [] };
    $("#MondayHours").val("");
    $("#TuesdayHours").val("");
    $("#WednesdayHours").val("");
    $("#ThursdayHours").val("");
    $("#FridayHours").val("");
    $("#SaturdayHours").val("");
    $("#SundayHours").val("");
    Array.prototype.forEach.call(hourContainers, function (container) {
        var day = container.className.replace("hour-list ", "");
        var inputLinked = day.charAt(0).toUpperCase() + day.slice(1) + "Hours";
        Array.prototype.forEach.call(container.children, function (liElt) {
            if ($(liElt).hasClass("selected")) {
                if (days[day].indexOf(liElt.getAttribute("hourslistelement")) < 0) {
                    days[day].push(liElt.getAttribute("hourslistelement"));
                    $("#" + inputLinked).val($("#" + inputLinked).val() + liElt.getAttribute("hourslistelement") + " ");
                }
            }
        });
    });

    var daysHours = [];
    daysHours.push($("#MondayHours").val());
    daysHours.push($("#TuesdayHours").val());
    daysHours.push($("#WednesdayHours").val());
    daysHours.push($("#ThursdayHours").val());
    daysHours.push($("#FridayHours").val());
    daysHours.push($("#SaturdayHours").val());
    daysHours.push($("#SundayHours").val());

    $.ajax({
        type: "POST",
        url: "/AppUser/setDisponibilities",
        dataType: 'json',
        data: {
            daysHours: daysHours
        },
        success: function (response) {
            if (typeNext === "registerbydate")
                window.location.href = "/inscription-etape-3/par-date";
            else if (typeNext === "nextstep")
                window.location.href = "/inscription-etape-4";
            else if (typeNext == "tabdate")
                inscriptionModelSwitch(1, src);
            else
                window.location.href = typeNext;
        },
        error: function (response) {
            
        }
    });
}

function setDisposByDate(year, month, day) {
    var selectedHoursString = "";
    var hourContainers = document.getElementsByClassName("hours-list-date");
    if (hourContainers.length > 0) {
        var selectedHours = hourContainers[0].getElementsByClassName("selected");
        Array.prototype.forEach.call(selectedHours, function (hourElt) {
            selectedHoursString += hourElt.getAttribute("hourslistelement") + " ";
        });
    }

    $.ajax({
        type: "POST",
        url: "/AppUser/setDisposByDate",
        dataType: 'json',
        data: {
            year: year,
            month: month,
            day: day,
            selectedHoursString: selectedHoursString
        },
        success: function (response) {
            switchPresetHoursList();
        },
        error: function (response) {
            alert("ERR: " + response.responseText);
        }
    });
}

function setMethodo(element, idQuill) {
    $.ajax({
        type: "POST",
        url: "/AppUser/setMethodo",
        dataType: 'json',
        data: {
            content: $('#' + element).val()
        },
        success: function (response) {
            editThisQuill(idQuill);
        },
        error: function (response) {
        }
    });
}

function setDescription(element, idQuill) {
    $.ajax({
        type: "POST",
        url: "/AppUser/setDescription",
        dataType: 'json',
        data: {
            content: $('#' + element).val()
        },
        success: function (response) {
            editThisQuill(idQuill);
        },
        error: function (response) {
        }
    });
}

function setPrice(elements) {
    if (elements !== undefined) {
        if (elements.length > 0) {
            var elts = elements[0].id.split('_');
            if (elts.length >= 2) {
                var suffix = elts[1];                
                var free = $("#timeOffer_" + suffix).val();
                var price = $("#Price" + suffix).val();
                if (free > 0) {
                    $("#freeDuration_" + suffix).html($("#timeOffer_" + suffix + " option:selected").text());
                    $("#durationDiv_" + suffix).css("display", "block");
                    if (free == 1000)
                        price = 0;
                }
                else {
                    $("#freeDuration_" + suffix).html();
                    $("#durationDiv_" + suffix).css("display", "none");
                }
                if (!isNaN(parseInt(price, 10))) {
                    $("#currentPrice_" + suffix).html(price + " €/h");
                    $("#existsPriceDiv_" + suffix).css("display", "block");
                    $("#addPriceDiv_" + suffix).css("display", "none");

                    $.ajax({
                        type: "POST",
                        url: "/AppUser/setPrice",
                        dataType: 'json',
                        data: {
                            format: suffix,
                            price: price,
                            freeDuration: free
                        },
                        success: function (response) {
                            $(elements).removeClass('on-edit');
                        }
                    });
                }
            }
        }
    }
}

function removePrice(elements) {
    if (elements !== undefined) {
        if (elements.length > 0) {
            var elts = elements[0].id.split('_');
            if (elts.length >= 2) {
                if (confirm("Etes vous sûr de vouloir supprimer ce tarif ?")) {
                    var suffix = elts[1];
                    $("#currentPrice_" + suffix).html(" €/h");
                    $("#existsPriceDiv_" + suffix).css("display", "none");
                    $("#addPriceDiv_" + suffix).css("display", "block");
                    $("#freeDuration_" + suffix).html();
                    $("#durationDiv_" + suffix).css("display", "none");

                    $.ajax({
                        type: "POST",
                        url: "/AppUser/removePrice",
                        dataType: 'json',
                        data: {
                            format: suffix
                        },
                        success: function (response) {
                            $(elements).removeClass('on-edit');
                        }
                    });
                    
                }
            }
        }
    }
}

function removeXP(xpId, xpType) {
    if (confirm("Etes-vous sûrs de vouloir supprimer cette expérience ?")) {
        if (xpType == "Aca") {
            $.ajax({
                type: "POST",
                url: "/XPAca/removeXP",
                dataType: 'json',
                data: {
                    xpId: xpId
                },
                success: function (response) {
                    $("#xpAcaDiv_" + xpId).remove();
                }
            });
        }
        else if (xpType == "Bus") {
            $.ajax({
                type: "POST",
                url: "/XPBus/removeXP",
                dataType: 'json',
                data: {
                    xpId: xpId
                },
                success: function (response) {
                    $("#xpBusDiv_" + xpId).remove();
                }
            });
        }
    }
}

function updateUserTemporaryDatas(jsonDatas, callback) {
    $.ajax({
        type: "POST",
        url: "/AppUser/UpdateTemporarydatas",
        dataType: 'json',
        data: {
            datas: JSON.stringify(jsonDatas)
        },
        success: function (response) {
            if (callback != null)
                callback();
        },
        error: function (response) {
        }
    });
} 

function removeUserTemporaryDatas() {
    $.ajax({
        type: "POST",
        url: "/AppUser/RemoveTemporarydatas",
        dataType: 'json',
        success: function (response) {

        }
    });
} 

function firstBuffer(pageName, callback) {
    switch (pageName) {
        case 'SEOInter':
            var searchResultContainer = $('#SearchResultGlobalContainer');
            var resultFirstListIdRow = $('#resultFirstListIdRow').val();
            if (resultFirstListIdRow !== undefined && resultFirstListIdRow !== "") {
                searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.get("/Component/SearchResultCoachsFirstList", { resultListIdRow: resultFirstListIdRow, count: 8 }, function (data) {
                    $('#loader1').remove();
                    searchResultContainer.html(data);
                    if (callback !== undefined)
                        callback();
                });
            }
            break;

        case 'SEOInterOrientation':
            var searchResultContainer = $('#SearchResultGlobalContainer');
            var resultFirstListIdRow = $('#resultFirstListIdRow').val();
            if (resultFirstListIdRow !== undefined && resultFirstListIdRow !== "") {
                searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.get("/Component/SearchResultEstablishmentsFirstList", { resultListIdRow: resultFirstListIdRow, count: 8 }, function (data) {
                    $('#loader1').remove();
                    searchResultContainer.html(data);
                    if (callback !== undefined)
                        callback();
                });
            }
            break;

        case 'SearchPage':
            var searchResultContainer = $('#search-section-coach #SearchResultGlobalContainer');
            var resultFirstListIdRow = $('#search-section-coach #resultFirstListIdRow').val();
            if (resultFirstListIdRow !== undefined && resultFirstListIdRow !== "") {
                searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.get("/Component/SearchResultCoachsFirstList", { resultListIdRow: resultFirstListIdRow, count: 8 }, function (data) {
                    $('#loader1').remove();
                    searchResultContainer.html(data);
                    if (callback !== undefined)
                        callback();
                });
            }

            var searchResultContainer2 = $('#search-section-establishment #SearchResultGlobalContainer');
            var resultFirstListIdRow2 = $('#search-section-establishment #resultFirstListIdRow').val();
            if (resultFirstListIdRow2 !== undefined && resultFirstListIdRow2 !== "") {
                searchResultContainer2.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.get("/Component/SearchResultEstablishmentsFirstList", { resultListIdRow: resultFirstListIdRow2, count: 8 }, function (data) {
                    $('#loader1').remove();
                    searchResultContainer2.html(data);
                    if (callback !== undefined)
                        callback();
                });
            }
            break;

        case 'HomePageCoach':
            var searchResultContainer = $('#coach-thumbs-list');
            searchResultContainer.append("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader2'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.ajax({
                type: "POST",
                url: "/Search/GetCoachsListRandom15",
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        $('#resultFirstListIdRow').val(response.idList);
                        var resultFirstListIdRow = $('#resultFirstListIdRow').val();
                        if (resultFirstListIdRow !== undefined && resultFirstListIdRow !== "") {
                            $.get("/Component/SearchResultCoachsListSlide", { resultListIdRow: resultFirstListIdRow }, function (data) {
                                $('#loader2').remove();
                                searchResultContainer.html(data);
                                showDots();
                                if (callback !== undefined)
                                    callback();
                            });
                        }
                    }
                }
            });
            break;

        case 'HomePageEstab':
            var searchResultContainer = $('#school-thumbs-list');
            searchResultContainer.append("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader3'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.ajax({
                type: "POST",
                url: "/AcaSearch/SearchEstablishment",
                dataType: 'json',
                data: {
                    filterDegrees: "",
                    filterDomains: "",
                    filterTypes: "",
                    filterSubjects: "",
                    location: "",
                    isTypeInitial: false,
                    isTypeAlterAppr: false,
                    isTypeAlterPro: false,
                    maxCount: 15
                },
                success: function (response) {
                    if (response.success) {
                        $('#resultFirstListIdEstabRow').val(response.idList);
                        var resultFirstListIdRow = $('#resultFirstListIdEstabRow').val();
                        if (resultFirstListIdRow !== undefined && resultFirstListIdRow !== "") {
                            $.get("/AcaComponent/SearchResultEstabListSlide", { resultListIdRow: resultFirstListIdRow }, function (data) {
                                $('#loader3').remove();
                                searchResultContainer.html(data);
                                if (callback !== undefined)
                                    callback();
                            });
                        }
                    }
                }
            });
            break;

        case 'HomePageReview':
            var searchResultContainer = $('#hp-review-list');
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader4'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/ReviewGlobalList", null, function (data) {
                $('#loader4').remove();
                searchResultContainer.html(data);
                if (callback !== undefined)
                    callback();
            });
            break;

        case 'HomePageBlog':
            var searchResultContainer = $('#blog-thumbs-list');
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader5'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/BlogGlobalList", {activeList: null, count: 15, idAuthor: 0}, function (data) {
                $('#loader5').remove();
                searchResultContainer.html(data);
                if (callback !== undefined)
                    callback();
            });
            break;

        case 'CoachProfile':
            var searchResultContainer = $('#similarCoachsList');
            var filterSubjects = $('#SearchContent').val() !== '' ? $('#SearchContent').val() : '';
            var location = $('#SearchLocation').val() !== '' ? $('#SearchLocation').val() : '';

            if (filterSubjects !== '' || location !== '') {
                searchResultContainer.append("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader6'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.ajax({
                    type: "POST",
                    url: "/Search/GetSimilarCoachsListRandom",
                    dataType: 'json',
                    data: {
                        filterSubjects: filterSubjects,
                        location: location,
                        maxCount: 3, 
                        currentId: $('#CurrentProfileId').val()
                    },
                    success: function (response) {
                        if (response.success) {
                            $('#resultFirstListIdRow').val(response.idList);
                            var resultFirstListIdRow = $('#resultFirstListIdRow').val();
                            if (resultFirstListIdRow !== undefined && resultFirstListIdRow !== "") {
                                $.get("/Component/SearchResultCoachsListBuffer", { resultListIdRow: resultFirstListIdRow, cursorPos: -1, count: 3 }, function (data) {
                                    $('#loader6').remove();
                                    searchResultContainer.html(data);
                                    showDots();
                                    if (callback !== undefined)
                                        callback();
                                });
                            }
                            else
                                $('#loader6').remove();
                        }
                    }
                });
            }


            //var searchResultContainer = $("#similarCoachsList");
            //searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader5'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");


            //SearchListStringRow = 'test'; //filterSubjects.split('|').join(', ');
            //$.ajax({
            //    type: "POST",
            //    url: "/Search/SearchCoach",
            //    //dataType: 'json',
            //    data: {
            //        filterSubjects: 'anglais',
            //        filterLevels: '',
            //        filterFormats: '',
            //        minPrice: -1,
            //        maxPrice: -1,
            //        minEval: 0,
            //        maxEval: 5,
            //        location: 'lyon',
            //        maxCount: 100
            //    },
            //    success: function (response) {
            //        if (response.success) {
            //            var count = response.idList.length;
            //            if (count > 100)
            //                response.idList.splice(99, response.idList.length - 100); //to limit response size
            //            var sidList = response.idList.join(',');
            //            $.get("/Component/GetSearchResultCoachsComponent", {
            //                idList: sidList,
            //                searchListRow: SearchListStringRow,
            //                totalCount: response.totalCount,
            //                totalCountWMF: response.totalCountWMF
            //            }, function (data) {
            //                $('#loader-account').remove();
            //                searchResultContainer.html(data);
            //            });
            //        } else {
            //            $('#loader-account').remove();
            //            alert('erreur');
            //        }
            //    }
            //});



            //var searchResultContainer = $('#blog-thumbs-list');
            //searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader5'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            //$.get("/Component/BlogGlobalList", { activeList: null, count: 15, idAuthor: 0 }, function (data) {
            //    $('#loader5').remove();
            //    searchResultContainer.html(data);
            //    if (callback !== undefined)
            //        callback();
            //});
            break;
    }
}

function nextBuffer(type) {

    switch (type) {
        case 'coach':
            var containerName = 'search-section-coach';
            if (!$('#' + containerName).length)
                containerName = 'SearchResultGlobalContainer';
            var searchResultContainer = $('#' + containerName + ' #searchResultContainer');
            var resultListIdRow = $('#' + containerName + ' #resultListIdRow').val();
            var cursorPos = $('#' + containerName + ' #cursorPos').val();
            var btn = $('#' + containerName + ' #bntNextBuffer');
            var count = 4;

            var curContent = searchResultContainer.html();
            searchResultContainer.append("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/SearchResultCoachsListBuffer", { resultListIdRow: resultListIdRow, cursorPos: cursorPos, count: count }, function (data) {
                $('#loader').remove();
                searchResultContainer.append(data);
                //document.documentElement.scrollTop += 477;
                $('#' + containerName + ' #cursorPos').val(parseInt($('#' + containerName + ' #cursorPos').val(), 10) + count);
                var lstRem = resultListIdRow.split(',');
                if (lstRem.length > parseInt($('#' + containerName + ' #cursorPos').val(), 10))
                    btn.css("display", "block");
                else
                    btn.css("display", "none");
            });   
            break;

        case 'establishment':
            var containerName = 'search-section-establishment';
            if (!$('#' + containerName).length)
                containerName = 'SearchResultGlobalContainer';
            var searchResultContainer = $('#' + containerName + ' #searchResultContainer');
            var resultListIdRow = $('#' + containerName + ' #resultListIdRow').val();
            var cursorPos = $('#' + containerName + ' #cursorPos').val();
            var btn = $('#' + containerName + ' #bntNextBuffer');
            var count = 4;

            var curContent = searchResultContainer.html();
            searchResultContainer.append("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/SearchResultEstablishmentsListBuffer", { resultListIdRow: resultListIdRow, cursorPos: cursorPos, count: count }, function (data) {
                $('#loader').remove();
                searchResultContainer.append(data);
                //document.documentElement.scrollTop += 477;
                $('#' + containerName + ' #cursorPos').val(parseInt($('#' + containerName + ' #cursorPos').val(), 10) + count);
                var lstRem = resultListIdRow.split(',');
                if (lstRem.length > parseInt($('#' + containerName + ' #cursorPos').val(), 10))
                    btn.css("display", "block");
                else
                    btn.css("display", "none");
            });  
            break;
    } 
}

function showAccountComponent(type, callback) {
    var searchResultContainer = $('#' + type + '-section');
    var userId = $('#UserId').val();
    switch (type) {
        case "infos":
            //AccountInformations            
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/AccountInformations", { id : userId }, function (data) {
                $('#loader-account').remove();
                searchResultContainer.html(data);
                initializeInput();
                if (callback !== undefined)
                    callback();
            });
            break;

        case "profil":
            //AccountProfil
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/AccountProfil", { id: userId }, function (data) {
                $('#loader-account').remove();
                searchResultContainer.html(data);
                initializeInput();
                if (callback !== undefined)
                    callback();
            });
            break;

        case "dispo":
            //AccountDisponibilities
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/AccountDisponibilities", { id: userId }, function (data) {
                $('#loader-account').remove();
                searchResultContainer.html(data);
                initializeInput();
                if (callback !== undefined)
                    callback();
            });
            break;

        case "paiement":
            //AccountPricesAndFormats
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/AccountPricesAndFormats", { id: userId }, function (data) {
                $('#loader-account').remove();
                searchResultContainer.html(data);
                initializeInput();
                if (callback !== undefined)
                    callback();
            });
            break;

        case "secu":
            //Security
            searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/AccountSecurity", { id: userId }, function (data) {
                $('#loader-account').remove();
                searchResultContainer.html(data);
                initializeInput();
                if (callback !== undefined)
                    callback();
            });
            break;
    }
}

function initAccountProfilQuill() {
    var quillDebut = '<div class="ql-editor">';
    var quillFin = '</div>';
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{
            'header': [4, 5, false]
        }],

        [{
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }],

        [{
            'indent': '-1'
        }, {
            'indent': '+1'
        }], // outdent/indent

        [{
            'align': []
        }],

        ['clean'] // remove formatting button
    ];
    var quill = new Quill('#quill-description-profil', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: 'Description...'
    });
    quill.on('editor-change', function (eventName, ...args) {
        if (eventName === 'text-change') {

            var content = quillDebut + document.querySelector("#quill-description-profil .ql-editor").innerHTML + quillFin;
            document.getElementById("Description").value = content;

        } else if (eventName === 'selection-change') {
            var content = quillDebut + document.querySelector("#quill-description-profil .ql-editor").innerHTML + quillFin;
            document.getElementById("Description").value = content;
        }
    });
    var quill2 = new Quill('#quill-methodo-profil', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: 'Méthodologie...'
    });
    quill2.on('editor-change', function (eventName, ...args) {
        if (eventName === 'text-change') {

            var content = quillDebut + document.querySelector("#quill-methodo-profil .ql-editor").innerHTML + quillFin;
            document.getElementById("Methodology").value = content;

        } else if (eventName === 'selection-change') {
            var content = quillDebut + document.querySelector("#quill-methodo-profil .ql-editor").innerHTML + quillFin;
            document.getElementById("Methodology").value = content;
        }
    });
}

function ChangeCurrentUserPassword() {
    var oldPw = $("#Oldpassword").val();
    var newPw = $("#Password").val();
    var confPw = $("#ConfirmPassword").val();
    if (newPw === confPw) {
        $.ajax({
            type: "POST",
            url: "/Account/ChangePassword",
            dataType: 'json',
            data: {
                oldPassword: oldPw,
                newPassword: newPw
            },
            success: function (response) {
                if (response.success) {
                    $("#Oldpassword").val("");
                    $("#Password").val("");
                    $("#ConfirmPassword").val("");
                    showToast('success', 'Votre mot de passe a été changé avec succès !');
                } else {
                    showToast('error', response.responseText);
                    return false;
                }
            }
        });
    }
    else {
        showToast('error', 'Les 2 mots de passe ne correspondent pas !');
        return false;
    }
}

function removeMyAccount() {
    $.ajax({
        type: "POST",
        url: "/Account/RemoveMyAccount",
        dataType: 'json',
        data: {
            password: $("#password2").val()
        },
        success: function (response) {
            if (response.success) {                
                window.location.href = "/compte-supprime";
            } else {
                showToast('error', response.responseText);
            }
        }
    });
}

function checkPhone() {
    $.ajax({
        type: "POST",
        url: "/Account/checkPhone",
        dataType: 'json',
        data: {
            phone: $("#VerifTel").val()
        },
        success: function (response) {
            if (response.success) {
                showPhoneValidation();
            } else {
                alert(response.responseText);
            }
        }
    });
}

function validatePhoneCode() {
    $.ajax({
        type: "POST",
        url: "/Account/checkPhoneCode",
        dataType: 'json',
        data: {
            code: $("#VerifTelCode1").val() +
                $("#VerifTelCode2").val() +
                $("#VerifTelCode3").val() + 
                $("#VerifTelCode4").val() + 
                $("#VerifTelCode5").val(),
            num: $("#VerifTel").val()
        },
        success: function (response) {
            if (response.success) {
                addTelVerifValid();     
                if ($('#secu-section').length)
                    showAccountComponent('secu');
                else
                    window.location.href = '/inscription-etape-4-email';
            } else {
                addTelVerifError();
            }
        }
    });
}

function validateStudentPhoneCode() {
    $.ajax({
        type: "POST",
        url: "/Account/checkPhoneCode",
        dataType: 'json',
        data: {
            code: $("#VerifTelCode1").val() +
                $("#VerifTelCode2").val() +
                $("#VerifTelCode3").val() +
                $("#VerifTelCode4").val() +
                $("#VerifTelCode5").val(),
            num: $("#VerifTel").val()
        },
        success: function (response) {
            if (response.success) {
                addTelVerifValid();
                $("#ValidatedPhone").val($("#VerifTel").val());
                $("#divPhoneValidated").css("display", "flex");
                $("#divPhoneToValidate").css("display", "none");
            } else {
                addTelVerifError();
                $("#ValidatedPhone").val("");
                $("#divPhoneValidated").css("display", "none");
                $("#divPhoneToValidate").css("display", "flex");
            }
        }
    });
}

function checkEmail() {
    $.ajax({
        type: "POST",
        url: "/Account/checkEmail",
        dataType: 'json',
        data: {
            email: $("#VerifMail").val()
        },
        success: function (response) {
            if (response.success) {
                showMailValidation();
            } else {
                alert(response.responseText);
            }
        }
    });
}

function validateEmailCode() {
    $.ajax({
        type: "POST",
        url: "/Account/checkEmailCode",
        dataType: 'json',
        data: {
            code: $("#VerifMailCode1").val() +
                $("#VerifMailCode2").val() +
                $("#VerifMailCode3").val() +
                $("#VerifMailCode4").val() +
                $("#VerifMailCode5").val(),
            num: $("#VerifMail").val()
        },
        success: function (response) {
            if (response.success) {
                addTelVerifValid();
                if ($('#secu-section').length)
                    showAccountComponent('secu');
                else
                    window.location.href = '/inscription-etape-4-identite';
            } else {
                addMailVerifError();
            }
        }
    });
}

function validatePhoneCodeForgottenPwd() {
    $.ajax({
        type: "POST",
        url: "/Account/CheckPasswordPhoneCode",
        dataType: 'json',
        data: {
            code: $("#VerifTelCode1").val() +
                $("#VerifTelCode2").val() +
                $("#VerifTelCode3").val() +
                $("#VerifTelCode4").val() +
                $("#VerifTelCode5").val(),
            num: $("#VerifTel").val()
        },
        success: function (response) {
            if (response.success) {
                addTelVerifValid();
                window.location.href = response.callbackURL;
            } else {
                addTelVerifError();
            }
        }
    });
}


function validatePhoneCodeReg() {
    $.ajax({
        type: "POST",
        url: "/Account/checkPhoneCode",
        dataType: 'json',
        data: {
            code: $("#VerifTelCode1").val() +
                $("#VerifTelCode2").val() +
                $("#VerifTelCode3").val() +
                $("#VerifTelCode4").val() +
                $("#VerifTelCode5").val(),
            num: $("#VerifTel").val()
        },
        success: function (response) {
            if (response.success) {
                addTelVerifValid();
                $("#Phone").val($("#VerifTel").val());
            } else {
                addTelVerifError();
            }
        }
    });
}

function removePhone() {
    if (confirm("Etes vous sûr de vouloir supprimer ce numéro de téléphone ?")) {
        $.ajax({
            type: "POST",
            url: "/Account/removePhone",
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    showAccountComponent('secu');
                } else {
                    alert(response.responseText);
                }
            }
        });
    }
}


function logout() {
    document.getElementById('logoutForm').submit();
}

function searchProcess(withCookies) {

    if (withCookies !== undefined && withCookies) {
        var content = $("#SearchContent").val() !== "" ? Base64.encode($("#SearchContent").val()) : $("#SearchContentMenu").val() !== "" ? Base64.encode($("#SearchContentMenu").val()) : "";
        var location = $("#SearchLocation").val() !== "" ? Base64.encode($("#SearchLocation").val()) : "";
        searchWithCookies('/recherche/cours-particuliers', content, location);
    }
    else {
        if ($(".search-main-container").hasClass('coach'))
            searchProcessCoach();
        else if ($(".search-main-container").hasClass('school'))
            searchProcessEstablishment();
        else
            searchProcessCoach(); //HP
    }
    //closeSearchSuggestions();
}

function searchProcessCoach() {

    var searchResultContainer = $("#search-section-coach");
    var searchMainContent = $("#SearchContent").val();
    var searchMainLocation = $("#SearchLocation").val();

    if (!searchResultContainer.length) {
        if (searchMainContent.length === 0)
            searchMainContent = "-";
        window.location.href = "/recherche/cours-particuliers/" + searchMainContent + "/" + searchMainLocation;
    }
    else {
        var filterSubjects = $("#KeyWordListSubject").val();

        if (searchMainContent.length > 0) {
            if (filterSubjects.length > 0)
                filterSubjects = searchMainContent + "|" + filterSubjects;
            else
                filterSubjects = searchMainContent;
        }

        var arrFilterLevels = [];
        var arrFilterLevelsForRow = [];
        if ($("#LevelC").prop('checked')) { arrFilterLevels.push('C'); arrFilterLevelsForRow.push("Collège"); }
        if ($("#LevelS").prop('checked')) { arrFilterLevels.push('S'); arrFilterLevelsForRow.push("Seconde"); }
        if ($("#LevelP").prop('checked')) { arrFilterLevels.push('P'); arrFilterLevelsForRow.push("Première"); }
        if ($("#LevelT").prop('checked')) { arrFilterLevels.push('T'); arrFilterLevelsForRow.push("Terminale"); }
        if ($("#LevelE").prop('checked')) { arrFilterLevels.push('E'); arrFilterLevelsForRow.push("Etudiants"); }
        if ($("#LevelJA").prop('checked')) { arrFilterLevels.push('JA'); arrFilterLevelsForRow.push("Jeunes Actifs"); }

        var arrFilterFormats = [];
        var arrFilterFormatsForRow = [];
        if ($("#webcam").prop('checked')) { arrFilterFormats.push('Webcam'); arrFilterFormatsForRow.push("Par Webcam"); }
        if ($("#coachHome").prop('checked')) { arrFilterFormats.push('CoachHome'); arrFilterFormatsForRow.push("Chez le coach"); }
        if ($("#studentHome").prop('checked')) { arrFilterFormats.push('StudentHome'); arrFilterFormatsForRow.push("Chez l'élève"); }

        var minPrice = $("#pc-coach-min-number-price").length ? parseInt($("#pc-coach-min-number-price").val(), 10) : parseInt($("#mobile-coach-min-number-price").val(), 10);
        var maxPrice = $("#pc-coach-max-number-price").length ? parseInt($("#pc-coach-max-number-price").val(), 10) : parseInt($("#mobile-coach-max-number-price").val(), 10);
        if ($("#freeCoach").prop('checked')) {
            minPrice = 0;
            maxPrice = 0;
        }
        else if (minPrice == 0 && maxPrice == 80) {
            minPrice = -1;
            maxPrice = -1;
        }

        var minEval = 0;
        var maxEval = 5;
        if ($("#ReviewSup4").prop('checked'))
            minEval = 4;
        else if ($("#Review24").prop('checked')) {
            minEval = 2;
            maxEval = 4;
        }

        searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");

        //SearchListStringRow = filterSubjects.replace(/|/g, ", ");
        SearchListStringRow = filterSubjects.split('|').join(', ');
        if (arrFilterLevelsForRow.length > 0) {
            SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
            SearchListStringRow += arrFilterLevelsForRow.join(', ');
        }
        if (arrFilterFormatsForRow.length > 0) {
            SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
            SearchListStringRow += arrFilterFormatsForRow.join(', ');
        }
        if (minPrice > -1 && maxPrice > -1) {
            SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
            if (maxPrice === 0)
                SearchListStringRow += "Bénévole";
            else if (minPrice === 0)
                SearchListStringRow += " Inférieur à " + maxPrice + " €";
            else
                SearchListStringRow += " Entre " + minPrice + " € et " + maxPrice + " €";
        }
        else {
            if (minPrice > -1) {
                SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
                SearchListStringRow += " Tarif supérieur à " + minPrice + " €";
            }
            if (maxPrice > -1) {
                SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
                SearchListStringRow += " Tarif inférieur à " + maxPrice + " €";
            }
        }
        if (minEval > 0) {
            SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
            SearchListStringRow += minEval + "* < Avis < " + maxEval + "*";
        }
        if (searchMainLocation.length > 0) {
            SearchListStringRow = SearchListStringRow.length > 0 ? SearchListStringRow + " - " : SearchListStringRow;
            SearchListStringRow += searchMainLocation;
        }

        //$("#h1Search").html("Recherche de cours particuliers: " + SearchListStringRow);

        $.ajax({
            type: "POST",
            url: "/Search/SearchCoach",
            //dataType: 'json',
            data: {
                filterSubjects: filterSubjects,
                filterLevels: arrFilterLevels.join('|'),
                filterFormats: arrFilterFormats.join('|'),
                minPrice: minPrice,
                maxPrice: maxPrice,
                minEval: minEval,
                maxEval: maxEval,
                location: searchMainLocation,
                maxCount: -1
            },
            success: function (response) {
                if (response.success) {
                    var count = response.idList.length;
                    if (count > 200)
                        response.idList.splice(199, response.idList.length - 200); //to limit response size
                    var sidList = response.idList.join(',');
                    $.get("/Component/GetSearchResultCoachsComponent", {
                        idList: sidList,
                        searchListRow: SearchListStringRow,
                        totalCount: response.totalCount,
                        totalCountWMF: response.totalCountWMF
                    }, function (data) {
                        $('#loader-account').remove();
                        searchResultContainer.html(data);
                        firstBuffer("SearchPage");
                    });
                } else {
                    $('#loader-account').remove();
                    alert('erreur');
                }
            }
        });
    }
}

function searchProcessEstablishment() {

    var searchResultContainer = $("#search-section-establishment");
    var searchMainContent = "";
    var searchMainLocation = "";

    if ($("#SearchEstabLocation").length)
        searchMainLocation += $("#SearchEstabLocation").val();
    else if ($("#SearchLocation").length)
        searchMainLocation += $("#SearchLocation").val();

    if ($("#SearchEstabContent").length)
        searchMainContent += $("#SearchEstabContent").val();
    else if ($("#SearchContent").length)
        searchMainContent += $("#SearchContent").val();

   
    if (!searchResultContainer.length) {
        if (searchMainContent.length === 0)
            searchMainContent = "-";
        window.location.href = "/recherche/etablissement/" + searchMainContent + "/" + searchMainLocation;
    }
    else {
        var arrFilterDegrees = [];
        var arrFilterDegreesForRow = [];
        $('[id^=prgDegreeChoice_]').each(function () {
            if ($(this).prop('checked')) {
                arrFilterDegrees.push($(this).attr("id").split('_')[1]);
                arrFilterDegreesForRow.push($(this).next().html());
            }
        });

        var arrFilterDomains = [];
        var arrFilterDomainsForRow = [];
        $('[id^=domain_]').each(function () {
            if ($(this).prop('checked')) {
                arrFilterDomains.push($(this).attr("id").split('_')[1]);
                arrFilterDomainsForRow.push($(this).next().html());
            }
        });
        
        var arrFilterTypes = [];
        var arrFilterTypesForRow = [];
        $('[id^=type_]').each(function () {
            if ($(this).prop('checked')) {
                arrFilterTypes.push($(this).attr("id").split('_')[1]);
                arrFilterTypesForRow.push($(this).next().html());
            }
        });

        var filterSubjects = $("#KeyWordListSubject").val();
        if (searchMainContent.length > 0) {
            if (filterSubjects.length > 0)
                filterSubjects = searchMainContent + "|" + filterSubjects;
            else
                filterSubjects = searchMainContent;
        }

        var isTypeInitial = $("#IsTypeInitial").prop('checked');
        var isTypeAlterAppr = $("#IsTypeAlterAppr").prop('checked');
        var isTypeAlterPro = $("#IsTypeAlterPro").prop('checked');

        searchResultContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-account'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");

        var SearchListStringRow = "";
        if (searchMainContent !== "")
            SearchListStringRow += searchMainContent;
        if (searchMainLocation !== "") {
            if (SearchListStringRow.length > 0)
                SearchListStringRow += ", ";
            SearchListStringRow += searchMainLocation;
        }
        if (arrFilterDegreesForRow.length > 0) {
            if (SearchListStringRow.length > 0)
                SearchListStringRow += ", ";
            SearchListStringRow += arrFilterDegreesForRow.join(', ');
        }
        if (arrFilterDomainsForRow.length > 0) {
            if (SearchListStringRow.length > 0)
                SearchListStringRow += ", ";
            SearchListStringRow += arrFilterDomainsForRow.join(', ');
        }
        if (arrFilterTypesForRow.length > 0) {
            if (SearchListStringRow.length > 0)
                SearchListStringRow += ", ";
            SearchListStringRow += arrFilterTypesForRow.join(', ');
        }

        //$("#h1Search").html("Recherche d'écoles et de formations: " + SearchListStringRow);

        $.ajax({
            type: "POST",
            url: "/AcaSearch/SearchEstablishment",
            //dataType: 'json',
            data: {
                filterDegrees: arrFilterDegrees.join('|'),
                filterDomains: arrFilterDomains.join('|'),
                filterTypes: arrFilterTypes.join('|'),
                filterSubjects: filterSubjects,
                location: searchMainLocation,
                isTypeInitial,
                isTypeAlterAppr,
                isTypeAlterPro,
                maxCount: 0
            },
            success: function (response) {
                if (response.success) {
                    var count = response.idList.length;
                    if (count > 200)
                        response.idList.splice(199, response.idList.length - 200); //to limit response size
                    var sidList = response.idList.join(',');
                    $.get("/AcaComponent/GetSearchResultEstablishmentsComponent", {
                        idList: sidList,
                        searchListRow: SearchListStringRow,
                        totalCount: response.totalCount,
                        totalCountWMF: response.totalCountWMF
                    }, function (data) {
                        $('#loader-account').remove();
                        searchResultContainer.html(data);
                        firstBuffer("SearchPage");
                    });
                } else {
                    $('#loader-account').remove();
                    alert('erreur');
                }
            }
        });
    }
}

function checkToRemove() {
    var eltsToRemove = document.querySelectorAll(".existsOnlyOnDesktop, .existsOnlyOnMobile");
    eltsToRemove.forEach(function (item) {
        if ($(item).css("visibility") == "hidden")
            item.parentNode.removeChild(item);
    });
}

function checkSearch(e, withCookies) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode === 13)
        searchProcess(withCookies);
}

function getSocialNetworkLink(socialNetwork, estabId) {
    $.ajax({
        type: "POST",
        url: "/AcaUser/GetSocialNetworkLink",
        dataType: 'json',
        data: {
            socialNetwork: socialNetwork,
            idEstab: estabId
        }
    });
}


function previousMap(campusOnly) {
    if (campusOnly) {
        $.ajax({
            type: "POST",
            url: "/AcaUser/PreviousCampusMap",
            dataType: 'json',
            data: {
                idAcaMaster: $('#idAcaMaster').val(),
                idCurrentIdx: $('#idCurrentIdx').val()
            },
            success: function (response) {
                if (response.success) {
                    if (response.newIdx == -1) {
                        $('#idCurrentIdx').val(response.newIdx);
                        $('#mapFrameCampus').attr('src', $("#memoMapLink").val());
                        $('#lblAddressCity').html($("#memoCity").val());
                        $('#lblAddressFull').html($("#memoAddress1").val() + " - " + $("#memoCity").val());
                        $('#arrowPrevCampus').css("display", "none");
                        $('#arrowNextCampus').css("display", "block");
                    }
                    else {
                        $('#idCurrentIdx').val(response.newIdx);
                        $('#mapFrameCampus').attr('src', response.newMapLink);
                        $('#lblAddressCity').html(response.addressCity);
                        $('#lblAddressFull').html(response.addressFull);
                        if (response.first)
                            $('#arrowPrevCampus').css("display", "none");
                        else
                            $('#arrowPrevCampus').css("display", "block");
                        if (response.last)
                            $('#arrowNextCampus').css("display", "none");
                        else
                            $('#arrowNextCampus').css("display", "block");
                    }
                }
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "/AcaUser/PreviousPartnerMap",
            dataType: 'json',
            data: {
                idAcaMaster: $('#idAcaMaster').val(),
                idCurrentAca: $('#idCurrentAca').val()
            },
            success: function (response) {
                if (response.success) {
                    $('#idCurrentAca').val(response.newId);
                    $('#mapFrame').attr('src', response.newMapLink);
                    $('#mapName').html(response.lblAddress);
                    if (response.first)
                        $('#arrowPrev').css("display", "none");
                    else
                        $('#arrowPrev').css("display", "block");
                    if (response.last)
                        $('#arrowNext').css("display", "none");
                    else
                        $('#arrowNext').css("display", "block");
                }
            }
        });
    }
}

function nextMap(campusOnly) {
    if (campusOnly) {
        $.ajax({
            type: "POST",
            url: "/AcaUser/NextCampusMap",
            dataType: 'json',
            data: {
                idAcaMaster: $('#idAcaMaster').val(),
                idCurrentIdx: $('#idCurrentIdx').val()
            },
            success: function (response) {
                if (response.success) {
                    $('#idCurrentIdx').val(response.newIdx);
                    if (response.newMapLink !== "")
                        $('#mapFrameCampus').attr('src', response.newMapLink);
                    if (response.addressCity !== "")
                        $('#lblAddressCity').html(response.addressCity);
                    if (response.addressFull !== "")
                        $('#lblAddressFull').html(response.addressFull);
                    if (response.first)
                        $('#arrowPrevCampus').css("display", "none");
                    else
                        $('#arrowPrevCampus').css("display", "block");
                    if (response.last)
                        $('#arrowNextCampus').css("display", "none");
                    else
                        $('#arrowNextCampus').css("display", "block");
                }
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "/AcaUser/NextPartnerMap",
            dataType: 'json',
            data: {
                idAcaMaster: $('#idAcaMaster').val(),
                idCurrentAca: $('#idCurrentAca').val()
            },
            success: function (response) {
                if (response.success) {
                    $('#idCurrentAca').val(response.newId);
                    if (response.newMapLink !== "")
                        $('#mapFrame').attr('src', response.newMapLink);
                    if (response.lblAddress !== "")
                        $('#mapName').html(response.lblAddress);
                    if (response.first)
                        $('#arrowPrev').css("display", "none");
                    else
                        $('#arrowPrev').css("display", "block");
                    if (response.last)
                        $('#arrowNext').css("display", "none");
                    else
                        $('#arrowNext').css("display", "block");
                }
            }
        });
    }
}

function clientManageTracking(idEstab, source) {
    $.ajax({
        type: "POST",
        url: "/AcaUser/ClientManageTracking",
        dataType: 'json',
        data: { idEstab: idEstab, source: source },
        success: function (response) {
        }
    });
}

function showAcaPremiumTab(menuSel, idAca) {
    var container;
    switch (menuSel) {
        case "Programs":
            container = document.getElementById("formations");
            if (container !== null) {
                $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                if (idAca === null)
                    idAca = -1;
                $.get("/AcaComponent/GetProgramsListViewComponent", { idAca: idAca }, function (data) {
                    container.innerHTML = data;
                });
                clientManageTracking(idAca, "Programs");
            }
            break;

        case "Medias":
            container = document.getElementById("medias");
            if (container !== null) {
                if ($(container).html() === "") {
                    $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                    if (idAca === null)
                        idAca = -1;
                    $.get("/AcaComponent/GetMediasListViewComponent", { idAca: idAca }, function (data) {
                        container.innerHTML = data;
                    });
                }
                clientManageTracking(idAca, "Videos");
                clientManageTracking(idAca, "Photos"); //or Media ?
            }
            break;

        case "Partners":
            //GetListPartners
            container = document.getElementById("partnersList");
            if (container !== null) {
                $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                if (idAca === null)
                    idAca = -1;
                $.get("/AcaComponent/GetPartnersListViewComponent", { idAca: idAca, defaultCoverImg: "/images/emptyCover.jpg", defaultLogoImg: "/images/empty.svg" }, function (data) {
                    container.innerHTML = data;

                    var cpt = 0;
                    var eltsCities = $("#campusListCities").val().split('|');
                    if (eltsCities.length > 0)
                        Array.prototype.forEach.call(eltsCities, function (elt) {
                            $.get("/AcaComponent/GetEstabCardViewComponent", { idAca: idAca, defaultCoverImg: "/images/emptyCover.jpg", defaultLogoImg: "/images/empty.svg", campusCity: elt, isCampus: true, isPartner: false }, function (data) {
                                container.innerHTML += data;
                                cpt++;
                                if (cpt == eltsCities.length) {
                                    var elts = $("#partnersListId").val().split('|');
                                    Array.prototype.forEach.call(elts, function (elt) {
                                        if (elt !== "") {
                                            $.get("/AcaComponent/GetEstabCardViewComponent", { idAca: parseInt(elt, 10), defaultCoverImg: "/images/emptyCover.jpg", defaultLogoImg: "/images/empty.svg", campusCity: "", isCampus: false, isPartner: true }, function (data) {
                                                container.innerHTML += data;
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    else {
                        var elts = $("#partnersListId").val().split('|');
                        Array.prototype.forEach.call(elts, function (elt) {
                            $.get("/AcaComponent/GetEstabCardViewComponent", { idAca: parseInt(elt, 10), defaultCoverImg: "/images/emptyCover.jpg", defaultLogoImg: "/images/empty.svg", campusCity: "", isCampus: false, isPartner: true }, function (data) {
                                container.innerHTML += data;
                            });
                        });
                    }
                });
                clientManageTracking(idAca, "Partners");
            }
            break;
    }
}

function showProgListLoop(idAca, idProgram) {
    var container = document.getElementById("formations");
    if (container !== null) {
        $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.get("/AcaComponent/GetProgramsDetailedListLoopViewComponent", { idAca: idAca, idProgram: idProgram }, function (data) {
            container.innerHTML = data;
        });
    }
}

function showProg(idProg) {
    if (idProg !== -1) {
        var prgDivElts = document.getElementsByClassName("prgLoop");
        Array.prototype.forEach.call(prgDivElts, function (elt) {
            if (elt.id === "programDet_" + idProg)
                $(elt).css({ display: 'block' });
            else
                $(elt).css({ display: 'none' });
        });

        var idAca = $("#idAca").val();
        var container = $("#ProgramEmploymentInfos");
        $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.get("/AcaComponent/GetAcaProgEmploymentInfosViewComponent", { idProgram: idProg }, function (data) {
            $(container).html(data);
        });
    }
}

function addAgendaMonth(nbMonth, fromWeekChanged) {
    var id = $("#Dashboard_id").val();
    var year = $("#StartDateTimeYear").val();
    var month = $("#StartDateTimeMonth").val();
    var day = $("#StartDateTimeDay").val();
    //$("#DashboardAgendaMonth").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
    $.get("/Component/GetDashboardAgendaMonth", {
            id: id,        
            year: year,
            month: month,
            day: day,
            addMonth: nbMonth
        }, function (data) {
            $("#DashboardAgendaMonth").html(data);
            if (!fromWeekChanged) {
                $("#RefDateTimeYear").val($("#StartDateTimeYear").val());
                $("#RefDateTimeMonth").val($("#StartDateTimeMonth").val());
                $("#RefDateTimeDay").val($("#StartDateTimeDay").val());
                addAgendaWeek(0, true);
            }
    });
}

function addAgendaWeek(nbWeek, fromMonthChanged) {
    var id = $("#Dashboard_id").val();
    var year = $("#RefDateTimeYear").val();
    var month = $("#RefDateTimeMonth").val();
    var day = $("#RefDateTimeDay").val();
    //$("#DashboardAgendaMonth").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
    $.get("/Component/GetDashboardAgendaWeek", {
        id: id,
        year: year,
        month: month,
        day: day,
        addWeek: nbWeek
    }, function (data) {
            $("#DashboardAgendaWeek").html(data);
    });
}

function fillAgendaDayDetail(year, month, day) {
    var id = $("#Dashboard_id").val();
    $.get("/Component/GetDashboardAgendaDayDetail", {
        id: id,
        year: year,
        month: month,
        day: day
    }, function (data) {
            $("#DashboardAgendaThumbsContainer").html(data);
            if (data.length <= 0) {
                var eventInfo = $('.tdb-cat-section.agenda .detail-selected-event-container');
                if (eventInfo.hasClass('open'))
                    eventInfo.removeClass('open');
            }
            else {
                $('.tdb-cat-section.agenda .detail-selected-event-container .close').on('click', function () {
                    var eventInfo = $('.tdb-cat-section.agenda .detail-selected-event-container');
                    eventInfo.removeClass('open');
                });
            }
            //showAgendaDetail('AgendaDay_' + day);
    });
}

function cancelBooking(id, corrFirstName, asCoach) {    
    $("#selectedBookingId").val(id);
    $("#selectedBookingFirstName").html(corrFirstName);
    openTdbPopUp('reject-reservation', true)
}

function confirmCancelBooking() {
    //alert("Confirmation Canceling " + $("#selectedBookingId").val() + " - msg: " + $("#selectedBookingReason option:selected").text() + " !");
    $.ajax({
        type: "POST",
        url: "/AppUser/CancelBooking",
        dataType: 'json',
        data: {
            idBooking: $("#selectedBookingId").val(),
            msg: $("#selectedBookingReason option:selected").text()
        },
        success: function (response) {            
            $("#dashboardBooking").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/GetdashboardBooking", {
                id: $("#Dashboard_id").val()
            }, function (data) {
                    $("#dashboardBooking").html(data);

                    $.ajax({
                        type: "POST",
                        url: "/Message/sendBookingInformations",
                        dataType: 'json',
                        data: {
                            typeInformation: 'canceled',
                            sendNotification: true,
                            sendEmail: true,
                            sendSMS: false
                        },
                        success: function (response) {
                        },
                        error: function (response) {
                        }
                    });

            });
        },
        error: function (response) {
        }
    });
}

function confirmAcceptBooking(id) {
    $.ajax({
        type: "POST",
        url: "/AppUser/AcceptBooking",
        dataType: 'json',
        data: {
            idBooking: id
        },
        success: function (response) {
            $("#dashboardBooking").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
            $.get("/Component/GetdashboardBooking", {
                id: $("#Dashboard_id").val()
            }, function (data) {
                $("#dashboardBooking").html(data);

                $.ajax({
                    type: "POST",
                    url: "/Message/sendBookingInformations",
                    dataType: 'json',
                    data: {
                        typeInformation: 'confirmed',
                        sendNotification: true,
                        sendEmail: true,
                        sendSMS: false
                    },
                    success: function (response) {
                    },
                    error: function (response) {
                    }
                });

            });
        },
        error: function (response) {
        }
    });
}

function startBooking(id) {
    $.ajax({
        type: "POST",
        url: "/AppUser/StartBooking",
        dataType: 'json',
        data: {
            idBooking: id
        },
        success: function (response) {
            if ($("#dashboardBooking").html().trim() === "") {
                $("#dashboardBooking").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.get("/Component/GetdashboardBooking", {
                    id: $("#Dashboard_id").val()
                }, function (data) {
                    $("#dashboardBooking").html(data);
                });
            }

            if (response.linkURL !== "") {
                window.open(
                    response.linkURL,
                    '_blank'
                );
            }
            else
                showToast('success', response.message);
        },
        error: function (response) {
            showToast('error', response.message);
        }
    });
}

function checkPhoneValidation() {

    $.ajax({
        type: "POST",
        url: "/Account/checkPhoneExists",
        dataType: 'json',
        data: {
            phone: $("#VerifTel").val(),
            sendSms: true
        },
        success: function (response) {
            if (response.success)
                showPhoneValidation();
            else
                $("#NumNotFound").css("display", "block");
        },
        error: function (response) {
            $("#NumNotFound").css("display", "block");
        }
    });   
}

function fillUserCardsList() {
}

function searchWithCookies(root, subject, location) {
    document.cookie = "subject=" + subject + ';path =/';
    document.cookie = "location=" + location + ';path =/';

    window.location.href = root;
}

function checkValidationElt(eltId) {
    if ($('#' + eltId).val() !== undefined && $('#' + eltId).val() !== '') {
        if ($('#div' + eltId).hasClass("error"))
            $('#div' + eltId).removeClass("error");
        if (!$('#div' + eltId).hasClass("valid"))
            $('#div' + eltId).addClass("valid");
        return true;
    }
    else {
        if ($('#div' + eltId).hasClass("valid"))
            $('#div' + eltId).removeClass("valid");
        if (!$('#div' + eltId).hasClass("error"))
            $('#div' + eltId).addClass("error");
        return false;
    }
}

function contactAcaProfile() {
    if (validateForm($('#AskInformationsForm')))
    {
        var arrElts = $('#AskInformationsForm').serializeArray();
        var o = new Object();
        for (var i = 0; i < arrElts.length; i++) {
            o[arrElts[i].name] = arrElts[i].value;
        }
        var datas = {
            destEmail: o.estabEmail == null ? "" : o.estabEmail,
            firstName: o.firstName == null ? "" : o.firstName,
            lastName: o.lastName == null ? "" : o.lastName,
            birthDate: o.birthDate == null ? "" : o.birthDate,
            email: o.email == null ? "" : o.email,
            phone: o.phone == null ? "" : o.phone,
            country: o.country == null ? "" : o.country,
            zipCode: o.zipCode == null ? "" : o.zipCode,
            city: o.city == null ? "" : o.city,
            niveau: o.niveau == null ? "" : o.niveau,
            level: o.level == null ? "" : o.level,
            program: o.formation == null ? "" : o.formation,
            qlEditor: o.QLmessage == null ? "" : o.QLmessage,
            estabAlias: o.estabAlias == null ? "" : o.estabAlias
        };

        $.ajax({
            type: "POST",
            url: "/Aca/SendRequestMessageToAca",
            dataType: 'json',
            data: datas, //{ custImg: $("#custImg2").val() },
            success: function (response) {
                if (!response.success) {
                    alert("Erreur lors de l'envoi du formulaire !");
                }
                else {
                    window.location.href = '/etablissement/' + $("#estabAlias").val() + '/message-envoye';
                }
            }
        });

    }
    else
        return false;
}

function authorizationProcess(returnUrl) {
    document.cookie = "returnUrl=" + returnUrl + "; path=/ ";
    window.location.href = "/se-connecter";
}

function showConversation(idConversation, correspondantMuId, myMuId) {
    var container = document.getElementById("chatContent");
    if (container !== null) {
        $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.get("/Component/ChatContent", { idConversation: idConversation }, function (data) {
            container.innerHTML = data;            
            $("#input_message").focus();
            container = document.getElementById("chatInfos");
            if (container !== null) {
                $(container).html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader1'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
                $.get("/Component/ChatInfos", { idConversation: idConversation }, function (data) {
                    container.innerHTML = data;
                    visualChatUpdate();
                });

                $.ajax({
                    type: "POST",
                    url: "/Message/ReadAllHisMessages",
                    dataType: 'json',
                    data: {
                        messageUserId: myMuId
                    },
                    success: function (response) {
                        $("#lastMsgWith_" + correspondantMuId).html("");
                        $("#msgUnreadMsgWith_" + correspondantMuId).html("");
                        $("#countUnreadMsgWith_" + correspondantMuId).val(0);

                        refreshChatNotifications();

                    },
                    error: function (response) {
                    }
                });

            }
        });
    }
    var convListContainer = document.querySelector('.chat-main-container .conv-list-container');
    convListContainer.classList.remove("open");
}

function refreshChatNotifications() {
    var chatNotificationContainer = $("#chatNotifications");
    $.get("/Component/ChatNotifications", { userID: $("#CurrentLoggedAppUserId").val(), messageUserId: $("#CurrentLoggedMessageUserId").val() }, function (data) {
        chatNotificationContainer.html(data);
    });
}

function saveStudentToCoachEvaluation() {
    var interviewElt = document.getElementById("interviewId");
    var interviewId = 0;
    var isAno = false;
    var isReco = false;

    if (document.querySelector('input[name="recommande"]:checked') !== null)
        if (document.querySelector('input[name="recommande"]:checked').value === 'yes')
            isReco = true;

    var ponctuRate = document.querySelector('input[name="ponctu"]:checked').value;
    var pedaRate = document.querySelector('input[name="peda"]:checked').value;
    var relaRate = document.querySelector('input[name="rela"]:checked').value;
    var mainComment = "";
    if (interviewElt != null) {
        interviewId = interviewElt.value;
        var commentMainElt = document.getElementById("commentMain"); //QlEditorInput");
        if (commentMainElt != null)
            mainComment = commentMainElt.value;
    }

    $.ajax({
        url: "/AppUser/SetStudentToCoachEvaluation",
        type: "POST",
        async: true,
        data: {
            idInterview: interviewId,
            mainComment: mainComment,
            isAno: isAno,
            isReco: isReco,
            ponctuRate: ponctuRate,
            pedaRate: pedaRate,
            relaRate: relaRate
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                //reload Dashboard
                window.location.href = "/compte/tableau-de-bord";
            } else {
                alert(response.responseText);
            }
        }
    });
}

function saveCoachToStudentEvaluation() {
    var interviewElt = document.getElementById("interviewId");
    var interviewId = 0;
    var isAno = false;
    var isReco = false;

    if (document.querySelector('input[name="recommande"]:checked') !== null)
        if (document.querySelector('input[name="recommande"]:checked').value === 'yes')
            isReco = true;

    var mainComment = "";
    if (interviewElt != null) {
        interviewId = interviewElt.value;
        var commentMainElt = document.getElementById("quill-input");
        if (commentMainElt != null)
            mainComment = commentMainElt.value;
    }

    $.ajax({
        url: "/AppUser/SetCoachToStudentEvaluation",
        type: "POST",
        async: true,
        data: {
            idInterview: interviewId,
            mainComment: mainComment,
            isAno: isAno,
            isReco: isReco
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                //reload Dashboard
                window.location.href = "/compte/tableau-de-bord";
            } else {
                alert(response.responseText);
            }
        }
    });
}

function showMyReview(idBooking) {

    $.get("/Component/GetMyReview", { idBooking: idBooking }, function (data) {
        $("#showMyReviewContainer").html(data);
        openTdbPopUp('show-my-review', true);
    });    
}

function switchMeToCoach() {
    $.ajax({
        url: "/AppUser/SwitchMeToCoach",
        type: "POST",
        async: true,
        success: function (response) {
            if (response.success) {
                window.location.href = "/inscription-etape-1";
            }
            else {
                alert(response.responseText);
            }
        }
    });
}

function readAllNotificationSystem() {
    $.ajax({
        url: "/Message/ReadAllNotificationSystem",
        type: "POST",
        async: true,
        success: function (response) {
            if (response.success) {
                $("#notificationSystemCounter").css("display", "none");
            }
            else {
                showToast("error", response.responseText);
            }
        }
    });
}

function joinCourse(idBooking, popupname, order) {
    $("#selectedBookingId").val(idBooking);
    if (popupname == 'set-up-lessons')
        openTdbPopUp(popupname, order);
    else {
        $("#joinCoursePopupContainer").html("<div style='margin-left:auto; width:64px; margin-right: auto;'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.get("/Component/GetJoinCourseComponent", {
            idBooking: idBooking
        }, function (data) {
                $("#joinCoursePopupContainer").html(data);
                openTdbPopUp(popupname, order);
        });
    }
}

function setupVisio(selectedPlatform, link) {
    $.ajax({
        url: "/AppUser/SetupVisio",
        type: "POST",
        data: {
            selectedPlatform: selectedPlatform,
            link: link
        },
        success: function (response) {
            if (response.success) {
                //startBooking($("#selectedBookingId").val());
                joinCourse($("#selectedBookingId").val(), 'join-lesson', true)
            }
            else {
                showToast("error", response.responseText);
            }
        }
    });
}

function addUserCardToFavorite(id, liked) {
    $.ajax({
        url: "/AppUser/AddCardToFavorite",
        type: "POST",
        data: {
            id: id,
            liked: liked
        },
        success: function (response) {
            if (response.success) {
                showToast("success", response.responseText);
            }
        }
    });
}

function addAcaCardToFavorite(id, liked) {
    $.ajax({
        url: "/Aca/AddCardToFavorite",
        type: "POST",
        data: {
            id: id,
            liked: liked
        },
        success: function (response) {
            if (response.success) {
                showToast("success", response.responseText);
            }
        }
    });
}

function changeSelectedSectors(id) {
    checkSector(id);
}

function changeSelectedSpecialities(id) {
    checkSpeciality(id);
}

function checkSpeciality(id) {
    //alert('checking Speciality ' + id);

    id = id.toString();

    var cur = $("#SelectedSpecialitiesList").val();

    var arr = [];
    if (cur.length > 0)
        arr = cur.split('|');
    var found = false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === id) {
            found = true;
            arr.splice(i, 1);
            i--;
        }
    }

    if (!found)
        arr.push(id);

    $("#SelectedSpecialitiesList").val(arr.join('|'))
}

function checkSector(id) {
    alert('checking Sector ' + id);
}

function exportView() {
    $.ajax({
        url: "/Admin/ExportView",
        type: "POST",
        success: function (response) {
            if (response.success) {
                window.location.href = response.exportFile;
            }
        }
    });
}
