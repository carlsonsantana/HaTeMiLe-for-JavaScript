###
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
###
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @class AccessibleShortcut
 * @classdesc The AccessibleShortcut interface fix the problems of accessibility
 * associated with the shortcuts.
 * @version 1.0
 * @memberof hatemile
###
class exports.hatemile.AccessibleShortcut
	
	###*
	 * Returns the browser shortcut prefix.
	 * @return {String} The browser shortcut prefix.
	 * @memberof hatemile.AccessibleShortcut
	###
	getPrefix: () ->
	
	###*
	 * Fix the element with shortcuts.
	 * @param {hatemile.util.HTMLDOMElement} element The element with shortcuts.
	 * @memberof hatemile.AccessibleShortcut
	###
	fixShortcut: (element) ->
	
	###*
	 * Fix the elements with shortcuts.
	 * @memberof hatemile.AccessibleShortcut
	###
	fixShortcuts: () ->