'use strict'



/**
 * Split by separators like comma and semicolon but do not split if it is inside braces/brackets
 * 
 * @param text string Input text
 * @param options optional object with `empties: false` if you want empty strings to be filtered out, `trim: true` if you want each entry to be whitespace trimmed and `separators: ',.;'` if you want custom separator characters (default is ',;')
 * 
 * Example:
 * splitOuter('หาxx, _[used as surp[r,i]se, intหาogation; suspicion]_, n2; n(x,x)หา3, n4', {trim: true})
 * => ["หาxx", "_[used as surp[r,i]se, intหาogation; suspicion]_", "n2", "n(x,x)หา3", "n4"]
 */
function splitOuter(text, options) {
	// Second parameter can be just the separator characters
	if (typeof options ==='string') {
		options = {separators: options}
	}

	// Default parameters
	options = typeof options==='object' && options!==null? JSON.parse(JSON.stringify(options)) : {}
	if (typeof options.separators !== 'string') {
		options.separators = ',;'
	}
	if (typeof options.empties !== 'boolean') {
		options.empties = true
	}
	// Check parameters
	if (typeof text!=='string' || typeof options!=='object') {
		throw new Error('splitOuter: Expecting (string, object) parameters')
	}

	var openBrackets = 0
	var x = ''
	var parts = []
	for (var i=0, len=text.length; i<len; ++i) {
		var ch = text[i]
		if (openBrackets<=0 && options.separators.indexOf(ch)!==-1) {
			parts.push(x)
			x = ''
		} else {
			x += ch
			if (ch==='(' || ch==='[' || ch==='{') {
				openBrackets += 1
			} else if (ch===')' || ch===']' || ch==='}') {
				openBrackets -= 1
			}
		}
	}
	var lastCharIsSeparator = text.length>0 && options.separators.indexOf(text.substr(-1))!==-1
	if (x.length || lastCharIsSeparator) {
		parts.push(x)
	}

	// Apply transformation and filtering options
	if (options.trim) {
		parts = parts.map(function(part) {return part.trim()})
	}
	if (!options.empties) {
		parts = parts.filter(function(part) {return part.length>0})
	}

	return parts
}



module.exports = splitOuter