# outer-split

Split a string by delimiters but ignore contents inside parenthesis/brackets.


## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm i --save outer-split
```

This module has no dependencies.


## Description

Split a string by characters but ignore those separator characters inside brackets.

Options are
```
{
    separators: string,     // default ',;'
    empties: true/false,    // default true, keeps empty entries
    trim: true/false        // default false, trims each entry
}
```

## Usage

```js
const splitOuter = require('split-outer')

const text = 'Maude (smart, wise), Harold (funny, talkative); Higgins (France, California);'
const parts = splitOuter(text, {trim: true, empties: false})
// results in
//	[
//		'Maude (smart, wise)',
//		'Harold (funny, talkative)',
//		'Higgins (France, California)'
//	]


```


## License

MIT