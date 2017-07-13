define([
        'underscore',
        'jquery',
        'backbone',
        'filmModel'
    ],
    function (_, $, Backbone, FilmModel) {
        'use strict';

        var FilmCollection = Backbone.Collection.extend({
            model: FilmModel,

            url: 'http://localhost:3000',

            updateCollection: function(id, newPosition, oldPosition) {
                var dataToSend = {
                    id: id,
                    newPosition: newPosition,
                    oldPosition: oldPosition
                };

                return $.ajax({
                    url: this.url,
                    type: 'PUT',
                    contentType: "application/json",
                    dataType: 'json',
                    data: JSON.stringify(dataToSend)
                });
            }
        });

        return new FilmCollection();
    });
