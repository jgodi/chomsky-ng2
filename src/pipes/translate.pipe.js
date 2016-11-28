"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var translate_service_1 = require('../services/translate.service');
var TranslatePipe = (function () {
    function TranslatePipe(changeDetector) {
        this.changeDetector = changeDetector;
        this.lastKey = '';
        this.lastParams = '';
        this.onLangChange = null;
        this.changeDetector = changeDetector;
    }
    /**
     * @name equals
     * @param objectOne
     * @param objectTwo
     * @returns {boolean}
     * @description A utility function for checking equality.
     */
    TranslatePipe.prototype.equals = function (objectOne, objectTwo) {
        if (objectOne === objectTwo) {
            return true;
        }
        if (objectOne === null || objectTwo === null) {
            return false;
        }
        var typeOne = typeof objectOne;
        var typeTwo = typeof objectTwo;
        var length;
        var key;
        var keySet;
        if (typeOne === typeTwo && typeOne === 'object') {
            if (Array.isArray(objectOne)) {
                // Array checker
                if (!Array.isArray(objectTwo)) {
                    return false;
                }
                if ((length = objectOne.length) === objectTwo.length) {
                    for (key = 0; key < length; key++) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            else {
                // Object checker
                if (Array.isArray(objectTwo)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in objectOne) {
                    if (!this.equals(objectOne[key], objectTwo[key])) {
                        return false;
                    }
                    keySet[key] = true;
                }
                for (key in objectTwo) {
                    if (!(key in keySet) && typeof objectTwo[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };
    /**
     * @name ngOnDestroy
     * @description Garbage collection for angular
     */
    TranslatePipe.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    /**
     * @name updateValue
     * @param phraseKey
     * @param dynamicVariables
     */
    TranslatePipe.prototype.updateValue = function (phraseKey, dynamicVariables) {
        this.value = translate_service_1.TranslateService.translate(phraseKey, dynamicVariables);
        this.changeDetector.markForCheck();
    };
    /**
     * @name transform
     * @param phraseKey
     * @param dynamicVariables
     * @returns {*}
     */
    TranslatePipe.prototype.transform = function (phraseKey, dynamicVariables) {
        var _this = this;
        if (!phraseKey || phraseKey.length === 0) {
            return null;
        }
        if (this.equals(phraseKey, this.lastKey) && this.equals(dynamicVariables, this.lastParams)) {
            return this.value;
        }
        this.lastKey = phraseKey;
        this.lastParams = dynamicVariables;
        this.updateValue(phraseKey, dynamicVariables);
        this.unsubscribe();
        this.onLangChange = translate_service_1.TranslateService.onLocaleChange.subscribe(function () {
            _this.updateValue(phraseKey, dynamicVariables);
        });
        return this.value;
    };
    /**
     * @name unsubscribe
     */
    TranslatePipe.prototype.unsubscribe = function () {
        if (this.onLangChange) {
            this.onLangChange.unsubscribe();
            this.onLangChange = undefined;
        }
    };
    TranslatePipe = __decorate([
        core_1.Pipe({
            name: 'translate',
            pure: false
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], TranslatePipe);
    return TranslatePipe;
}());
exports.TranslatePipe = TranslatePipe;
