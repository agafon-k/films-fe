define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/add.film.html',
        'doT',
        '../routers/router'
    ],
    function ($, _, Backbone, addFilmTmpl, doT, Router) {
        'use strict';

        var FilmView = Backbone.View.extend({

            el: '#main',

            template: doT.template(addFilmTmpl),

            events: {
                'click .add-btn': 'editFilm'
            },

            initialize: function () {
                this.render();
            },

            render: function () {
                this.renderContent();
                return this;
            },

            renderContent: function () {

                this.$el.html(this.template(this.model.toJSON()));

                return this;
            },

            editFilm: function () {
                var data = {
                    title: this.$el.find("[name='film-title']").val(),
                    imdbId: this.$el.find("[name='film-imdbId']").val(),
                    releaseCountry: this.$el.find("[name='film-releaseCountry']").val(),
                    releaseYear: this.$el.find("[name='film-releaseYear']").val(),
                    rating: this.$el.find("[name='film-rating']").val(),
                    comment: this.$el.find("[name='comment']").val()
                };

                this.model.save(data);

                Backbone.history.navigate('//', true);
            }
        });

        return FilmView;
    });