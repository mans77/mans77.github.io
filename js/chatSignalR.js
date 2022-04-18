"use strict";
// ------------------- GLOBAL VARIABLES ------------------------- //
var gChatSignalR; // chat signalR

var gMessageUserID;
var gUserID = $("#CurrentLoggedAppUserId").val();
var defaultPictureLocation = '/AppUsers/GetUserImageFile/'; //'/images/defaultProfilePicture.svg'; //A MODIFIER: l'url de l'emplacement des images

//DOM ready
$(function () {
    //on récupère le messageUserID
    var $div = $('#messageUserID');
    if ($div.length > 0) {
        gMessageUserID = +$div.attr("data-messageValue");
        $div.remove();
    }

    // --------------------- AJOUT EVENTS --------------------------- //

    //ajout du click event pour tous les conversations
    $('[id^=messagingConversation_]').click(messaging_RetrieveMessages);

    //ajout du click event pour tous les send boutons (tous les input ayant in ID commencant par "messaging_sendButton_")
    $("input[id^=messagingSendButton_]").click(messaging_SendMessage);

    $('[id^=go_back]').click(show_ListMessages);

    // -------------------- FIN AJOUT EVENTS ------------------------ //

    // conversion des dates en dates dans le timezone locale
    $('[data-date]').each(function (index, element) {
        var defaultDate = "0001-01-01T00:00:00Z";
        var date = $(this).attr('data-date');
        if (date === defaultDate)
            return;

        var localDate = new Date(date);
        $(this).text(date_toString(localDate, true));
    });


    //on démarre signalR
    chatSignalR_connect();
});

// ------------------------ SIGNAL R ---------------------------- //
var tryReconnectChatInterval = null;


function chatSignalR_start(connectionSignalR) {
    console.log("signalR chat connection");

    connectionSignalR.start()
        .then(chatSignalR_afterConnected)
        .catch(function (err) {
            console.log('error : chat disconnected ?');

            //on essaye de reconnecter toutes les 5 secondes
            tryReconnectChatInterval = setTimeout(function () { chatSignalR_reconnect(); }, 5000);

            return console.error(err.toString());
        });
}
function chatSignalR_afterConnected() {
    console.log("signalR chat connected");

    //on click sur la conversation X que l'on doit afficher (depuis l'url /Messages/Index/4?active=X)
    $('div[id^=messagingConversation_][data-setactive]').removeAttr('data-setactive').click();

    clearInterval(tryReconnectChatInterval);
}
function chatSignalR_connect() {
    gChatSignalR = new signalR.HubConnectionBuilder().withUrl("/chatHub?userID=" + gUserID).build();

    gChatSignalR.on("TestNotification", messaging_testNotification);
    gChatSignalR.on("ReceiveMyMessage", messaging_ReceiveMyMessage);
    gChatSignalR.on("ReceiveHisMessage", messaging_ReceiveHisMessage);
    gChatSignalR.on("ReadAllMyMessages", messaging_ReadAllMyMessages);

    //il faut configurer le connectionSignalR.connection.onclose() pour rattraper quand signalR a été déconnecté
    gChatSignalR.connection.onclose = function (error) {
        gChatSignalR.connectionClosed(error);
        console.log("signalR deconnecté    : " + error);

        tryReconnectChatInterval = setTimeout(function () { chatSignalR_reconnect(); }, 5000);
    };

    chatSignalR_start(gChatSignalR);
}
function chatSignalR_reconnect() {
    console.log("signalR chat reconnection");

    if (gChatSignalR !== null) {
        console.log("signalR chat stop");
        gChatSignalR.stop()
            .then(function () { chatSignalR_connect(); })
            .catch(function (e) { console.error('error trying to stop : ' + e); });
    }
    else
        chatSignalR_connect();
}


// ------------------------ FIN SIGNAL R ---------------------------- //


