define([
        'underscore',
        'jquery',
        'backbone',
        'filmCollection',
        'appModel'
    ],
    function (_, $, Backbone) {
        'use strict';

        var FilmModel = Backbone.Model.extend({

            url: function () {
                return 'http://localhost:3000';
            },

            defaults: {
                title: 'Lololo',
                imdbId: 'Lalala',
                releaseCountry: '',
                releaseYear: '',
                rating: ''
            },

            getCustomUrl: function (method) {
                switch (method) {
                    case 'create':
                        return 'http://localhost:3000/film';
                        break;
                    case 'update':
                        return 'http://localhost:3000/save/film/' + this.id;
                        break;
                    case 'delete':
                        return 'http://localhost:3000/film/' + this.id;
                        break;
                }
            },

            sync: function (method, model, options) {
                options || (options = {wait: true});
                !(method === 'read') ? (options.url = this.getCustomUrl(method.toLowerCase())) : options.url;

                return Backbone.sync.apply(this, arguments);
            },

            validation: {
                filmTitle: {
                    required: true,
                    message: 'ssddde'
                }
            }
        });

        return FilmModel;
    });