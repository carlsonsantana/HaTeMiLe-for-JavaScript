/*
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

var exports;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * The AccessibleCSS interface improve accessibility of CSS.
 * @interface hatemile.AccessibleCSS
 */
exports.hatemile.AccessibleCSS = (function() {
	function AccessibleCSS() {
	}

	/**
	 * Provide the CSS features of speaking and speech properties in element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleCSS#provideSpeakProperties
	 */
	AccessibleCSS.prototype.provideSpeakProperties = function(element) {
	};

	/**
	 * Provide the CSS features of speaking and speech properties in all elements
	 * of page.
	 * @public
	 * @function hatemile.AccessibleCSS#provideAllSpeakProperties
	 */
	AccessibleCSS.prototype.provideAllSpeakProperties = function() {
	};

	return AccessibleCSS;

})();