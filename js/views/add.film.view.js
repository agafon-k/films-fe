define(['jquery', 'underscore', 'router', 'backbone', 'text!templates/add.film.html', 'filmModel',
        'filmCollection', 'appView', 'doT'],
    function ($, _, Router, Backbone, addFilmTmpl, FilmModel, filmCollection, AppView, doT) {
        'use strict';

        return Backbone.View.extend({

            el: '#add-film',

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
                    data, {
                        wait: true,
                        success: function () {
                            console.log('Success!');
                        },
                        error: function (model, xhr, options) {
                            console.log(model);
                        }
                    });


                Backbone.history.navigate('//');
            }
        });
    });