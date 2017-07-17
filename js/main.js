'use strict';
require.config({

    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },

    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
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
    new AppView();
});