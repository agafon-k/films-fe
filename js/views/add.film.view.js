define(['jquery', 'underscore', 'backbone', 'text!templates/add.film.html', '../models/film.model',
        '../collections/films.collection', './app.view', '../routers/router', 'doT'],
    function ($, _, Backbone, addFilmTmpl, FilmModel, filmCollection, AppView, Router, doT) {
        'use strict';

        return Backbone.View.extend({

            el: '#film',

            template: doT.template(addFilmTmpl),

            model: new FilmModel,

            events: {
                'click .add-btn': 'addNewFilm'
            },

            initialize: function () {
                this.render();
                // Backbone.history.loadUrl();
            },

            render: function () {
                this.$el.html(this.template);
                // this.router = new Router();
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
                    console.log(xhr)
                });


                Backbone.history.navigate('//', {trigger:true});
            }
        });
    });