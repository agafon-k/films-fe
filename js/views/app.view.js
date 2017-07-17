define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/main.html',
    '../collections/films.collection',
    './film.view',
    './films.collection.view',
    '../routers/router'
], function ($, _, Backbone, tmpl, filmCollection, FilmItemView, FilmCollectionView, Router) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#collection',

        template: _.template(tmpl),

        events: {
            'click .create-btn-router': 'createNewFilm',
            'click .film-item': 'openComment'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.router = new Router();
            this.$el.html(this.template());
            new FilmCollectionView();
            return this;
        },

        createNewFilm: function () {
            this.close();
            this.router.navigate('//create', true);
        },

        close: function(){
            this.remove();
            this.unbind();
        }
    });

    return AppView;
});