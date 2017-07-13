define([
    'jquery',
    'jQueryUi',
    'underscore',
    'backbone',
    'text!templates/main.html',
    'appModel',
    'filmCollection',
    'filmView'
], function ($, jQueryUi, _, Backbone, tmpl, AppModel, filmCollection, FilmItemView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#main',

        template: _.template(tmpl),

        events: {
            'click .create-btn-router': 'createNewFilm',
            'click .film-item': 'openComment'
        },

        model: AppModel,

        initialize: function () {
            this.collection = filmCollection;
            this.order = [];
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.renderFilms();

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
                        $('body').addClass('disabled');
                        self.collection.updateCollection(currentId, newPosition, oldPosition)
                            .success(function (data, textStatus, xhr) {
                                $('body').removeClass('disabled');
                            })
                            .error(function (xhr, textStatus, errorThrown) {
                                console.log('Error sortable update');
                            });
                    }
                }
            });
        },

        renderFilms: function () {
            var self = this;
            this.collection.fetch({
                success: function (response) {
                    self.renderItems(response);
                    self.addSortable();
                },
                error: function () {
                    console.log('fetch error')
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
            this.$el.find('ul').append(filmView.render().el);
            this.order.push(filmView);
        },

        createNewFilm: function () {
            Backbone.history.navigate('//create');
        },

        openComment: function (e) {
            $(e.currentTarget).toggleClass('active');
        }
    });

    return AppView;
});