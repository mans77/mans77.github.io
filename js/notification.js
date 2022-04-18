"use strict";

var gNotificationSignalR;
var gUserID = $("#CurrentLoggedAppUserId").val();
var defaultPictureLocation = '/AppUsers/GetUserImageFile/'; //A MODIFIER: l'url de l'emplacement des images //TODO


// ------------------------ SIGNAL R ---------------------------- //
var tryReconnectNotifInterval = null;


function notifSignalR_start(connectionSignalR) {
    console.log("signalR notification connection");

    connectionSignalR.start()
        .then(notifSignalR_afterConnected)
        .catch(function (err) {
            console.log('error : disconnected ?');

            //on essaye de reconnecter toutes les 5 secondes
            tryReconnectNotifInterval = setTimeout(function () { notifSignalR_reconnect(); }, 5000);

            return console.error(err.toString());
        });
}
function notifSignalR_afterConnected() {
    console.log("signalR notification connected");

    clearInterval(tryReconnectNotifInterval);
}
function notifSignalR_connect() {
    gNotificationSignalR = new signalR.HubConnectionBuilder().withUrl("/notificationHub?userID=" + gUserID).build();
    //gNotificationSignalR = new signalR.HubConnectionBuilder().withUrl("/notificationHub?userID=" + gUserID).build();

    //notification messages
    gNotificationSignalR.on("TestNotification", notification_testNotification);
    gNotificationSignalR.on("NewMessageNotification", notification_receiveNewMessages);
    gNotificationSignalR.on("ReadMessageNotification", notification_readHisMessages);

    //notification systèmes
    gNotificationSignalR.on("NewNotificationSystem", notification_receiveNewNotificationSystem);
    gNotificationSignalR.on("DeleteNotificationSystem", notification_deleteSucess);
    gNotificationSignalR.on("ReadAllNotificationSystem", notification_readAllSuccess);
    gNotificationSignalR.on("NewNotificationCounter", notification_receiveNewNotificationCounter);


    //il faut configurer le connectionSignalR.connection.onclose() pour rattraper quand signalR a été déconnecté
    gNotificationSignalR.connection.onclose = function (error) {
        gNotificationSignalR.connectionClosed(error);
        console.log("signalR notification deconnecté    : " + error);

        tryReconnectNotifInterval = setTimeout(function () { notifSignalR_reconnect(); }, 5000);
    };

    notifSignalR_start(gNotificationSignalR);
}
function notifSignalR_reconnect() {
    console.log("signalR notification reconnection");

    if (gNotificationSignalR !== null) {
        console.log("signalR notification stop");
        gNotificationSignalR.stop()
            .then(function () { notifSignalR_connect(); })
            .catch(function (e) { console.error('error trying to stop : ' + e); });
    }
    else
        notifSignalR_connect();
}

//on démarre signalR
notifSignalR_connect();

$('#headerNotificationCountID').on('click', function (e) {
    var $notificationNoNewMsg = $('#notificationNoNewMsg');
    if ($notificationNoNewMsg.hasClass('hidden')) return e.preventDefault(); // stops modal from being shown

    //if (!data) return e.preventDefault(); // stops modal from being shown
});
$('#headerNotificationID1').on('show.bs.modal', function (e) {
    var $notificationNoNewMsg = $('#notificationNoNewMsg');
    if ($notificationNoNewMsg.hasClass('hidden')) return e.preventDefault(); // stops modal from being shown

    //if (!data) return e.preventDefault(); // stops modal from being shown
});
$('#headerNotificationID').on('show.bs.modal', function (e) {
    var $notificationNoNewMsg = $('#notificationNoNewMsg');
    if ($notificationNoNewMsg.hasClass('hidden')) return e.preventDefault(); // stops modal from being shown

    //if (!data) return e.preventDefault(); // stops modal from being shown
});



// ------------------------ FIN SIGNAL R ---------------------------- //


/**
 * méthode appelée lors de la lecture du notification (cela permet de supprimer la notification sur toutes les onglets/instances de l'utilisateur)
 * @param {int|string} receiverID id de l'utilisateur dont on peut supprimer les notifications
 */
