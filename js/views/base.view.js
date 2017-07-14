define([
    'jquery',
    'jQueryUi',
    'underscore',
    'backbone',
    'text!templates/main.html',
    'doT'
], function ($, jQueryUi, _, Backbone, tmpl, doT) {
    'use strict';

    module.exports = Backbone.View.extend({

        el: '#main',

        template: function(tmpl) {
            return doT.template(tmpl)
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return AppView;
});