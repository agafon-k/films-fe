define([
    'jquery',
    'jQueryUi',
    'underscore',
    'backbone',
    'text!templates/main.html',
    '../collections/films.collection',
    './film.view',
    './films.collection.view',
    '../routers/router'
], function ($, jQueryUi, _, Backbone, tmpl, filmCollection, FilmItemView, FilmCollectionView, Router) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#main',

        template: _.template(tmpl),

        events: {
            'click .create-btn-router': 'createNewFilm',
            'click .film-item': 'openComment'
        },

        initialize: function () {
            this.order = [];
            this.render();
        },

        render: function () {
            this.router = new Router();
            this.$el.html(this.template());
            new FilmCollectionView();
            return this;
        },


        addSortable: function () {
            var filmsWrapper = $('.film-list');
            var self = this;

            var oldPosition;
            var newPosition;
            var orderArray = self.order;

            filmsWrapper.sortable({
                cursor: "move",
                revert: true
            });

            filmsWrapper.sortable({
                'start': function (event, ui) {
                    oldPosition = orderArray.map(function (film) {
                        return film.$el[0].id;
                    }).indexOf(ui.item[0].id);
                },

                'update': function (event, ui) {
                    var currentId = ui.item[0].id.replace(/^[film]+\_/, "");
                    newPosition = (self.order.map(function (film) {
                        return film.$el[0].id;
                    }).indexOf(ui.item[0].nextSibling.id) - 1);

                    if (newPosition === -1) {
                        newPosition = 0;
                    }

                    if (!(oldPosition === newPosition)) {
                        $('.loader').addClass('active');
                        self.collection.updateCollection(currentId, newPosition, oldPosition)
                            .success(function (data, textStatus, xhr) {
                                $('.loader').removeClass('active');
                            })
                            .error(function (xhr, textStatus, errorThrown) {
                                console.log('Error sortable update');
                            });
                    }
                }
            });
        },


        createNewFilm: function () {
            this.router.navigate('//create');
        }
    });

    return AppView;
});