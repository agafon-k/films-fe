define([
        'require',
        'jquery',
        'backbone',
        '../views/add.film.view',
        '../views/app.view'
    ],
    function (require, $, Backbone, addFilm, appView) {
        'use strict';

        var router = Backbone.Router.extend({

            routes: {
                '/*': 'index',
                'create': 'createNew'
            },

            index: function () {
                console.log('start');
            },


            createNew: function () {
                new addFilm();
            }
        });
        Backbone.history.start();
        return router;
    });
