define([
        'require',
        'jquery',
        'backbone',
        'addFilmView',
    'appView',
    'editFilmView'
    ],
    function (require, $, Backbone, addFilm, appView, editView) {
        'use strict';

        var Router = Backbone.Router.extend({

            routes: {
                '': 'index',
                '/': 'index',
                'create': 'createNew',
                'edit': 'edit'
            },

            createNew: function () {
                this._cleanUp();
                this.view = new addFilm();
                return this.view;
            },

            index: function () {
              this._cleanUp();
              this.view = new appView();
              return this.view;
            },

            edit: function () {
              this._cleanUp();
              this.view = new editVIew();
              return this.view;
            },

            _cleanUp: function() {
                if(this.view) {
                    this.view.remove();
                }
                this.view = null;
            }
        });

        return Router;
    });
