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

var exports, _base, _base1, _base2;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace util
 * @memberof hatemile
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace css
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).css || (_base1.css = {});

(_base2 = exports.hatemile.util.css).jscssp || (_base2.jscssp = {});

exports.hatemile.util.css.jscssp.JSCSSPDeclaration = (function() {
	function JSCSSPDeclaration(declaration) {
		this.declaration = declaration;
	}

	JSCSSPDeclaration.prototype.getValue = function() {
		return this.declaration.valueText.trim();
	};

	JSCSSPDeclaration.prototype.getValues = function() {
		var propertyValue, values, _i, _len, _ref;
		values = [];
		_ref = this.declaration.values;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			propertyValue = _ref[_i];
			values.push(propertyValue.value);
		}
		return values;
	};

	JSCSSPDeclaration.prototype.getProperty = function() {
		return this.declaration.property;
	};

	return JSCSSPDeclaration;

})();