﻿window.app = window.app || {};

window.app.viewModel = function() {

    var self = this;

    self.magazines = ko.observableArray([]);
    self.magazine = ko.observable(new _buildMagazine());
    self.addMode = ko.observable(false);


    self.init = function () {

        window.app.service.magazinesByYear(2006).done(function(magazines) {
           self.magazines(magazines);
        });

        ko.applyBindings(self);
    };

    self.getMagazinesByYear = function (year) {

        window.app.service.magazinesByYear(year).done(function (magazines) {
            self.magazines(magazines);
        });

    };

    self.addNewMagazine = function() {
        self.addMode(true);
    };

    self.cancel = function() {
        self.addMode(false);
        self.magazine(new _buildMagazine());
    };

    self.backToList = function() {
        self.addMode(false);
    };

    self.addMagazine = function() {
        app.service.addMagazine(self.magazine()).done(function() {
            self.magazines.push(self.magazine());
            self.addMode(false);
            self.magazine(new _buildMagazine());
        });
    };

    function _buildMagazine(title, year, link) {
        this.Title = ko.observable(title ? title: "");
        this.Year = ko.observable(year ? year: "");
        this.Link = ko.observable(link ? link : "");
    };

};