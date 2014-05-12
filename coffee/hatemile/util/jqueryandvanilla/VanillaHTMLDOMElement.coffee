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
exports.hatemile or= {}
exports.hatemile.util or= {}
exports.hatemile.util.jqueryandvanilla or= {}
class exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement
	constructor: (@data) ->
	getTagName: () ->
		return @data.tagName.toUpperCase()
	
	getAttribute: (name) ->
		return @data.getAttribute(name)
	
	setAttribute: (name, value) ->
		@data.setAttribute(name, value)
		return
	
	removeAttribute: (name) ->
		@data.removeAttribute(name)
		return
	
	hasAttribute: (name) ->
		return @data.hasAttribute(name)
	
	hasAttributes: () ->
		return @data.hasAttributes()
	
	getTextContent: () ->
		if not isEmpty(@data.textContent)
			return @data.textContent
		if not isEmpty(@data.innerText)
			return @data.innerText
		text = ''
		childs = @data.childNodes
		for child in childs
			if (child.nodeType is document.TEXT_NODE)
				text += child.nodeValue
			else if (child.nodeType is document.ELEMENT_NODE)
				elementChild = new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(child)
				text += elementChild.getTextContent()
		return text
	
	insertBefore: (newElement) ->
		parent = @data.parentElement
		parent.insertBefore(newElement.getData(), @data)
		return newElement
	
	insertAfter: (newElement) ->
		parent = @data.parentElement
		childs = parent.childNodes
		found = false
		for child in childs
			if (found)
				parent.insertBefore(newElement.getData(), child)
				return
			else if (child is @data)
				found = true
		parent.appendChild(newElement.getData())
		return newElement
	
	removeElement: () ->
		@data.remove()
		return @data
	
	replaceElement: (newElement) ->
		parent = @data.parentElement
		parent.replaceChild(newElement.getData(), @data)
		return newElement
	
	appendElement: (element) ->
		@data.appendChild(element.getData())
		return element
	
	getChildren: () ->
		children = @data.children
		array = []
		for child in children
			array.push(new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(child))
		return array
	
	appendText: (text) ->
		@data.appendChild(document.createTextNode(text))
		return
	
	hasChildren: () ->
		return not isEmpty(@data.children)
	
	getParentElement: () ->
		if isEmpty(@data.parentElement)
			return undefined
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(@data.parentElement)
	
	getInnerHTML: () ->
		return @data.innerHTML
	
	setInnerHTML: (html) ->
		@data.innerHTML = html
		return
	
	getOuterHTML: () ->
		return @data.outerHTML
	
	getData: () ->
		return @data
	
	setData: (data) ->
		@data = data
	
	cloneElement: () ->
		div = document.createElement('div')
		div.innerHTML = @getOuterHTML()
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(div.firstElementChild)
	
	getFirstElementChild: () ->
		if not @hasChildren
			return undefined
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(@data.firstElementChild)
	
	getLastElementChild: () ->
		if not @hasChildren
			return undefined
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(@data.lastElementChild)