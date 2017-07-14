'use strict';
require.config({

    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [
                'underscore',
                'jquery',
                'jQueryUi'
            ],
            exports: 'Backbone'
        },

        jQueryUi: {
            deps: ['jquery'],
            exports: 'jQueryUi'
        }
    },

    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        jQueryUi: 'lib/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom',
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        text: '../node_modules/requirejs-text/text',
        doT: '../node_modules/dot/doT'
    }
});

require([
    'backbone',
    './views/app.view',
    './routers/router'
], function (Backbone, AppView, Router) {
    new Router();
    Backbone.history.start();
    new AppView();
});