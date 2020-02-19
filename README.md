# rake-js

## TL;DR

Quick Start? Follow the installation and sample usage. Don't forget to read the details before deploying to production.

### Installation

```bash
npm install @shopping24/rake-js
```

### Sample Usage

```javascript
const deDict = require('@shopping24/rake-js/dist/de');
const rakejs = require('@shopping24/rake-js');

// From https://de.wikipedia.org/wiki/Jaguar, available under the Creative Commons Attribution-ShareAlike License.
const text = 'Die Kopf-Rumpf-Länge des Jaguars beträgt 112 cm bis 185 cm, hinzu kommt ein 45–75 cm langer Schwanz. ' +
'Die Schulterhöhe liegt im Durchschnitt bei etwa 70 cm. Obwohl insgesamt kräftiger und massiger gebaut als der ' +
'Leopard, ist sein Schwanz deutlich kürzer als der des afrikanisch-asiatischen Verwandten. Das Körpergewicht variiert ' +
'stark zwischen unterschiedlichen Regionen und schwankt zwischen 36 und 158 kg. Weibchen sind dabei etwa 10–20 % ' +
'kleiner und entsprechend leichter als männliche Tiere. Darüber hinaus besteht eine ausgeprägte geographische ' +
'Variation. So sind Jaguare in Nord- und Mittelamerika deutlich kleiner als Jaguare in Südamerika. Männliche Tiere in ' +
'Belize haben im Schnitt etwa ein Gewicht von 60 kg, während Jaguarmännchen in Venezuela und Brasilien um die 90–100 ' +
'kg wiegen. Weibliche Jaguare in Brasilien wiegen durchschnittlich fast 80 kg.[2]';

const { result } = rakejs.extract(text)
.setOptions({ articles: deDict.articles, stopWords: deDict.stopWords.concat(deDict.articles) })
.pipe(rakejs.extractKeyPhrases)
.pipe(rakejs.extractAdjoinedKeyPhrases)
.pipe(rakejs.keywordLengthFilter)
.pipe(rakejs.distinct)
.pipe(rakejs.scoreWordFrequency)
.pipe(rakejs.sortByScore);

console.log(result);
``` 

## Background story

### What is RAKE?

RAKE is the acronym for Rapid Automated Keyword Extraction. The basic algorithm is described by Stuart Rose, Dave Engel,
Nick Cramer and Wendy Cowley in their paper "Automatic keyword extraction from individual documents"
[(©2010, John Wiley & Sons, Ltd, Source click here)](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents).

In short RAKE describes splitting a text into fragments by stop words. Stop words are always considered to be irrelevant
to the context. The _RAKEd_ result of `Red Zebra and Jaguar` would therefore be `[Red Zebra, Jaguar]`.

The score is then calculated by counting the individual words and and creating degrees based on the length of found
fragments. 

### What is this repository about?

This repository includes advanced methods in addition to the original RAKE description. Furthermore we added a
functional wrapper as feature for a more flexible way of handling keyword extraction. The process consists of these
steps:

0. Extracting fragments from any given text using various available methods.
0. Score the fragments.
0. Retrieve the end result.

Extraction and scoring functions from any source making use of the Phrases and Phrase classes may be used and executed
in the desired order.