function notification_readHisMessages(receiverID) {

    var $notifMsgUserDiv = $('#notificationElement_' + receiverID);
    if ($notifMsgUserDiv.length > 0) {
        $notifMsgUserDiv.remove();

        //on décrémente le nombre de notifications globales
        notification_decreaseGlobalNotifCounter();
    }

}

function notification_testNotification(content) {
    alert("Notification: " + content);
}

/**
 * méthode appelée lors de la réception d'une nouvelle notification message
 */
function notification_receiveNewMessages(_message) {
    
    if (typeof _message !== 'object' || _message === null)
        return;

    //alert("notif de: " + _notificationMessageObj.firstName);
    //debugger; debugger;

    console.log("signalR ReceiveNewMessage myID:" + _message.myID + " hisID:" + _message.hisID.toString());   

    //on vérifie que l'appUserID corresponde
    if ($('#CurrentLoggedMessageUserId').val() !== _message.hisID.toString())
        return;


    //on vérifie si le chat et la conversation n'est pas déjà ouverture. Dans ce cas là, on n'incrémente pas le compteur
    if ($("#CorrespondantB2CIdMessageUser").val() === _message.myID.toString())
        return;

    //notification message
    var chatNotificationContainer = $("#chatNotifications");
    $.get("/Component/ChatNotifications", { userID: $("#CurrentLoggedAppUserId").val(), messageUserId: $("#CurrentLoggedMessageUserId").val() }, function (data) {
        chatNotificationContainer.html(data);
    });
}


//copie la notification message model pour créer la notification de l'utilisateur ayant envoyé le nouveau message
function notification_message_createFromModel($notifMsgModelDiv, _notificationMessageObj) {
    var idAppUser = _notificationMessageObj.otherAppUserID;

    //on crée le message div et on copie l'innerHTML
    var $notifMsg = $('<a/>');
    $notifMsg.attr('id', 'notificationElement_' + idAppUser);
    $notifMsg.attr('class', $notifMsgModelDiv.attr('class'));
    $notifMsg.attr('href', $notifMsgModelDiv.attr('href') + '?active=' + _notificationMessageObj.idMessageUser);
    $notifMsg.html('<li class="unseen">' + $notifMsgModelDiv.html() + '</li>');

    //il faut également ajuster les IDs du badge, fullName et date
    var $badgeDiv = $notifMsg.find('#notificationPreviewBadge_model');
    if ($badgeDiv !== null) {
        $badgeDiv.attr('id', 'notificationPreviewBadge_' + idAppUser);
        $badgeDiv.removeClass('invisible');
        //$badgeDiv.text(_notificationMessageObj.count);
    }
    var $fullNameDiv = $notifMsg.find('#notificationMessageFullName_model');
    if ($fullNameDiv !== null) {
        $fullNameDiv.attr('id', 'notificationMessageFullName_' + idAppUser);
        $fullNameDiv.text(_notificationMessageObj.firstName + ' ' + _notificationMessageObj.lastName);
    }
    var $dateDiv = $notifMsg.find('#notificationMessageDate_model');
    if ($dateDiv !== null) {
        $dateDiv.attr('id', 'notificationMessageDate_' + idAppUser);
        //$dateDiv.text(date_toString(_notificationMessageObj.notificationDate, true));
    }

    //on ajoute l'image de l'utilisateur
    var $userImgArr = $notifMsg.find('img');
    if ($userImgArr.length > 0) {
        var $userImg = $userImgArr.first();
        $userImg.attr('src', calculateSrcImgUser(idAppUser));
    }

    return $notifMsg;


    //TODO: Fonction temporaire permettant de créer l'url de l'image du profil 
    function calculateSrcImgUser(_userID) {
        return defaultPictureLocation + _userID;

        //var splitted = defaultPictureLocation.split('_');
        //return splitted[0] + _userID + splitted[1];
    }
}

/**
 * incrémente le compteur global 
 * 
 */
