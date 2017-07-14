define([
    'jquery',
    'jQueryUi',
    'underscore',
    'backbone',
    'text!templates/main.html',
    '../collections/films.collection',
    './film.view'
], function ($, jQueryUi, _, Backbone, tmpl, filmCollection, FilmItemView) {
    'use strict';

    return Backbone.View.extend({

        el: 'ul',

        initialize: function () {
            var self = this;
            this.collection = filmCollection;

            this.collection.fetch({
                success: function (response) {
                    self.renderItems(response);
                },
                error: function (err) {
                    console.log(err);
                }
            });

        },

        renderItems: function (response) {
            _.each(response.models, function (item) {
                this.renderItem(item);
            }, this);
        },

        renderItem: function (item) {
            var filmView = new FilmItemView({ model: item });
            this.$el.append(filmView.render().el);
        }
    });
});