var threads = (function ($, getCurrentUser) {
    'use strict';
    const API_URL = 'api/threads';

    return {
        get: getThread,
        add: tryAddThread,
        getById: getById,
        addMessage: tryThreadAddMessage
    };

    function getThread(id) {
        if (id) {
            return getById(id);
        }
        else {
            return getAll();
        }
    }

    function getAll() {
        return new Promise((resolve, reject) => {
            $.getJSON(API_URL)
             .done(resolve)
             .fail(reject);
        });
    }

    function getById(id) {
        return new Promise((resolve, reject) => {
            $.getJSON(`${API_URL}/${id}`)
             .done(resolve)
             .fail(reject);
        });
    }

    function tryAddThread(title) {
        return assertLoggedIn()
            .then((username) => addThread({title, username}));
    }

    function addThread(thread) {
        return new Promise((resolve, reject) => {
            $.ajax(API_URL, {
                method: 'POST',
                data: JSON.stringify(thread),
                contentType: 'application/json'
            })
             .done(resolve)
             .fail(reject);
        });
    }

    function tryThreadAddMessage(threadId, content) {
        return assertLoggedIn()
            .then((username) => threadAddMessage(threadId, {
                username, content
            }));
    }

    function threadAddMessage(threadId, message) {
        return new Promise((resolve, reject) => {
            $.ajax(`${API_URL}/${threadId}/messages`, {
                method: 'POST',
                data: JSON.stringify(message),
                contentType: 'application/json'
            })
             .done(resolve)
             .fail(reject);
        });
    }

    function assertLoggedIn() {
        return getCurrentUser()
            .then((username) => {
                if (username) {
                    return username;
                }
                else {
                    var error = {
                        responseText: JSON.stringify({
                            err:'Not authenticated, please log in'
                        })
                    };

                    return Promise.reject(error);
                }
            });
    }

})(jQuery, users.current);