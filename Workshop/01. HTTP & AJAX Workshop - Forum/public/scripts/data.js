var data = (function ($, users, threads) {
    // start gallery
    function galleryGet() {
        const REDDIT_URL = 'https://www.reddit.com/r/aww.json?jsonp=?';

        return new Promise((resolve, reject) => {
            $.ajax({
                url: REDDIT_URL,
                dataType: 'jsonp'
            })
             .done(resolve)
             .fail(reject);
        });
    }

    // end gallery

    return {
        users: users,
        threads: threads,

        gallery: {
            get: galleryGet
        }
    };

})(jQuery, users, threads);