function showMessages(e) {
    var elem, evt = e ? e : event;
    if (evt.srcElement) elem = evt.srcElement;
    else if (evt.target) elem = evt.target;

    var parent = $(elem.parentElement);
    var idElts = '';
    if (parent.attr('id') !== undefined && parent.attr('id') !== '')
        idElts = parent.attr('id').split('_');
    else {
        var corrIdentity = $(elem.parentElement).siblings('.conv-item-profil');
        idElts = corrIdentity.attr('id').split('_');
    }
    if (idElts.length > 1) {
        var correspondantAppUserId = idElts[1];
        var container = $("#chatContent");
        container.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-messages'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.get("/Component/chatContent", { correspondantAppUserId: correspondantAppUserId }, function (data) {
            $('#loader-messages').remove();
            container.html(data);
            $("#messagesContainer").parent().scrollTop($("#messagesContainer").prop('scrollHeight'));
            $.ajax({
                type: "POST",
                url: "/Message/ReadAllHisMessages",
                dataType: 'json',
                data: {
                    messageUserId: correspondantAppUserId
                },
                success: function (response) {
                    $("#countUnreadMsgWith_" + correspondantAppUserId).val(0);
                    $("#msgUnreadMsgWith_" + correspondantAppUserId).html("");
                },
                error: function (response) {
                }
            });
        });

        var infosContainer = $("#chatInfos");
        infosContainer.html("<div style='margin-left:auto; width:64px; margin-right: auto;' id='loader-infos'><img src='/images/icons/loading.svg' style='width:64px;' alt='Chargement...'></div>");
        $.get("/Component/chatInfos", { correspondantAppUserId: correspondantAppUserId }, function (data) {
            $('#loader-infos').remove();
            infosContainer.html(data);
        });
    }
}

function messaging_SendMessage(receiverUserID) {
    var srcElementID;


    //textArea
    var inputTextElement = $("#input_message");
    if (inputTextElement === null)
        return;

    var message = inputTextElement.val();
    if (message.length === 0) //pas de message
        return;

    //on encode le message.
    //TODO: A faire ici ou coté serveur ?
    //message = encodeURIComponent(message);

    //réinitialisation du textarea
    inputTextElement.val('');


    //TODO: Ajouter le message dans la conversation avec une icone d'attente de confirmation, le temps que le serveur nous renvoie un signal ReceiveMyMessage

    $.ajax({
        type: "POST",
        url: "/Message/sendMessage",
        dataType: 'json',
        data: {
            correspondantMessageUserId: receiverUserID,
            messageContent: message //.replace(/\n/g, "<br />")
        },
        success: function (response) {
        },
        error: function (response) {
        }
    });
    $('.chat-content .chat-input-container .chat-input .input-message').css("height", "auto");
}

//function messaging_SendMessage(_event) {
//    var srcElementID;

//    var sendButton = $('[id^=messagingSendButton_]');
//    if (sendButton.length > 0)
//        srcElementID = sendButton.first().attr("id");
//    else
//        return;

//    var splitted = srcElementID.split('_');
//    if (splitted.length <= 1)
//        return;
//    var receiverUserID = splitted[1];
//    if (receiverUserID.length === 0)
//        return;

//    //on converti receiverUserID en int
//    receiverUserID = +receiverUserID;

//    //textArea
//    var inputTextElement = $("#input_message");
//    if (inputTextElement === null)
//        return;

//    var message = inputTextElement.val();
//    if (message.length === 0) //pas de message
//        return;

//    //on encode le message.
//    //TODO: A faire ici ou coté serveur ?
//    //message = encodeURIComponent(message);

//    //réinitialisation du textarea
//    inputTextElement.val('');


//    //TODO: Ajouter le message dans la conversation avec une icone d'attente de confirmation, le temps que le serveur nous renvoie un signal ReceiveMyMessage

//    //prepare ajax call
//    const url = '/Messages/Send';
//    const data = JSON.stringify({ MyID: gMessageUserID, HisID: +receiverUserID, Message: message });