function notification_increaseGlobalNotifCounter() {
    var $globalNotifDiv = $('#headerNotificationCountID');
    var $noNewMsgDiv = $('#notificationNoNewMsg');

    notification_increateCounter($globalNotifDiv, $noNewMsgDiv);

    //visibilité pastille //GM
    if (+$globalNotifDiv.text() > 0) {
        if (!$globalNotifDiv.hasClass("notification_number"))
            $globalNotifDiv.addClass("notification_number");
        $globalNotifDiv.removeClass("notifNoColor");
        $globalNotifDiv.addClass("notifColor");
    }
}

function notification_increateCounter(_$notifDiv, _$noNewMsgDiv) {
    if (_$notifDiv.length === 0)
        return;

    //on masque si besoin le span "Pas de nouveau message"
    if (_$noNewMsgDiv.length > 0) {
        _$noNewMsgDiv.addClass('hidden');
    }

    //on incrémente le compteur
    _$notifDiv.text(+_$notifDiv.text() + 1);

}

/**
 * décrémente le compteur global 
 */
function notification_decreaseGlobalNotifCounter() {
    var $globalNotifDiv = $('#headerNotificationCountID');
    var $noNewMsgDiv = $('#notificationNoNewMsg');

    notification_decreaseCounter($globalNotifDiv, $noNewMsgDiv)

    //visibilité pastille //GM
    if (+$globalNotifDiv.text() == 0) {
        $globalNotifDiv.removeClass("notifColor");
        $globalNotifDiv.addClass("notifNoColor");
    }
}

function notification_decreaseCounter(_$notifDiv, _$noNewMsgDiv) {
    if (_$notifDiv === null)
        return;

    //on cast la string réprésentant le nombre de notif en int
    var nb = +_$notifDiv.text();

    //on affiche si besoin le span "Pas de nouveau message"
    if (nb === 1) {
        if (_$noNewMsgDiv.length > 0) {
            _$noNewMsgDiv.removeClass('hidden');
        }
    }
    //on décrémente le compteur
    if (nb > 0)
        _$notifDiv.text(nb - 1);

}



// conversion des dates en dates dans le timezone locale
$('[data-date]').each(function (index, element) {
    var defaultDate = "0001-01-01T00:00:00Z";
    var date = $(this).attr('data-date');
    if (date === defaultDate)
        return;

    var localDate = new Date(date);
    $(this).text(date_toString(localDate, true));
});


//le but était de pouvoir afficher/masquer les notifications lors des events mouseEnter et mouseLeave, mais cela pose des problèmes avec les classes Bootstrap utiisées pour le moment (dropdown)
function notification_display(e) {
    var $notificationNoNewMsg = $('#notificationNoNewMsg');
    if (!$notificationNoNewMsg.hasClass('hidden')) return; //on n'affiche pas le détail de la notification si pas de messages ? 

    $(e).find('#headerNotificationCountID').click();
}

function notification_hide(e) {
    var $notificationNoNewMsg = $('#notificationNoNewMsg');
    if (!$notificationNoNewMsg.hasClass('hidden')) return; //on n'affiche pas le détail de la notification si pas de messages ?

    $(e).find('#headerNotificationCountID').click();
}





//------------------------- NOTIFICATIONS SYSTEMES ----------------------- //

/**
 * fonction de signalR lors de l'on reçoit une nouvelle notification système
 * @param {Object} _notificationSystemObj obj de la notification à insérer
 */
