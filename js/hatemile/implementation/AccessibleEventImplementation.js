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

/**
 * @class AccessibleEventImplementation
 * @classdesc The AccessibleEventImplementation class is official implementation
 * of AccessibleEvent interface.
 * @extends hatemile.AccessibleEvent
 * @memberof hatemile.implementation
 */
exports.hatemile.implementation.AccessibleEventImplementation = (function() {
	var CLICK_EVENT, DATA_BLUR_ADDED, DATA_FOCUS_ADDED, DATA_IGNORE, DATA_KEY_DOWN_ADDED, DATA_KEY_PRESSED, DATA_KEY_PRESS_ADDED, DATA_KEY_UP_ADDED, DRAG_EVENT, DROP_EVENT, HOVER_EVENT, addEventHandler, clearDropEffect, createDragEvent, createMouseEvent, enterPressed, executeDragEvent, executeEvent, executeMouseEvent, generateDropEffect, hasEvent, keyboardAccess;

	DATA_IGNORE = 'data-ignoreaccessibilityfix';
	DATA_KEY_PRESSED = 'data-keypressed';
	DATA_KEY_DOWN_ADDED = 'data-keydownadded';
	DATA_KEY_PRESS_ADDED = 'data-keypressadded';
	DATA_KEY_UP_ADDED = 'data-keyupadded';
	DATA_FOCUS_ADDED = 'data-focusadded';
	DATA_BLUR_ADDED = 'data-bluradded';
	CLICK_EVENT = 'click';
	HOVER_EVENT = 'hover';
	DRAG_EVENT = 'drag';
	DROP_EVENT = 'drop';

	/**
	 * Initializes a new object that manipulate the accessibility of the
	 * Javascript events of elements of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	function AccessibleEventImplementation(parser) {
		this.parser = parser;
		this.cancelDragAdded = false;
	}

	/**
	 * Returns if the key pressed is enter.
	 * @param {Number} keyCode The code of key pressed.
	 * @return {Boolean} True if the key pressed is enter or false if the key
	 * pressed isn't enter.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	isEnter = function(keyCode) {
		var enter1, enter2;
		enter1 = '\n'.charCodeAt(0);
		enter2 = '\r'.charCodeAt(0);
		return (keyCode === enter1) || (keyCode === enter2);
	};

	/**
	 * Provide keyboard access for element, if it not has.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	keyboardAccess = function(element) {
		var tag;
		if (!element.hasAttribute('tabindex')) {
			tag = element.getTagName();
			if ((tag === 'A') && (!element.hasAttribute('href'))) {
				element.setAttribute('tabindex', '0');
			} else if ((tag !== 'A') && (tag !== 'INPUT') && (tag !== 'BUTTON') && (tag !== 'SELECT') && (tag !== 'TEXTAREA')) {
				element.setAttribute('tabindex', '0');
			}
		}
	};

	/**
	 * Increase a function on event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {String} typeEvent The name of type of event fixed.
	 * @param {String} typeDataEvent The name of attribute that store the type of
	 * event fixed.
	 * @param {String} typeFix The id of fix method.
	 * @param {Function} functionForEventHandler The function.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	addEventHandler = function(element, typeEvent, typeDataEvent, typeFix, functionForEventHandler) {
		var attribute, found, nativeElement;
		if (!hasEvent(element, typeEvent, typeDataEvent, typeFix)) {
			found = false;
			attribute = element.getAttribute(typeDataEvent);
			nativeElement = element.getData();
			if (!hasEvent(element, typeEvent)) {
				nativeElement["liston" + typeEvent] = [];
				nativeElement["on" + typeEvent] = function(event) {
					var addedEvent, _i, _len, _ref;
					_ref = nativeElement["liston" + typeEvent];
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						addedEvent = _ref[_i];
						addedEvent(event);
					}
				};
			} else {
				found = exports.hatemile.util.CommonFunctions.inList(attribute, typeFix);
			}
			if (!found) {
				nativeElement["liston" + typeEvent].push(functionForEventHandler);
				attribute = exports.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix);
				element.setAttribute(typeDataEvent, attribute);
			}
		}
	};

	/**
	 * Returns if the element has the event added by developer or fixed by
	 * HaTeMiLe.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {String} typeEvent The event.
	 * @param {String} typeDataEvent The data type of event.
	 * @param {String} typeFix The id of fix method.
	 * @return {Boolean} True if the element has the event added by developer or
	 * fixed by HaTeMiLe or false if the element not has the event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	hasEvent = function(element, typeEvent, typeDataEvent, typeFix) {
		var attribute, nativeElement;
		nativeElement = element.getData();
		if (isEmpty(typeDataEvent) || isEmpty(typeFix)) {
			return (!isEmpty(nativeElement["on" + typeEvent])) || ((!isEmpty(nativeElement.eventListenerList)) && (!isEmpty(nativeElement.eventListenerList[typeEvent])));
		} else {
			attribute = element.getAttribute(typeDataEvent);
			return (hasEvent(element, typeEvent) && (!element.hasAttribute(typeDataEvent))) || exports.hatemile.util.CommonFunctions.inList(attribute, typeFix);
		}
	};

	/**
	 * Remove the information on attributes of drop effect.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	clearDropEffect = function(parser) {
		var activeEvents, dragEvents, droppedElement, droppedElements, hoverEvents, _i, _len;
		droppedElements = parser.find('[aria-dropeffect]').listResults();
		for (_i = 0, _len = droppedElements.length; _i < _len; _i++) {
			droppedElement = droppedElements[_i];
			dragEvents = (!hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) && (!hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT));
			activeEvents = (!droppedElement.hasAttribute(DATA_KEY_PRESS_ADDED)) && (!hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT)) && (!hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT));
			hoverEvents = (!hasEvent(droppedElement, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT)) && (!hasEvent(droppedElement, 'blur', DATA_BLUR_ADDED, HOVER_EVENT));
			droppedElement.setAttribute('aria-dropeffect', 'none');
			if (droppedElement.hasAttribute('tabindex') && dragEvents && activeEvents && hoverEvents) {
				droppedElement.removeAttribute('tabindex');
			}
		}
	};

	/**
	 * Put in all droppable elements the information of the type of drop.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	generateDropEffect = function(parser) {
		var ariaDropEffect, dropEffect, droppedElement, droppedElements, effectAllowed, _i, _len;
		dropEffect = exports.__dragEventDataTransfer__.dropEffect;
		effectAllowed = exports.__dragEventDataTransfer__.effectAllowed;
		if ((dropEffect === 'none') || ((dropEffect !== 'copy') && (dropEffect !== 'link') && (dropEffect !== 'move'))) {
			if ((effectAllowed === 'copyLink') || (effectAllowed === 'copyMove') || (effectAllowed === 'linkMove') || (effectAllowed === 'all')) {
				ariaDropEffect = 'popup';
			} else if ((effectAllowed === 'copy') || (effectAllowed === 'move') || (effectAllowed === 'link')) {
				ariaDropEffect = effectAllowed;
			} else {
				ariaDropEffect = 'move';
			}
		} else {
			ariaDropEffect = dropEffect;
		}
		droppedElements = parser.find('[aria-dropeffect]').listResults();
		for (_i = 0, _len = droppedElements.length; _i < _len; _i++) {
			droppedElement = droppedElements[_i];
			if (hasEvent(droppedElement, 'drop')) {
				droppedElement.setAttribute('aria-dropeffect', ariaDropEffect);
			}
			keyboardAccess(droppedElement);
		}
	};

	/**
	 * Execute the event as mouse event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	executeMouseEvent = function(type, element, event) {
		executeEvent(element, createMouseEvent(type, element, event));
	};

	/**
	 * Execute the event as drag event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	executeDragEvent = function(type, element, event) {
		if (isEmpty(exports.__dragEventDataTransfer__)) {
			exports.__dragEventDataTransfer__ = {
				'files': null
				, 'types': null
				, 'effectAllowed': 'uninitialized'
				, 'dropEffect': 'none'
			};
			exports.__dragEventDataTransfer__.setDragImage = function() {
			};
			exports.__dragEventDataTransfer__.addElement = function() {
			};
			exports.__dragEventDataTransfer__._data = {};
			exports.__dragEventDataTransfer__.setData = function(format, data) {
				exports.__dragEventDataTransfer__._data[format] = data;
			};
			exports.__dragEventDataTransfer__.getData = function(format) {
				return exports.__dragEventDataTransfer__._data[format];
			};
			exports.__dragEventDataTransfer__.clearData = function(format) {
				if (isEmpty(format)) {
					exports.__dragEventDataTransfer__._data = {};
				} else {
					exports.__dragEventDataTransfer__._data[format] = void 0;
				}
			};
		}
		executeEvent(element, createDragEvent(type, element, event));
	};

	/**
	 * Execute the event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	executeEvent = function(element, event) {
		var error, handlerEvent, listenerEvent, nativeElement, _i, _len, _ref;
		nativeElement = element.getData();
		if (hasEvent(element, event.type)) {
			handlerEvent = nativeElement["on" + event.type];
			if (!isEmpty(handlerEvent)) {
				try {
					handlerEvent.call(nativeElement, event);
				} catch (_error) {
					error = _error;
				}
			}
			if ((!isEmpty(nativeElement.eventListenerList)) && (!isEmpty(nativeElement.eventListenerList[event.type]))) {
				_ref = nativeElement.eventListenerList[event.type];
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					listenerEvent = _ref[_i];
					try {
						listenerEvent.call(nativeElement, event);
					} catch (_error) {
						error = _error;
					}
				}
			}
		}
	};

	/**
	 * Create a proxy for original event, simulating the mouse event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @return {Object} The proxy of original event, simulating the mouse event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	createMouseEvent = function(type, element, event) {
		var data;
		data = {
			'type': type
			, 'view': event.view
			, 'ctrlKey': event.ctrlKey
			, 'shiftKey': event.shiftKey
			, 'altKey': event.altKey
			, 'metaKey': event.metaKey
			, 'button': 0
			, 'buttons': 1
			, 'bubbles': true
			, 'cancelable': true
			, 'target': element.getData()
			, 'originalTarget': element.getData()
			, 'cancelBubble': false
			, 'isTrusted': true
			, 'detail': 0
			, 'clientX': 0
			, 'clientY': 0
			, 'pageX': 0
			, 'pageY': 0
			, 'screenX': 0
			, 'screenY': 0
			, 'layerX': 0
			, 'layerY': 0
			, 'offsetX': 0
			, 'offsetY': 0
		};
		data.preventDefault = function() {
			return event.preventDefault();
		};
		data.stopImmediatePropagation = function() {
			return event.stopImmediatePropagation();
		};
		data.stopPropagation = function() {
			return event.stopPropagation();
		};
		return data;
	};

	/**
	 * Create a proxy for original event, simulating the drag event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @return {Object} The proxy of original event, simulating the drag event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	 */
	createDragEvent = function(type, element, event) {
		var dragEvent;
		dragEvent = createMouseEvent(type, element, event);
		dragEvent.dataTransfer = exports.__dragEventDataTransfer__;
		return dragEvent;
	};

	visit = function(element, condition, obj, operation) {
		var child, children, _i, _len;
		if (!element.hasAttribute(DATA_IGNORE)) {
			if (condition(element)) {
				operation.call(obj, element);
			}
			children = element.getChildrenElements();
			for (_i = 0, _len = children.length; _i < _len; _i++) {
				child = children[_i];
				visit(child, condition, obj, operation);
			}
		}
	};

	AccessibleEventImplementation.prototype.fixDrop = function(element) {
		var parser;
		element.setAttribute('aria-dropeffect', 'none');
		parser = this.parser;
		addEventHandler(element, 'focus', DATA_FOCUS_ADDED, DROP_EVENT, function(event) {
			if (!isEmpty(parser.find('[aria-grabbed="true"]').firstResult())) {
				executeDragEvent('dragenter', element, event);
				executeDragEvent('dragover', element, event);
				generateDropEffect(parser);
			}
		});
		addEventHandler(element, 'blur', DATA_BLUR_ADDED, DROP_EVENT, function(event) {
			if (!isEmpty(parser.find('[aria-grabbed="true"]').firstResult())) {
				executeDragEvent('dragleave', element, event);
				generateDropEffect(parser);
			}
		});
		if ((!hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT)) && (!hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT))) {
			addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT, function(event) {
				var grabbedElement, grabbedElements, _i, _len;
				if ((isEnter(event.keyCode)) && (!element.hasAttribute(DATA_KEY_PRESSED)) && (!isEmpty(parser.find('[aria-grabbed=true]').firstResult()))) {
					element.setAttribute(DATA_KEY_PRESSED, 'true');
					if (hasEvent(element, 'drop')) {
						grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
						for (_i = 0, _len = grabbedElements.length; _i < _len; _i++) {
							grabbedElement = grabbedElements[_i];
							grabbedElement.setAttribute('aria-grabbed', 'false');
							executeDragEvent('dragend', grabbedElement, event);
						}
						clearDropEffect(parser);
					}
					executeDragEvent('drop', element, event);
				}
			});
			addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT, function(event) {
				element.removeAttribute(DATA_KEY_PRESSED);
			});
		}
	};

	AccessibleEventImplementation.prototype.fixDrag = function(element) {
		var parser, root;
		keyboardAccess(element);
		element.setAttribute('aria-grabbed', 'false');
		parser = this.parser;
		if ((!hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) && (!hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))) {
			addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT, function(event) {
				var grabbedElement, grabbedElements, _i, _len;
				if ((event.keyCode === ' '.charCodeAt(0)) && (!element.hasAttribute(DATA_KEY_PRESSED))) {
					grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
					for (_i = 0, _len = grabbedElements.length; _i < _len; _i++) {
						grabbedElement = grabbedElements[_i];
						grabbedElement.setAttribute('aria-grabbed', 'false');
						executeDragEvent('dragend', grabbedElement, event);
					}
					element.setAttribute('aria-grabbed', 'true');
					element.setAttribute(DATA_KEY_PRESSED, 'true');
					executeDragEvent('dragstart', element, event);
					executeDragEvent('drag', element, event);
					generateDropEffect(parser);
				}
			});
			addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT, function(event) {
				element.removeAttribute(DATA_KEY_PRESSED);
			});
		}
		if (!this.cancelDragAdded) {
			root = this.parser.find('html').firstResult();
			addEventHandler(root, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, function(event) {
				var grabbedElement, grabbedElements, _i, _len;
				if (event.keyCode === 27) {
					grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
					for (_i = 0, _len = grabbedElements.length; _i < _len; _i++) {
						grabbedElement = grabbedElements[_i];
						grabbedElement.setAttribute('aria-grabbed', 'false');
						executeDragEvent('dragend', grabbedElement, event);
					}
					clearDropEffect(parser);
				}
			});
			this.cancelDragAdded = true;
		}
	};

	AccessibleEventImplementation.prototype.fixAllDragsandDrops = function() {
		var body;
		body = this.parser.find('body').firstResult();
		visit(body, function(element) {
			return hasEvent(element, 'drag') || hasEvent(element, 'dragstart') || hasEvent(element, 'dragend');
		}, this, this.makeAccessibleDragEvents);
		visit(body, function(element) {
			return hasEvent(element, 'drop') || hasEvent(element, 'dragenter') || hasEvent(element, 'dragleave') || hasEvent(element, 'dragover');
		}, this, this.makeAccessibleDropEvents);
	};

	AccessibleEventImplementation.prototype.fixHover = function(element) {
		keyboardAccess(element);
		addEventHandler(element, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT, function(event) {
			executeMouseEvent('mouseover', element, event);
		});
		addEventHandler(element, 'blur', DATA_BLUR_ADDED, HOVER_EVENT, function(event) {
			executeMouseEvent('mouseout', element, event);
		});
	};

	AccessibleEventImplementation.prototype.fixAllHovers = function() {
		visit(this.parser.find('body').firstResult(), function(element) {
			return hasEvent(element, 'mouseover') || hasEvent(element, 'mouseout');
		}, this, this.makeAccessibleHoverEvents);
	};

	AccessibleEventImplementation.prototype.fixActive = function(element) {
		var tag, typeButtons;
		keyboardAccess(element);
		tag = element.getTagName();
		typeButtons = ['submit', 'button', 'reset'];
		if (((tag !== 'INPUT') || (!element.hasAttribute('type')) || (typeButtons.indexOf(element.getAttribute('type').toLowerCase()) === -1)) && (tag !== 'BUTTON') && (tag !== 'A')) {
			addEventHandler(element, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, function(event) {
				if (isEnter(event.keyCode)) {
					if (hasEvent(element, 'click')) {
						executeMouseEvent('click', element, event);
					} else if (hasEvent(element, 'dblclick')) {
						executeMouseEvent('dblclick', element, event);
					}
				}
			});
		}
		addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT, function(event) {
			if (isEnter(event.keyCode)) {
				executeMouseEvent('mouseup', element, event);
			}
		});
		addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT, function(event) {
			if (isEnter(event.keyCode)) {
				executeMouseEvent('mousedown', element, event);
			}
		});
	};

	AccessibleEventImplementation.prototype.fixAllActives = function() {
		visit(this.parser.find('body').firstResult(), function(element) {
			return hasEvent(element, 'click') || hasEvent(element, 'mousedown') || hasEvent(element, 'mouseup') || hasEvent(element, 'dblclick');
		}, this, this.makeAccessibleClickEvents);
	};

	return AccessibleEventImplementation;

})();