//    sendAjaxRequest('POST', url, data, messaging_SendMessage_error, messaging_SendMessage_success);

//    _event.preventDefault();

//    function messaging_SendMessage_error(e) {
//        //debugger;
//    }

//    function messaging_SendMessage_success(_message) {
//    }
//}

function messaging_testNotification(content) {
    alert("Messaging: " + content);
}

function messaging_ReceiveMyMessage(_message) {

    var messageDiv = $('<div/>');
    messageDiv.html($("#msgSent_model").html());
    messageDiv.attr('id', 'msgSent_' + _message.idMsg);
    messageDiv.addClass("message sent");

    var contentDiv = messageDiv.find('.message-content-txt').first();
    contentDiv.html(_message.message);

    $("#messagesContainer").append(messageDiv);
    $("#msgSent_" + _message.idMsg + " #msgRead_model").attr('id', 'msgRead_' + _message.idMsg);

    $("#messagesContainer").parent().scrollTop($("#messagesContainer").prop('scrollHeight'))
}

function messaging_ReceiveHisMessage(_message) {
    console.log("signalR ReceiveHisMessage myID:" + _message.myID + " hisID:" + _message.hisID.toString());
    $("#lastMsgWith_" + _message.myID).html(_message.message);
    var nbUnread = parseInt($("#countUnreadMsgWith_" + _message.myID).val(), 10) + 1;
    $("#countUnreadMsgWith_" + _message.myID).val(nbUnread);
    if (nbUnread === 1)
        $("#msgUnreadMsgWith_" + _message.myID).html("1 message non lu");
    else
        $("#msgUnreadMsgWith_" + _message.myID).html(nbUnread + " messages non lus");

    if ($("#CorrespondantB2CIdMessageUser").val() == _message.myID) { //visu actuelle de la conversation concernée
        var messageDiv = $('<div/>');
        messageDiv.html($("#msgReceived_model").html());
        messageDiv.attr('id', 'msgReceived_' + _message.IdMsg);
        messageDiv.addClass("message received");
        var contentDiv = messageDiv.find('.message-content-txt').first();
        contentDiv.html(_message.message);

        $("#messagesContainer").append(messageDiv);
        $("#messagesContainer").parent().scrollTop($("#messagesContainer").prop('scrollHeight'))

        //on indique au serveur que tous les messages ont été lus - si conv active !!

        $.ajax({
            type: "POST",
            url: "/Message/ReadAllHisMessages",
            dataType: 'json',
            data: {
                messageUserId: _message.myID
            },
            success: function (response) {
                $("#lastMsgWith_" + _message.myID).html("");
                $("#msgUnreadMsgWith_" + _message.myID).html("");
                $("#countUnreadMsgWith_" + _message.myID).val(0);

                var chatNotificationContainer = $("#chatNotifications");
                $.get("/Component/ChatNotifications", { userID: $("#CurrentLoggedAppUserId").val(), messageUserId: $("#CurrentLoggedMessageUserId").val() }, function (data) {
                    chatNotificationContainer.html(data);
                });
            },
            error: function (response) {
            }
        });
    }
}

//le destinataire a lu tous mes messages.
function messaging_ReadAllMyMessages(lastMsgId) {
    //var seenContainer = document.querySelectorAll(
    //    '.chat-content .chat-messages-content .message.sent .message-seen');

    //for (var i = 0; i < seenContainer.length; i++) 
        //seenContainer[i].style.display = "none";

    if (lastMsgId > 0)
        $("#msgRead_" + lastMsgId).css("display", "flex");
    //if (lastMsg === null)
    //    return;

    //var hisID = lastMsg.receiverID;

    //var hisConversation = $('#messagingConversation_' + hisID);
    //if (!messaging_preview_isActive(hisConversation))
    //    return;

    ////on met à jour la pastille en bas
    //var conversationContent = $('#messagingConversation');
    //messaging_conversation_addLastReadMsg(conversationContent, lastMsg);
}

