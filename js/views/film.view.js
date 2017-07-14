define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/film.html',
    'doT',
    '../views/edit.film.view',
    '../routers/router'
], function (_, $, Backbone, filmTemplate, doT, editFilmView, Router) {
    'use strict';

    return Backbone.View.extend({

        tagName: 'li',

        className: 'film-item',

        template: doT.template(filmTemplate),

        events: {
            'click .edit-btn': 'editFilm',
            'click .delete-btn': 'deleteFilm',
            'click .close-btn': 'close',
            'click': 'showComment'
        },

        initialize: function () {
            this.router = new Router();
            this.listenTo(this.model, 'destroy', this.remove);
            this.$el.bind("dragstart", _.bind(this._dragStartEvent, this))
            this.$el.bind("dragover", _.bind(this._dragOverEvent, this))
            this.$el.bind("dragenter", _.bind(this._dragEnterEvent, this))
            this.$el.bind("dragleave", _.bind(this._dragLeaveEvent, this))
            this.$el.bind("drop", _.bind(this._dropEvent, this))
        },

        _dragStartEvent: function (e) {
           console.log('start drag');
        },

        _dragOverEvent: function () {
          console.log('drag over');
        },
        _dragEnterEvent: function () {
            console.log('drag enter');
        },
        _dragLeaveEvent: function () {
            console.log('drag leave');
        },
        _dropEvent: function () {
            console.log('drop');
        },

        render: function () {
            var data = this.model.toJSON();
            this.$el.id = 'film_' + data.id;
            this.$el.attr('draggable', "true");
            data.imageSrc = data.title.replace(/\s+/g, '-').replace(/'/g, '').toLowerCase();
            this.$el.addClass(data.id.toString());
            this.$el.html(this.template(data));
            return this;
        },

        deleteFilm: function () {
            this.model.destroy();
        },

        editFilm: function () {
            this.router.navigate('//edit/film/' + this.model.id);
            new editFilmView({model: this.model});
        },

        showComment: function (e) {
            if (this.model.get('comment')) {
                $(e.currentTarget).toggleClass('active');
            }
        }
    });
});
