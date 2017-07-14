define([
        'underscore',
        'jquery',
        'backbone',
        '../collections/films.collection'
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
                        return 'http://localhost:3000/save';
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
                options || (options = {});
                !(method === 'read') ? (options.url = this.getCustomUrl(method.toLowerCase())) : options.url;

                return Backbone.sync.apply(this, arguments);
            },

            destroy: function () {
                this.collection.remove(this);
                Backbone.Model.prototype.destroy.apply(this, arguments);
            }
        });

        return FilmModel;
    });