function messaging_preview_addMessage(div, userID, message, updateBadge) {
    //on regarde si la conversation est active => on incremente le nombre de messages non lus
    if (updateBadge) {
        var badge = $('#messagingConversationPreviewBadge_' + userID);
        if (badge !== null && !messaging_preview_isActive(div)) {
            badge.text(+badge.text() + 1);
            badge.removeClass('invisible');
        }
    }

    //on met à jour le contenu du dernier message dans la preview
    var previewMsg = $('#messagingConversationPreview_' + userID);
    if (previewMsg !== null) {
        previewMsg.html(message.content);
    }

    //on masque la croix de suppression de la conversation
    var previewDelete = $('#messagingConversationDelete_' + userID);
    if (previewDelete.length > 0) {
        previewDelete.remove();
    }

    //on met à jour la date du dernier message dans la preview
    var previewDate = $('#messagingConversationPreviewDate_' + userID);
    if (previewDate !== null) {
        previewDate.text(date_toString(message.sendTime, false));
        previewDate.removeClass('hidden');
    }
}

/**
    * déplace la preview en première position des conversations ayant des messages
    * @param {JQuery<HTMLElement>} div preview à place en premier
    */
function messaging_preview_setFirst(div) {
    //var $children = div.parent().children('id^=messagingConversationPreviewDate');
    div.parent().children('[id^=messagingConversationPreviewDate]').first().before(div);
}

/**
    * détermine si la div est sélectionnée
    * @param {JQuery<HTMLElement>} div preview à place en premier
    * @returns {boolean} conversation active ?
    */
function messaging_preview_isActive(div) {
    return div.hasClass('active');
}

function messaging_preview_create(message) {
    var $modelDiv = $('#model_messagingConversation_model');
    if ($modelDiv.length > 0) {

        //on crée la nouvelle preview et on copie l'innerHTML
        var $newPreviewDiv = $('<div/>');
        $newPreviewDiv.attr('id', 'messagingConversation_' + message.senderID);
        $newPreviewDiv.attr('class', $modelDiv.attr('class'));
        $newPreviewDiv.removeClass('hidden');
        $newPreviewDiv.html($modelDiv.html());

        //on modifie les id de tous les children commencant par "model_"
        $newPreviewDiv.find('[id^=model_]').each(function (index, element) {
            var splitted = element.id.split('_');
            if (splitted.length > 2) { //les ID du modèle sont tous du style model_xxx_model. il faut recuperer le xxx et ajouter le senderID
                element.id = splitted[1] + '_' + message.senderID;
            }
        });

        //on ajoute l'image de l'utilisateur
        var $userImgArr = $newPreviewDiv.find('img');
        if ($userImgArr.length > 0) {
            var $userImg = $userImgArr.first();
            $userImg.attr('src', calculateSrcImgUser(message.sender.appUserNavigation.id));
        }

        //on ajoute le nom de l'utilisateur dans la preview
        var firstName = (message.sender !== null && message.sender.appUserNavigation !== null && message.sender.appUserNavigation.firstName !== null) ? message.sender.appUserNavigation.firstName : '';
        var lastName = (message.sender !== null && message.sender.appUserNavigation !== null && message.sender.appUserNavigation.lastName !== null) ? message.sender.appUserNavigation.lastName : '';

        var $messagingConversationReceiverDiv = $newPreviewDiv.find('#messagingConversationReceiver_' + message.senderID);
        if ($messagingConversationReceiverDiv.length > 0) {
            $messagingConversationReceiverDiv.text(firstName, lastName);
        }


        //on masque la croix de supprimer
        var $messagingConversationDeleteDiv = $newPreviewDiv.find('#messagingConversationDelete_' + message.senderID);
        if ($messagingConversationDeleteDiv.length > 0) {
            $messagingConversationDeleteDiv.remove();
        }

        $newPreviewDiv.click(messaging_RetrieveMessages);

        $modelDiv.parent().children().first().after($newPreviewDiv);
        messaging_preview_setFirst($newPreviewDiv);
    }


    //TODO: Fonction temporaire permettant de créer l'url de l'image du profil 
    function calculateSrcImgUser(_userID) {
        return defaultPictureLocation + _userID;

        //var splitted = defaultPictureLocation.split('_');
        //return splitted[0] + _userID + splitted[1];
    }
}


