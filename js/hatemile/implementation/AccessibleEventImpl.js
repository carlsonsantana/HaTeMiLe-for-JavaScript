/*
Copyright 2014 Carlson Santana Cruz

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var exports, _base;

exports = this;

/**
 * @namespace hatemile
*/


exports.hatemile || (exports.hatemile = {});

/**
 * @namespace implementation
 * @memberof hatemile
*/


(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleEventsImpl = (function() {
  /**
  	 * Initializes a new object that manipulate the accessibility of the
  	 * Javascript events of elements of parser.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @class AccessibleEventImpl
  	 * @classdesc The AccessibleEventImpl class is official implementation of
  	 * AccessibleEvent interface.
  	 * @extends hatemile.AccessibleEvent
  	 * @version 1.0
  	 * @memberof hatemile.implementation
  */

  function AccessibleEventsImpl(parser, configuration) {
    this.parser = parser;
    this.dataIgnore = configuration.getParameter('data-ignore');
  }

  AccessibleEventsImpl.prototype.fixOnHover = function(element) {
    var nativeElement, tag;
    tag = element.getTagName();
    nativeElement = element.getData();
    if (!((tag === 'INPUT') || (tag === 'BUTTON') || (tag === 'A') || (tag === 'SELECT') || (tag === 'TEXTAREA') || (element.hasAttribute('tabindex')))) {
      element.setAttribute('tabindex', '0');
    }
    if (isEmpty(nativeElement.onfocus)) {
      nativeElement.onfocus = function() {
        if (!isEmpty(nativeElement.onmouseover)) {
          return nativeElement.onmouseover();
        }
      };
    }
    if (isEmpty(nativeElement.onblur)) {
      nativeElement.onblur = function() {
        if (!isEmpty(nativeElement.onmouseout)) {
          return nativeElement.onmouseout();
        }
      };
    }
  };

  AccessibleEventsImpl.prototype.fixOnHovers = function() {
    var element, elements, nativeElement, _i, _len;
    elements = this.parser.find('body *').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      nativeElement = element.getData();
      if ((!element.hasAttribute(this.dataIgnore)) && ((!isEmpty(nativeElement.onmouseover)) || (!isEmpty(nativeElement.onmouseout)))) {
        this.fixOnHover(element);
      }
    }
  };

  AccessibleEventsImpl.prototype.fixOnClick = function(element) {
    var nativeElement, tag;
    tag = element.getTagName();
    if (!((tag === 'INPUT') || (tag === 'BUTTON') || (tag === 'A'))) {
      if (!((element.hasAttribute('tabindex')) || (tag === 'SELECT') || (tag === 'TEXTAREA'))) {
        element.setAttribute('tabindex', '0');
      }
      nativeElement = element.getData();
      if (isEmpty(nativeElement.onkeypress)) {
        nativeElement.onkeypress = function(event) {
          var enter1, enter2, keyCode;
          enter1 = '\n'.charCodeAt(0);
          enter2 = '\r'.charCodeAt(0);
          keyCode = event.keyCode;
          if ((keyCode === enter1) || (keyCode === enter2)) {
            if (!isEmpty(nativeElement.onclick)) {
              return nativeElement.click();
            } else if (!isEmpty(nativeElement.ondblclick)) {
              return nativeElement.ondblclick();
            }
          }
        };
      }
      if (isEmpty(nativeElement.onkeyup)) {
        nativeElement.onkeyup = function(event) {
          var enter1, enter2, keyCode;
          enter1 = '\n'.charCodeAt(0);
          enter2 = '\r'.charCodeAt(0);
          keyCode = event.keyCode;
          if (((keyCode === enter1) || (keyCode === enter2)) && (!isEmpty(nativeElement.onmouseup))) {
            return nativeElement.onmouseup();
          }
        };
      }
      if (isEmpty(nativeElement.onkeydown)) {
        nativeElement.onkeydown = function(event) {
          var enter1, enter2, keyCode;
          enter1 = '\n'.charCodeAt(0);
          enter2 = '\r'.charCodeAt(0);
          keyCode = event.keyCode;
          if (((keyCode === enter1) || (keyCode === enter2)) && (!isEmpty(nativeElement.onmousedown))) {
            return nativeElement.onmousedown();
          }
        };
      }
    }
  };

  AccessibleEventsImpl.prototype.fixOnClicks = function() {
    var element, elements, nativeElement, _i, _len;
    elements = this.parser.find('body *').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      nativeElement = element.getData();
      if ((!element.hasAttribute(this.dataIgnore)) && ((!isEmpty(nativeElement.onclick)) || (!isEmpty(nativeElement.onmousedown)) || (!isEmpty(nativeElement.onmouseup)) || (!isEmpty(nativeElement.ondblclick)))) {
        this.fixOnClick(element);
      }
    }
  };

  return AccessibleEventsImpl;

})();
