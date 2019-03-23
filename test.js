const splitOuter = require('./')



function assertEqual(actual, expected) {
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		console.error('Test failed')
		console.error('    Actual:  ', actual)
		console.error('    Expected:', expected)
		console.error('    Location:', new Error().stack)
		console.error('')
	}
}



// Empty string
assertEqual(splitOuter(''), [])

// Empty entries
assertEqual(splitOuter(','), ['', ''])
assertEqual(splitOuter(',;'), ['', '', ''])

// No delimiter in source
assertEqual(splitOuter('abc'), ['abc'])

// Simple cases
assertEqual(splitOuter('abc, def'), ['abc', ' def'])
assertEqual(splitOuter('abc,, def'), ['abc', '', ' def'])
assertEqual(splitOuter('abc, ;def'), ['abc', ' ', 'def'])

// Options 'trim' and 'noEmpties'
assertEqual(splitOuter('abc, ;de, f', {trim: true, noEmpties: true}), ['abc', 'de', 'f'])

// Special delimiter
assertEqual(splitOuter('lalalal', {separators: 'a'}), ['l', 'l', 'l', 'l'])

// Brackets
assertEqual(splitOuter(
	'Maude (smart, wise), Harold (funny, talkative); Higgins (France, California); ',
	{trim: true, noEmpties: true}
	), [
		'Maude (smart, wise)',
		'Harold (funny, talkative)',
		'Higgins (France, California)'
	]
)

// Multiple nested brackets
assertEqual(splitOuter(
	'หาxx, _[used as surp[r,i]se, intหาogation; suspicion]_, n2; n(x,x)หา3, n4',
	), [
		'หาxx',
		' _[used as surp[r,i]se, intหาogation; suspicion]_',
		' n2',
		' n(x,x)หา3',
		' n4'
	]
)

// Falty nesting
assertEqual(splitOuter(
	'this, (shoudl {,be) illegal},hm?',
	), [
		'this',
		' (shoudl {,be) illegal}',
		'hm?'
	]
)

// Too few closing brackets
assertEqual(splitOuter(
	'this, (shoudl {,be illegal}, ',
	), [
		'this',
		' (shoudl {,be illegal}, '
	]
)

// Too many closing brackets
assertEqual(splitOuter(
	'this, shoudl {,be )illegal}, what?',
	), [
		'this',
		' shoudl {,be )illegal}',
		' what?'
	]
)