function messaging_preview_activate(target) {
    Array.prototype.slice.call(target.parentNode.children)
        .forEach(function (child) {
            child.classList.remove("active-conv");
        });

    target.classList.add("active-conv");
}

/**
    * supprime la conversation si celle-ci est vide
    * @param {Event} e span du remove sur lequel l'utilisateur a cliqué
    */
function messaging_DeleteConversation(e) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    if (target === null)
        return;


    const targetID = target.id;
    if (targetID.split('_').length < 2)
        return;

    const receiverUserID = targetID.split('_')[1];

    const url = '/Messages/Delete';
    const data = JSON.stringify({ MyID: gMessageUserID, HisID: +receiverUserID });

    sendAjaxRequest('POST', url, data, messaging_DeleteConversation_error, messaging_DeleteConversation_success);
}

/**
    * supprime la conversation si celle-ci est vide
    * @param {Object} conversation span du remove sur lequel l'utilisateur a cliqué
    */
function messaging_DeleteConversation_success(conversation) {

    if (conversation === null)
        return;

    var hisID = conversation.hisID;
    if (hisID === -1)
        return;

    var $hisConversation = $('#messagingConversation_' + hisID);

    var isHisConversationActive = messaging_preview_isActive($hisConversation);


    if (isHisConversationActive) {
        //on récupère la partie droite et la masque
        var conversationDiv = $('#messagingConversation');
        conversationDiv.addClass('invisible');
        //conversationDiv.css('display', 'none');
    }

    $hisConversation.remove();

}

function messaging_DeleteConversation_error(e) {
    console.error(e);
}

function messaging_RetrieveMessages(e) {

    //var userID = getUserID(); on recupere le userID connecté

    const target = e.currentTarget;
    if (target === null)
        return;

    //on met en evidence la conversation selectionnée
    messaging_preview_activate(target);

    const targetID = target.id;
    if (targetID.split('_').length < 2)
        return;

    const receiverUserID = targetID.split('_')[1];

    //on prépare la fenêtre de droite avant affectant le nom du destinataire
    var conversationDiv = $('#messagingConversation');
    //on construit l'en-tête
    var conversationHeader = messaging_buildFullNameInHeaderConversation(conversationDiv);
    //on insère le nom de la personne
    var receiverName = $('#messagingConversationReceiver_' + receiverUserID);
    messaging_addFullNameInHeaderConversation(conversationHeader, receiverName.text());


    //on ajoute l'ID à l'ID du bouton d'envoi
    var sendButton = $('[id^=messagingSendButton_]');
    if (sendButton.length > 0) {
        const splitted = sendButton.first().attr('id').split('_');
        var sId = splitted[0] + '_' + receiverUserID;
        sendButton.first().attr('id', sId); // '${splitted[0]}_${receiverUserID}');
    }
    var textArea = $('#input_message');
    if (textArea !== null)
        textArea.val('');

    const url = '/Messages/Retrieve';
    const data = JSON.stringify({ MyID: gMessageUserID, HisID: +receiverUserID, Offset: 0 });

    sendAjaxRequest('POST', url, data, messaging_RetrieveMessages_error, messaging_RetrieveMessages_success);
}

