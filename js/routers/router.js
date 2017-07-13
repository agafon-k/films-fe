define([
        'require',
        'jquery',
        'backbone',
        'addFilmView'
    ],
    function (require, $, Backbone, addFilm) {
        'use strict';

        var Router = Backbone.Router.extend({

            routes: {
                '': 'index',
                '/': 'index',
                'create': 'createNew',
                'edit': 'editFilm'
            },

            createNew: function () {
                new addFilm();
            }
        });

        return Router;
    });