function notification_receiveNewNotificationSystem(_notificationSystemObj) {
    //on récupère le modèle
    var $modelDiv = $('#notificationSystemElement_model');
    if ($modelDiv.length === 0)
        return;

    const notifID = _notificationSystemObj.id;

    //on copie le modèle 
    var $notifSystem = $('<div/>');
    $notifSystem.attr('id', 'notificationSystemElement_' + notifID);
    $notifSystem.attr('class', $modelDiv.attr('class'));
    $notifSystem.html($modelDiv.html());

    var $link = $notifSystem.find('#notificationSystemLink_model');
    if ($link.length > 0) {
        $link.attr('id', 'notificationSystemLink_' + notifID);
        //$link.attr('href', $link.attr('href') + '?active=' + _notificationMessageObj.idMessageUser); //TODO: Le lien
        $link.attr('href', $link.attr('href'));
    }

    //on ajuste les ID des children et le contenu
    //content
    var $contentDiv = $notifSystem.find('#notificationSystemContent_model');
    if ($contentDiv.length > 0) {
        $contentDiv.attr('id', 'notificationSystemContent_' + notifID);
        $contentDiv.text(_notificationSystemObj.content);
    }
    var $dateDiv = $notifSystem.find('#notificationSystemDate_model');
    if ($dateDiv.length > 0) {
        $dateDiv.attr('id', 'notificationSystemDate_' + notifID);
        $dateDiv.text(date_toString(_notificationSystemObj.notificationDate, true));
    }
    var $deleteDiv = $notifSystem.find('#messagingSystemDelete_model');
    if ($deleteDiv.length > 0) {
        $deleteDiv.attr('id', 'messagingSystemDelete_' + notifID);
        //$dateDiv.text(date_toString(_notificationMessageObj.notificationDate, true));
    }

    //on insère la notification dans le DOM et on la place la en première position
    $modelDiv.after($notifSystem);

    notification_increaseNotifSystemCounter();
}

/**
 * fonction de signalR lors de l'on reçoit une nouvelle notification compteur
 * @param {Object} _notificationCounterObj obj de la notification à insérer
 */
function notification_receiveNewNotificationCounter(_notificationCounterObj) {
    var txtCoach = "";
    if ($("#coachCounter").html().indexOf("coach") > 0)
        txtCoach = " coachs.";

    $("#coachCounter").html(_notificationCounterObj.nbCoachs + txtCoach);
    $("#userCounter").html(_notificationCounterObj.nbUsers);
    $("#studentCounter").html(_notificationCounterObj.nbStudents);
    $("#usersDayCounter").html(_notificationCounterObj.nbByDay);
    var x = document.getElementById("audioNewUser");
    if (x !== null)
        x.play();
}

//le but était de pouvoir afficher/masquer les notifications lors des events mouseEnter et mouseLeave, mais cela pose des problèmes avec les classes Bootstrap utiisées pour le moment (dropdown)
function notificationSystem_display(e) {
    var $notificationNoNewMsg = $('#notificationNoNewNotifSystem');
    if (!$notificationNoNewMsg.hasClass('hidden')) return; //on n'affiche pas le détail de la notification si pas de messages ? 

    $(e).find('#headerNotificationSystemCountID').click();
}

function notificationSystem_hide(e) {
    var $notificationNoNewMsg = $('#notificationNoNewNotifSystem');
    if (!$notificationNoNewMsg.hasClass('hidden')) return; //on n'affiche pas le détail de la notification si pas de messages ?

    $(e).find('#headerNotificationSystemCountID').click();
}

//incrémentation du compteur de notification système
function notification_increaseNotifSystemCounter() {
    var $globalNotifDiv = $('#headerNotificationSystemCountID');
    var $noNewNotifSystemDiv = $('#notificationNoNewNotifSystem');

    notification_increateCounter($globalNotifDiv, $noNewNotifSystemDiv);

    //visibilité pastille //GM
    if (+$globalNotifDiv.text() > 0) {
        //$globalNotifDiv.removeClass("notifNoColor");
        //$globalNotifDiv.addClass("notifColor");
        $globalNotifDiv.css("display", "block");
    }
}

//décrémentation du compteur de notification système
function notification_decreaseNotifSystemCounter() {
    var $globalNotifDiv = $('#headerNotificationSystemCountID');
    var $noNewNotifSystemDiv = $('#notificationNoNewNotifSystem');

    notification_decreaseCounter($globalNotifDiv, $noNewNotifSystemDiv);

    //visibilité pastille //GM
    if (+$globalNotifDiv.text() === 0) {
        //$globalNotifDiv.removeClass("notifColor");
        //$globalNotifDiv.addClass("notifNoColor");
        $globalNotifDiv.css("display", "none");
    }
}


/**
 * clear le compteur global 
 */
