define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/film.html',
    'doT',
    'editFilmView'
], function (_, $, Backbone, filmTemplate, doT, editFilmView) {
    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        className: 'film-item',

        template: doT.template(filmTemplate),

        events: {
            'click .edit-btn': 'editFilm',
            'click .delete-btn': 'deleteFilm',
            'click .close-btn': 'close',
            'click .film-item': 'openComment'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
            var data = this.model.toJSON();
            this.el.id = 'film_' + data.id;
            data.imageSrc = data.title.replace(/\s+/g, '-').replace(/'/g, '').toLowerCase();
            this.$el.addClass(data.id.toString());
            this.$el.html(this.template(data));
            return this;
        },

        deleteFilm: function () {
            this.model.destroy();
        },

        editFilm: function () {
            Backbone.history.navigate('//edit/film/' + this.model.id);
            new editFilmView({model: this.model});
        },

        openComment: function (e) {
            console.log(e);
            this.el();
        }
    });
});
