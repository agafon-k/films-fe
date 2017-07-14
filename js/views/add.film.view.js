define(['jquery', 'underscore', 'backbone', 'text!templates/add.film.html', '../models/film.model',
        '../collections/films.collection', './app.view', 'doT', '../routers/router'],
    function ($, _, Backbone, addFilmTmpl, FilmModel, filmCollection, AppView, doT, Router) {
        'use strict';

        return Backbone.View.extend({

            el: '#main',

            template: doT.template(addFilmTmpl),

            model: new FilmModel,

            events: {
                'click .add-btn': 'addNewFilm'
            },

            initialize: function () {
                this.render();
            },

            render: function () {
                this.$el.html(this.template);
                this.router = new Router();
                return this;
            },

            addNewFilm: function () {
                var data = {
                    title: this.$el.find("[name='film-title']").val(),
                    imdbId: this.$el.find("[name='film-imdbId']").val(),
                    releaseCountry: this.$el.find("[name='film-releaseCountry']").val(),
                    releaseYear: this.$el.find("[name='film-releaseYear']").val(),
                    rating: this.$el.find("[name='film-rating']").val(),
                    comment: this.$el.find("[name='comment']").val()
                };

                this.model.save(
                    data
                ).done(function () {
                    console.log('Success!')
                }).fail(function (model, xhr, options) {
                    console.log('text status ' + xhr + ', err ' + options)
                });


                this.router.navigate('//');
            }
        });
    });