function notification_clearGlobalNotifSystemCounter() {
    var $globalNotifDiv = $('#headerNotificationSystemCountID');

    $globalNotifDiv.text(0);
    //$globalNotifDiv.removeClass("notifColor");
    //$globalNotifDiv.addClass("notifNoColor");
    $globalNotifDiv.css("display", "none");
}

/**
 * Fonction de suppression/lecture d'une notification
 * @param {Event} e event
 */
function notification_Delete(e) {
    var $deleteDiv = $(e.currentTarget);

    const idAttr = $deleteDiv.attr('id');
    var splitted = idAttr.split('_');
    if (splitted.length < 2)
        return;

    const id = +splitted[1];

    const url = '/NotificationSystem/Delete';
    const data = JSON.stringify({ NotificationID: id });
    sendAjaxRequest('POST', url, data, notification_Delete_onError, notification_Delete_onSuccess);

    //le clic sur la croix de suppression crée de temps en temps un toggle infini de la fenetre des notifications, ce qui est visiblement très pénible.

    function notification_Delete_onError(e) {
        console.error(e);
    }

    function notification_Delete_onSuccess(res) {

    }
}

//_obj = {id: xx, res: true || false}
function notification_deleteSucess(_obj) {
    if (typeof _obj === 'undefined' || _obj === null)
        return;

    if (_obj.res !== true)
        return;

    var $line = $('#notificationSystemElement_' + _obj.id);
    if ($line.length === 0)
        return;


    notification_removeFromDOM($line);


    notification_decreaseNotifSystemCounter();
}

function notification_removeFromDOM(_$deleteDiv) {
    _$deleteDiv.remove();
}


function notification_readAll() {

    const url = '/NotificationSystem/ReadAll';
    sendAjaxRequest('POST', url, '', notification_ReadAll_onError, notification_ReadAll_onSuccess);

    function notification_ReadAll_onError(e) {
        console.error(e);
    }

    function notification_ReadAll_onSuccess(res) {
        notification_clearGlobalNotifSystemCounter();
    }
}


function notification_readAllSuccess(_obj) {

}



//------------------------- FIN NOTIFICATIONS SYSTEMES ----------------------- //

//TODO: Actuellement, copie de la fonction de chat.js
//A faire un fichier utils contenant les fonctions communes
/**
 * converti une date UTC en date locale et ne renvoie que le time si même jour
 * @param {string} dateStr date sur forme de string au standard ISO8621 de la forme (YYYY-MM-DDTHH:MM:SSZ)
 * @param {boolean} onlyDate Indique si l'on veut uniquement la date (DD-MM-YYYY) au lieu de la date et de l'heure
 * @returns {string} date formattée
 */
function date_toString(dateStr, onlyDate) {
    var date = new Date(dateStr);
    //Note: la date est directement convertie en local time 
    var now = new Date(Date.now());

    return calculateDate(date, now);


    /**
     * calcul le formattage de la date
     * @param {Date} date date
     * @param {Date} now date courante
     * @returns {string} la date formattée
     */
    function calculateDate(date, now) {
        if (isToday(date, now))
            return date.toLocaleTimeString();

        if (onlyDate)
            return date.toLocaleDateString();
        else
            return date.toLocaleString();
    }

    /**
     * isToday ?
     * @param {Date} date some date
     * @param {Date} now now date
     * @returns {Boolean} true if same day
     */
    function isToday(date, now) {
        return (
            (date.getFullYear() === now.getFullYear())
            && (date.getMonth() === now.getMonth())
            && (date.getDate() === now.getDate())
        );
    }

}
/**
    * 
    * @param {string} _type Type de requête (GET, POST, ...)
    * @param {string} _url    URL
    * @param {string} _data   data à envoyer. JSON stringifié
    * @param {Function} _fnError    callback d'erreur
    * @param {Function} _fnSuccess  callback de succès
    */
function sendAjaxRequest(_type, _url, _data, _fnError, _fnSuccess) {
    $.ajax({
        type: _type,
        url: _url,
        data: _data,
        contentType: 'application/json',
        beforeSend: function (request) {
            request.setRequestHeader("RequestVerificationToken", $("[name='__RequestVerificationToken']").val());
        },
        error: _fnError,
        success: _fnSuccess
    });
}