function messaging_RetrieveMessages_success(_conversationResult) {

    const senderID = _conversationResult.senderID;
    const receiverID = _conversationResult.receiverID;
    const messagesList = _conversationResult.messagesList;

    //doit on vérifier que l'user en cours en bien le senderID ?

    if (senderID !== gMessageUserID)
        return;


    //on reinitialise le nombre de messages non lus
    var nbUnreadMsgBadge = $("#messagingConversationPreviewBadge_" + receiverID);
    if (nbUnreadMsgBadge !== null) {
        nbUnreadMsgBadge.html("0");
        nbUnreadMsgBadge.addClass('invisible');
    }

    //on récupère la partie droite
    var conversationDiv = $('#messagingConversation');
    if (conversationDiv === null) return; //TODO: on retourne pour le moment. Mais il faudra le construire à terme ?

    conversationDiv.removeClass('invisible');
    //conversationDiv.css('display', 'flex');

    //on nettoie la partie droite
    messaging_clearMessagesInConversation();


    //on construit le contenu de la conversation
    var conversationContent = messaging_buildContentListInConversation(conversationDiv);
    //on construit le pied de page avec l'input et le bouton envoyer
    //var conversationFooter = messaging_buildFooterInConversation(conversationDiv);


    messaging_ReadAll_success(); //GM    

}
function messaging_RetrieveMessages_error(e) {
    debugger;
}

function messaging_ReadAll_success(_lastMsg) {
    $("footer").css({ display: 'none' });
    $("#messages_list").css({ display: 'none' });
    $("#conversation_content").css({ display: 'flex' });
    //scroll jusqu'en bas de la liste des messages.
    var conversationContent = $('#chat_container');
    if (conversationContent !== null)
        conversationContent.scrollTop(conversationContent.prop('scrollHeight'));
}

function show_ListMessages() {
    $("footer").css({ display: 'block' });
    $("#conversation_content").css({ display: 'none' });
    $("#messages_list").css({ display: 'block' });
}

// -------------------------- Conversation ------------------------- //

//reinitialisation de la conversation
function messaging_clearMessagesInConversation() {
    $('#messagingConversationContent').children().not("[id^=messagingConversationModel]").remove();
    $('#chat_content').children().not("[id^=messagingConversationModel]").remove();
}


/**
    * recupère l'en-tete de la conversation (le construit si nécessaire)
    * @param {JQuery<HTMLElement>} parentNode recherche de l'en-tete de la conversation
    * @returns {JQuery<HTMLElement>} element contenant l'en-tete
    */
function messaging_buildFullNameInHeaderConversation(parentNode) {

    var child = parentNode.children(".messagingConversationHeader");
    if (child !== null)
        return child;

    return parentNode.add('div.messagingConversationHeader');
}


/**
    * ajout du nom de la personne dans la conversation
    * @param {JQuery<HTMLElement>} parentNode recherche de l'en-tete de la conversation
    * @param {string} fullName nom à afficher
    */
function messaging_addFullNameInHeaderConversation(parentNode, fullName) {
    parentNode.html(fullName);
}

//construction du coeur de la conversation
/**
    * recupère le contenu de la conversation (le construit si nécessaire)
    * @param {JQuery<HTMLElement>} parentNode recherche de l'en-tete de la conversation
    * @returns {JQuery<HTMLElement>} element contenant l'en-tete
    */
function messaging_buildContentListInConversation(parentNode) {

    var child = parentNode.children(".messagingConversationContent");
    if (child !== null)
        return child;

    return parentNode.append('<div/>').addClass('messagingConversationContent');
}



/**
    * ajout d'un message dans la conversation
    * @param {JQuery<HTMLElement>} messageModelDiv recherche de l'en-tete de la conversation
    * @param {Object} message message à insérer
    */
