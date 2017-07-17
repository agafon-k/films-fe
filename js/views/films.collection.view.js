define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/main.html',
    '../collections/films.collection',
    './film.view'
], function ($, _, Backbone, tmpl, filmCollection, FilmItemView) {
    'use strict';
    return Backbone.View.extend({

        el: 'ul',

        events: {
            'dragstart': '_dragStartEvent',
            'dragover': '_dragOverEvent',
            'dragenter': '_dragEnterEvent',
            'dragleave': '_dragLeaveEvent',
            'dragend': '_dragEndEvent',
            'drop': '_dropEvent'
        },

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
        },

        _dragStartEvent: function (e) {
            e.target.classList.add('draggable');
            this.draggableElement = e.target;
            this.startPosition = $('li').index(e.target);
            e.originalEvent.dataTransfer.effectAllowed = 'move';
            e.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
        },

        _dragOverEvent: function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.originalEvent.dataTransfer.dropEffect = 'move';

            return false;
        },

        _dragEnterEvent: function (e) {
            if (e.target.classList.contains('film-item')) {
                e.target.classList.add('over');
            }
        },

        _dragLeaveEvent: function (e) {
            if (e.target.classList.contains('over')) {
                e.target.classList.remove('over');
            }
        },

        _dragEndEvent: function (e) {
            e.target.classList.remove('draggable');
            var films = document.querySelectorAll('.film-item');
            _.each(films, function (item) {
                item.classList.remove('over');
            });
        },

        _dropEvent: function (e) {
            if (this.draggableElement !== e.target) {
                ($(this.draggableElement)[0].offsetTop > $(e.target)[0].offsetTop) ?
                    $(this.draggableElement).insertBefore(e.target.closest('li')) :
                    $(this.draggableElement).insertAfter(e.target.closest('li'));

                this.endPosition = $('li').index(this.draggableElement);

                if (!(this.startPosition === this.endPosition)) {
                    $('.loader').addClass('active');
                    this.collection.updateCollection(this.draggableElement.id.replace(/^[film]+\_/, ""), this.endPosition, this.startPosition)
                        .success(function (data, textStatus, xhr) {
                            $('.loader').removeClass('active');
                        })
                        .error(function (xhr, textStatus, errorThrown) {
                            console.log('Error sortable update');
                        });
                }
                return false;
            }
        }
    });
});