For reference you can find included extraction and scoring functions under [`src/utils/`](https://github.com/shopping24/rake-js/tree/master/src/utils).
Included helper functions are accessible in [`src/lib/`](https://github.com/shopping24/rake-js/tree/master/src/lib).

## Pipeline Reference

The extract method and phrases class provide a convenient way to apply multiple filtering and scoring methods on a
given text.

### `Phrases` Class

A Phrases object is created and returned by the `extract(text)` function.

#### Methods

Method       | Arguments                                         | Returns     | Description
---          | ---                                               | ---         | ---
`pipe`       | `method`: Callable Function                       | `<Phrases>` | `method` Receives and must return `Phrases` object. `result` must be an array of `Phrase` objects.
`toPhrase`   | `phrase`: String,<br>`score`: Number (_optional_) | `<Phrase>`  | Helper function, creates and returns new `Phrase` object from given `phrase` and `score`. Pushing into `result` property of  `Phrase` object needs to be done manually.
`setOptions` | `options`: Object                                 | `<Phrases>` | Provided key/value pairs get merged with stored `Phrases` options and made available to pipeline methods. See documentation of Extraction and Scoring Functions for available options.

#### Properties

Property   | Type         | Mutable | Description
---        | ---          | ---     | --- 
`result`   | `<Phrase[]>` | Y       | Contains result array of the previous pipe function. Pipe functions must not change object properties but reassign the full object with either an empty array or an array of `Phrase` objects. 
`original` | `<string>`   | N       | The input provided with the `extract(text)` function.
`options`  | `<object>`   | N       | Key/value pairs of options provided when using `setOptions`.

### `Phrase` Class

A `Phrase` object represents a single extracted fragment with the calculated score. The score value may be changed as
needed during pipeline processing.

#### Properties

Property   | Type       | Mutable | Description
---        | ---        | ---     | --- 
`phrase`   | `<Phrase>` | Y       | The extracted text fragment.  
`score`    | `<string>` | Y       | The calculated score of the text fragment. 

## Included Extraction Functions

Method                      | Access/Change                                        | Description                                                                                                                 | Options
---                         | ---                                                  | ---                                                                                                                         | ---
`extractKeyPhrases`         | Accesses `original`,<br>Pushes records into `result` | Basic RAKE implementation, splitting `original` by words from `stopWords` array.                                            | `stopWords<Array>`
`extractAdjoinedKeyPhrases` | Accesses `original`,<br>Pushes records into `result` | Extracts combined with stop words combined fragments (ie. Birds and Bees) from `original` and pushes result into `results`. | `stopWords<Array>`,<br>`minKeyWordsPerPhrase<Number>` _At least this number of keywords must exist within the phrase excluding stop words_,<br>`maxKeyWordsPerPhrase<Number>` _At maximum this number of keywords must exist within the phrase excluding stop words_

## Included Scoring Functions

Method               | Access/Change                                                  | Description                                       | Options
---                  | ---                                                            | ---                                               | ---
`scoreWordFrequency` | Accesses `original`,<br>Changes `score` in `result.<Phrase>[]` | Adds to the score of each phrase the word counts. | `stopWords<Array>`

## Included Convenience Functions

Method                | Access/Change                 | Description                                                                                                                                                                                                               | Options
---                   | ---                           | ---                                                                                                                                                                                                                       | ---
`distinct`            | Accesses and changes `result` | Removes duplicate values from `result`                                                                                                                                                                                    | -
`keywordLengthFilter` | Accesses and changes `result` | Removes individual words from each phrase not matching the `minWordLength` and `maxWordLength` length and removes whole phrases from `result` not matching the `minKeyWordsPerPhrase` and `maxKeyWordsPerPhrase` options. | `minWordLength<Number`,<br> `maxWordLength<Number>`,<br> `minKeyWordsPerPhrase<Number>`,<br> `maxKeyWordsPerPhrase<Number>`
`sortByScore`         | Accesses and changes `result` | Sort `result` array by score descending.                                                                                                                                                                                  | -

## Included Helpers and Library Functions

Method             | Where                                          | Arguments                                     | Returns      | Description
---                | ---                                            | ---                                           | ---          | ---
`extract`          | `@shopping24/rake-js`                          | `text<String>`                                | `<Phrases>`  | Helper function, constructs `Phrases` object.
`options`          | `@shopping24/rake-js/src/lib/options`          | `overrides<Object>`: Override default options | `<Object>`   | Get options object with key/value pairs. Includes `get(key<String>, default = defaultValue<*>)` method returning `value` for `key` in object. If key does not exist `defaultValue` is returned.
`splitByStopWords` | `@shopping24/rake-js/src/lib/splitByStopWords` | `sentence<String>`,<br>`stopWords<String[]>`  | `<String[]>` | Split `sentence` by `stopWords` into fragments. 
`splitSentences`   | `@shopping24/rake-js/src/lib/splitSentences`   | `text<String>`                                | `<String[]>` | Split `text` by line- and paragraph separator and dash, open, close, initial and final punctuation into fragments.
`splitWords`       | `@shopping24/rake-js/src/lib/splitWords`       | `text<String>`                                | `<String[]>` | Split `text` into individual words by non-letter, mark and number characters.

## Included Dictionary

We included a basic german stop words and articles lists under `dictionary/de.js` and `dist/de.js`. For best results
concat both lists for the `stopWords` option. `articles` may be used individually for other extraction and scoring
functions.

## Writing your own Extraction and Scoring Methods

It's recommended to look into the already defined extraction and scoring functions. These rules must be followed:

* Pipeline functions receive `Phrases` as first argument and must return same,
* the `result` property of the `Phrases` object must be an empty array or an array of `Phrase` objects,
* you may change `result` by reassigning/overriding the value, do not change individual properties.

> You know, if there is one thing that I have learned, it is that we must obey the rules of the game. We can pick the game, Niko Bellic. But we cannot change the rules.
