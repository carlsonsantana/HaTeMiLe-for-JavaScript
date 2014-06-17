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
 * @class AccessibleForm
 * @classdesc The AccessibleForm interface fix the problems of accessibility
 * associated with the forms.
 * @version 1.0
 * @memberof hatemile
###
class exports.hatemile.AccessibleForm
	
	###*
	 * Fix required field.
	 * @param {hatemile.util.HTMLDOMElement} requiredField The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H90.html|H90: Indicating required form controls using label or legend}
	 * @see {@link http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/ARIA2|ARIA2: Identifying a required field with the aria-required property}
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/F81.html|F81: Failure of Success Criterion 1.4.1 due to identifying required or error fields using color differences only}
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-required|aria-required (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixRequiredField: (requiredField) ->
	
	###*
	 * Fix required fields.
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H90.html|H90: Indicating required form controls using label or legend}
	 * @see {@link http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/ARIA2|ARIA2: Identifying a required field with the aria-required property}
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/F81.html|F81: Failure of Success Criterion 1.4.1 due to identifying required or error fields using color differences only}
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-required|aria-required (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixRequiredFields: () ->
	
	###*
	 * Fix disabled field.
	 * @param {hatemile.util.HTMLDOMElement} disabledField The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-disabled|aria-disabled (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixDisabledField: (disabledField) ->
	
	###*
	 * Fix disabled fields.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-disabled|aria-disabled (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixDisabledFields: () ->
	
	###*
	 * Fix read-only field.
	 * @param {hatemile.util.HTMLDOMElement} readOnlyField The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-readonly|aria-readonly (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixReadOnlyField: (readOnlyField) ->
	
	###*
	 * Fix read-only fields.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-readonly|aria-readonly (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixReadOnlyFields: () ->
	
	###*
	 * Fix range field.
	 * @param {hatemile.util.HTMLDOMElement} rangeField The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-valuemin|aria-valuemin (property) | Supported States and Properties}
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-valuemax|aria-valuemax (property) | Supported States and Properties}
	 * @see {@link http://www.w3.org/WAI/GL/wiki/Using_WAI-ARIA_range_attributes_for_range_widgets_such_as_progressbar,_scrollbar,_slider,_and_spinbutton|Using WAI-ARIA range attributes for range widgets such as progressbar, scrollbar, slider and spinbutton}
	 * @see {@link http://www.w3.org/WAI/GL/2013/WD-WCAG20-TECHS-20130711/ARIA3.html|ARIA3: Identifying valid range information with the aria-valuemin and aria-valuemax properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixRangeField: (rangeField) ->
	
	###*
	 * Fix range fields.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-valuemin|aria-valuemin (property) | Supported States and Properties}
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-valuemax|aria-valuemax (property) | Supported States and Properties}
	 * @see {@link http://www.w3.org/WAI/GL/wiki/Using_WAI-ARIA_range_attributes_for_range_widgets_such_as_progressbar,_scrollbar,_slider,_and_spinbutton|Using WAI-ARIA range attributes for range widgets such as progressbar, scrollbar, slider and spinbutton}
	 * @see {@link http://www.w3.org/WAI/GL/2013/WD-WCAG20-TECHS-20130711/ARIA3.html|ARIA3: Identifying valid range information with the aria-valuemin and aria-valuemax properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixRangeFields: () ->
	
	###*
	 * Fix text field.
	 * @param {hatemile.util.HTMLDOMElement} textField The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-multiline|aria-multiline (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixTextField: (textField) ->
	
	###*
	 * Fix text fields.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-multiline|aria-multiline (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixTextFields: () ->
	
	###*
	 * Fix select field.
	 * @param {hatemile.util.HTMLDOMElement} selectField The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-multiselectable|aria-multiselectable (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixSelectField: (selectField) ->
	
	###*
	 * Fix select fields.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-multiselectable|aria-multiselectable (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixSelectFields: () ->
	
	###*
	 * Fix field with label.
	 * @param {hatemile.util.HTMLDOMElement} label The element that will be fixed.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-label|aria-label (property) | Supported States and Properties}
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby|aria-labelledby (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixLabel: (label) ->
	
	###*
	 * Fix fields with labels.
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-label|aria-label (property) | Supported States and Properties}
	 * @see {@link http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby|aria-labelledby (property) | Supported States and Properties}
	 * @memberof hatemile.AccessibleForm
	###
	fixLabels: () ->