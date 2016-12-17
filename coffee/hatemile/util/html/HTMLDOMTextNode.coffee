###
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @namespace hatemile.util
###
exports.hatemile.util or= {}

###*
 * @namespace hatemile.util.html
###
exports.hatemile.util.html or= {}

###*
 * The HTMLDOMTextNode interface contains the methods for access of the Text.
 * @interface hatemile.util.html.HTMLDOMTextNode
 * @extends hatemile.util.html.HTMLDOMNode
###
class exports.hatemile.util.html.HTMLDOMTextNode extends exports.hatemile.util.html.HTMLDOMNode
	
	###*
	 * Change the text content of text node.
	 * @param {string} text The new text content.
	 * @public
	 * @function hatemile.util.html.HTMLDOMTextNode#setTextContent
	###
	setTextContent: (text) ->