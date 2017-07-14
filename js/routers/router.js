define([
        'require',
        'jquery',
        'backbone',
        '../views/add.film.view'
    ],
    function (require, $, Backbone, addFilm) {
        'use strict';

        return Backbone.Router.extend({

            routes: {
                '/*': 'index',
                'create': 'createNew'
            },

            createNew: function () {
                new addFilm();
            }
        });

});
