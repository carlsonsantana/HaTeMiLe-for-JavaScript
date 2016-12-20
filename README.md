# HaTeMiLe for JavaScript

HaTeMiLe (HTML Accessible) is a library that can convert a HTML code in a HTML code more accessible.

## Accessibility solutions

* Associate HTML elements;
* Provide a polyfill to CSS speech and aural properties: speak, speak-as, speak-punctuation, speak-numeral and speak-header;
* Display more information of page for screen reader:
  * Titles;
  * Link attributes;
  * Cell headers;
  * Keyboard shortcuts;
  * Languages;
  * WAI-ARIA roles;
  * WAI-ARIA attribute.
* Make mouse events available from a keyboard;
* Show information of fields;
* Provide a polyfill to long descriptions attributes;
* Provide links to navigate by heading;
* Provide links to skip contents of page.

## Documentation

To generate the full API documentation of HaTeMiLe of JavaScript use [JSDoc](http://usejsdoc.org/).

## Usage

Include the configuration, dependencies and solutions scripts and styles:

```html
<!-- Hide visual changes -->
<link rel="stylesheet" type="text/css" href="/path/to/css/hide_changes.css" />
<!-- Configuration -->
<script type="text/javascript" src="/path/to/_locales/en_US/js/configurations.js"></script>
<script type="text/javascript" src="/path/to/_locales/en_US/js/skippers.js"></script>
<script type="text/javascript" src="/path/to/_locales/en_US/js/symbols.js"></script>
<!-- Dependencies -->
<script type="text/javascript" src="/path/to/js/common.js"></script>
<script type="text/javascript" src="/path/to/js/eventlistener.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/CommonFunctions.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/Configure.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/html/vanilla/VanillaHTMLDOMParser.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/html/vanilla/VanillaHTMLDOMElement.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/html/vanilla/VanillaHTMLDOMTextNode.js"></script>
<script type="text/javascript" src="/path/to/js/cssParser.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/css/jscssp/JSCSSPParser.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/css/jscssp/JSCSSPRule.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/util/css/jscssp/JSCSSPDeclaration.js"></script>
<!-- Solutions -->
<script type="text/javascript" src="/path/to/js/hatemile/implementation/AccessibleCSSImplementation.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/implementation/AccessibleEventImplementation.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/implementation/AccessibleFormImplementation.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/implementation/AccessibleDisplayScreenReaderImplementation.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/implementation/AccessibleNavigationImplementation.js"></script>
<script type="text/javascript" src="/path/to/js/hatemile/implementation/AccessibleAssociationImplementation.js"></script>
```

Instanciate the configuration, the parsers and solution classes and execute them:

```javascript
//Configure
var configuration = new hatemile.util.Configure(hatemile_configuration);
//Parsers
var htmlParser = new hatemile.util.html.vanilla.VanillaHTMLDOMParser(document);
var cssParser = new hatemile.util.css.jscssp.JSCSSPParser(document, location.href);
//Execute
var accessibleCSS = new hatemile.implementation.AccessibleCSSImplementation(htmlParser, cssParser, hatemile_configuration_symbols);
accessibleCSS.provideAllSpeakProperties();

var accessibleEvent = new hatemile.implementation.AccessibleEventImplementation(htmlParser);
accessibleEvent.makeAccessibleAllDragandDropEvents();
accessibleEvent.makeAccessibleAllHoverEvents();
accessibleEvent.makeAccessibleAllClickEvents();

var accessibleForm = new hatemile.implementation.AccessibleFormImplementation(htmlParser, configuration);
accessibleForm.markAllRequiredFields()
accessibleForm.markAllRangeFields();
accessibleForm.markAllAutoCompleteFields();
accessibleForm.markAllInvalidFields();

var accessibleNavigation = new hatemile.implementation.AccessibleNavigationImplementation(htmlParser, configuration, hatemile_configuration_skippers);
accessibleNavigation.provideNavigationByAllHeadings();
accessibleNavigation.provideNavigationByAllSkippers();
accessibleNavigation.provideNavigationToAllLongDescriptions();

var accessibleAssociation = new hatemile.implementation.AccessibleAssociationImplementation(htmlParser, configuration);
accessibleAssociation.associateAllDataCellsWithHeaderCells();
accessibleAssociation.associateAllLabelsWithFields();

var accessibleScreenReader = new hatemile.implementation.AccessibleDisplayScreenReaderImplementation(htmlParser, configuration, navigator.userAgent);
accessibleScreenReader.displayAllRoles();
accessibleScreenReader.displayAllCellHeaders();
accessibleScreenReader.displayAllShortcuts();
accessibleScreenReader.displayAllWAIARIAStates();
accessibleScreenReader.displayAllLinksAttributes();
accessibleScreenReader.displayAllTitles();
accessibleScreenReader.displayAllDragsAndDrops();
accessibleScreenReader.displayAllLanguages();
```

## See also
[HaTeMiLe for Java](https://github.com/carlsonsantana/HaTeMiLe-for-Java)
[HaTeMiLe for PHP](https://github.com/carlsonsantana/HaTeMiLe-for-PHP)
[HaTeMiLe for Python](https://github.com/carlsonsantana/HaTeMiLe-for-Python)
[HaTeMiLe for Ruby](https://github.com/carlsonsantana/HaTeMiLe-for-Ruby)