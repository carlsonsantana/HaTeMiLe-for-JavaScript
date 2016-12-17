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
 * @namespace hatemile.implementation
###
exports.hatemile.implementation or= {}

class exports.hatemile.implementation.AccessibleAssociationImplementation
	
	DATA_IGNORE = 'data-ignoreaccessibilityfix'
	
	###*
	 * Returns a list that represents the table.
	 * @param {hatemile.util.html.HTMLDOMElement} part The table header, table
	 * footer or table body.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @returns {hatemile.util.html.HTMLDOMElement[][]} The list that
	 * represents the table.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getModelTable
	###
	getModelTable = (part, parser) ->
		table = []
		rows = parser.find(part).findChildren('tr').listResults()
		for row in rows
			table.push(getModelRow(parser.find(row).findChildren('th,td').listResults()))
		return getValidModelTable(table)
	
	###*
	 * Returns a list that represents the table with the rowspans.
	 * @param {hatemile.util.html.HTMLDOMElement[][]} originalTable The list that
	 * represents the table without the rowspans.
	 * @returns {hatemile.util.html.HTMLDOMElement[][]} The list that represents
	 * the table with the rowspans.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getValidModelTable
	###
	getValidModelTable = (originalTable) ->
		newTable = []
		if not isEmpty(originalTable)
			lengthTable = originalTable.length
			for rowIndex in [0..lengthTable - 1]
				originalRow = originalTable[rowIndex]
				if isEmpty(newTable[rowIndex])
					newTable[rowIndex] = []
				if not isEmpty(originalRow)
					cellsAdded = 0
					lengthRow = originalRow.length
					for cellIndex in [0..lengthRow - 1]
						cell = originalRow[cellIndex]
						newCellIndex = cellIndex + cellsAdded
						newRow = newTable[rowIndex]
						while not isEmpty(newRow[newCellIndex])
							cellsAdded = cellsAdded + 1
							newCellIndex = cellIndex + cellsAdded
						newRow[newCellIndex] = cell
						if cell.hasAttribute('rowspan')
							rowspan = parseInt(cell.getAttribute('rowspan'))
							newRowIndex = rowIndex
							while (rowspan > 1)
								rowspan = rowspan - 1
								newRowIndex = newRowIndex + 1
								if isEmpty(newTable[newRowIndex])
									newTable[newRowIndex] = []
								newTable[newRowIndex][newCellIndex] = cell
		return newTable
	
	###*
	 * Returns a list that represents the line of table with the colspans.
	 * @param {hatemile.util.html.HTMLDOMElement[]} originalRow The list that
	 * represents the line of table without the colspans.
	 * @returns {hatemile.util.html.HTMLDOMElement[]} The list that represents the
	 * line of table with the colspans.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getModelRow
	###
	getModelRow = (originalRow) ->
		newRow = []
		if not isEmpty(originalRow)
			newRow = newRow.concat(originalRow)
			length = originalRow.length
			cellsAdded = 0
			for i in [0..length - 1]
				if originalRow[i].hasAttribute('colspan')
					colspan = parseInt(originalRow[i].getAttribute('colspan'))
					while (colspan > 1)
						colspan = colspan - 1
						cellsAdded = cellsAdded + 1
						newRow.splice(i + cellsAdded, 0, originalRow[i])
		return newRow
	
	###*
	 * Validate the model that represents the table header.
	 * @param {hatemile.util.html.HTMLDOMElement[][]} header The list that
	 * represents the table header.
	 * @returns {boolean} True if the table header is valid or false if the table
	 * header is not valid.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.validateHeader
	###
	validateHeader = (header) ->
		if isEmpty(header)
			return false
		length = -1
		for row in header
			if isEmpty(row)
				return false
			else if length is -1
				length = row.length
			else if row.length isnt length
				return false
		return true
	
	###*
	 * Returns a list with ids of rows of same column.
	 * @param {hatemile.util.html.HTMLDOMElement[][]} header The list that
	 * represents the table header.
	 * @param {number} index The index of columns.
	 * @returns {string[]} The list with ids of rows of same column.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getCellsHeadersIds
	###
	getCellsHeadersIds = (header, index) ->
		ids = []
		for row in header
			cell = row[index]
			if (cell.getTagName() is 'TH') and (cell.getAttribute('scope') is 'col')
				ids.push(cell.getAttribute('id'))
		return ids
	
	###*
	 * Associate the data cell with header cell of row.
	 * @param {hatemile.util.html.HTMLDOMElement} element The table body or footer.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} prefixId The prefix of generated id.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.associateDataCellsWithHeaderCellsOfRow
	###
	associateDataCellsWithHeaderCellsOfRow = (element, parser, prefixId) ->
		table = getModelTable(element, parser)
		for row in table
			headersIds = []
			for cell in row
				if cell.getTagName() is 'TH'
					exports.hatemile.util.CommonFunctions.generateId(cell, prefixId)
					headersIds.push(cell.getAttribute('id'))
					
					cell.setAttribute('scope', 'row')
			if not isEmpty(headersIds)
				for cell in row
					if cell.getTagName() is 'TD'
						headers = cell.getAttribute('headers')
						for headerId in headersIds
							headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headerId)
						cell.setAttribute('headers', headers)
		return
	
	###*
	 * Set the scope of header cells of table header.
	 * @param {hatemile.util.html.HTMLDOMElement} tableHeader The table header.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} prefixId The prefix of generated id.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.prepareHeaderCells
	###
	prepareHeaderCells = (tableHeader, parser, prefixId) ->
		cells = parser.find(tableHeader).findChildren('tr').findChildren('th').listResults()
		for cell in cells
			exports.hatemile.util.CommonFunctions.generateId(cell, prefixId)
			if not cell.hasAttribute('scope')
				cell.setAttribute('scope', 'col')
		return
	
	###*
	 * Initializes a new object that improve the accessibility of associations of
	 * parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class The AccessibleAssociationImplementation class is official
	 * implementation of AccessibleAssociation.
	 * @implements {hatemile.AccessibleAssociation}
	 * @constructs hatemile.implementation.AccessibleAssociationImplementation
	###
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
	
	associateDataCellsWithHeaderCells: (table) ->
		header = @parser.find(table).findChildren('thead').firstResult()
		body = @parser.find(table).findChildren('tbody').firstResult()
		footer = @parser.find(table).findChildren('tfoot').firstResult()
		if not isEmpty(header)
			prepareHeaderCells(header, @parser, @prefixId)
			
			headerRows = getModelTable(header, @parser)
			if (not isEmpty(body)) and (validateHeader(headerRows))
				lengthHeader = headerRows[0].length
				fakeTable = getModelTable(body, @parser)
				if not isEmpty(footer)
					fakeTable = fakeTable.concat(getModelTable(footer, @parser))
				for row in fakeTable
					if row.length is lengthHeader
						i = 0
						for cell in row
							headersIds = getCellsHeadersIds(headerRows, i++)
							headers = cell.getAttribute('headers')
							for headersId in headersIds
								headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headersId)
							cell.setAttribute('headers', headers)
		if not isEmpty(body)
			associateDataCellsWithHeaderCellsOfRow(body, @parser, @prefixId)
		if not isEmpty(footer)
			associateDataCellsWithHeaderCellsOfRow(footer, @parser, @prefixId)
		return
	
	associateAllDataCellsWithHeaderCells: () ->
		tables = @parser.find('table').listResults()
		for table in tables
			if exports.hatemile.util.CommonFunctions.isValidElement(table)
				if isEmpty(@parser.find(table).findDescendants("thead[#{DATA_IGNORE}],tbody[#{DATA_IGNORE}],tfoot[#{DATA_IGNORE}],tr[#{DATA_IGNORE}],th[#{DATA_IGNORE}],td[#{DATA_IGNORE}]").firstResult())
					@associateDataCellsWithHeaderCells(table)
		return