function messaging_conversation_appendMessage(messageModelDiv, message) {

    //on crée le message div et on copie l'innerHTML
    var messageDiv = $('<div/>');
    messageDiv.attr('id', 'messagingConversationMessage_' + message.idMessage);
    messageDiv.attr('class', messageModelDiv.attr('class'));
    messageDiv.html(messageModelDiv.html());

    //image utilisateur
    var imgSender = messageDiv.find('#imgSender_').first();
    imgSender.attr('id', 'imgSender_' + message.idMessage);
    imgSender.attr('src', '/AppUsers/GetMessageUserImageFile/' + message.senderID);

    //link image - user
    var hrefSender = messageDiv.find('#hrefSender_').first();
    hrefSender.attr('id', 'hrefSender_' + message.idMessage);
    hrefSender.attr('href', '/cours/compte/profil/correspondant/' + message.senderID);

    //on supprime la pastille modèle du bloc copié
    messageDiv.find('#messagingConversationModelImgRead').remove();

    //on recupere la div du contenu du message, on renseigne le bon id et on insère le contenu
    var contentDiv = messageDiv.find('#messagingConversationMessageContent_').first();
    contentDiv.attr('id', 'messagingConversationMessageContent_' + message.idMessage);
    contentDiv.html(message.content);

    //on recupere la div de la date du message et on renseigne le bon id et on insère la date
    var dateDiv = messageDiv.find('#messagingConversationMessageDate_').first();
    dateDiv.attr('id', 'messagingConversationMessageDate_' + message.idMessage);
    dateDiv.text(date_toString(message.sendTime, false));

    //on recupère le bloc contenant le message et la date
    var blockDiv = messageDiv.children(".messagingConversationMessage").first();

    blockDiv.append(contentDiv);
    blockDiv.append(dateDiv);

    //on regarde si la pastille se trouve au niveau du message précédent. Si oui, on déplace la pastille
    //if (messageModelDiv.parent().children().last().find('.messagingConversationHisMessageLastRead').length > 0) {
    //    var conversationContent = $('#messagingConversationContent');
    //    messaging_conversation_addLastReadMsg(conversationContent);
    //}

    messageModelDiv.parent().append(messageDiv);
}

/**
    * ajout de l'image du destinataire à coté du dernier message lu
    * @param {JQuery<HTMLElement>} _conversationContent Conversation
    * @param {Object?} _message objet message du dernier message lu (undefined si tout est lu, null si aucun n'est lu)
    */
function messaging_conversation_addLastReadMsg(_conversationContent, _message) {

    //aucun message n'est encore lu
    if (_message === null)
        return;

    //on récupère la div
    //soit celui deja visible
    var readImg = $('#messagingConversationImgRead');
    if (readImg.length === 0) {
        //soit on copie le model
        var readImgModel = $('#messagingConversationModelImgRead');
        readImg = $('<img/>');
        readImg.attr('id', 'messagingConversationImgRead');
        readImg.attr('class', readImgModel.attr('class'));
        readImg.attr('style', readImgModel.attr('style'));
        readImg.html(readImgModel.html());

        //on recupère la source contenue dans la preview
        if (typeof _message !== 'undefined') {
            var receiverID = _message.receiverID === gMessageUserID ? _message.senderID : _message.receiverID;
            var previewImgModel = $('#messagingConversation_' + receiverID).find('.image-user').first();
            readImg.attr('src', previewImgModel.attr('src'));
        }
    }
    if (readImg.length > 0) {

        //on enleve de l'ancien message, le style reduisant son margin-right
        _conversationContent.find('.messagingConversationMyMessageLastRead').removeClass('messagingConversationMyMessageLastRead');

        //on recupere le message sur lequel il faut ajouter la pastille
        let msgToAddImg = null;
        if (typeof _message === 'undefined')
            msgToAddImg = _conversationContent.children(':not([id^=messagingConversationModel])').last();
        else
            msgToAddImg = _conversationContent.find('#messagingConversationMessage_' + _message.idMessage).first();

        //on reduit le margin-right à 5px
        msgToAddImg.find('.messagingConversationMyMessage').first().addClass("messagingConversationMyMessageLastRead");

        //on ajoute l'image dans la conversation (toujours en première position car flex-row ou flex-row-reverse suivant si c'est mon message ou non)
        msgToAddImg.children().first().before(readImg);

    }

}



// ------------------------- UTILS --------------------------- //
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
