//import splitOuter from './'


const splitOuter = require('./')

const text = 'Maude (smart, wise), Harold (funny, talkative); Higgins (France, California)'
const parts = splitOuter(text, {separators: ',;', trim: true})

console.log(parts)
//	[
//		'Maude (smart, wise)',
//		'Harold (funny, talkative)',
//		'Higgins (France, California)'
//	]