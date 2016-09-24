var users = (function (localStorage) {
    'use strict';

    const USERNAME_STORAGE_KEY = 'username-key';

    return {
        login: userLogin,
        logout: userLogout,
        current: userGetCurrent
    };

    function userLogin(user) {
        localStorage.setItem(USERNAME_STORAGE_KEY, user);

        return Promise.resolve(user);
    }

    function userLogout() {
        localStorage.removeItem(USERNAME_STORAGE_KEY);

        return Promise.resolve();
    }

    function userGetCurrent() {
        return Promise.resolve(localStorage.getItem(USERNAME_STORAGE_KEY));
    }

})(window.localStorage);