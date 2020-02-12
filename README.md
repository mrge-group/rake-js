# rake-js

## Using the extract pipeline

The extract method and phrases class provide a convenient way to apply multiple filtering and scoring methods on a
given text.

### Available pipeline methods

Method       | Arguments                                      | Description
---          | ---                                            | ---
`extract`    | `text`: String                                 | Helper function, constructs `Phrases` object.
`pipe`       | `method`: Callable Function                    | Provided function gets called in pipeline. Receives and must return `Phrases` object. `result` must be an array with `Phrase` objects.
`toPhrase`   | `phrase`: String, `score`: Number (*optional*) | Helper function, creates and returns new `Phrase` object from given `phrase` and `score`. Inserting into `result` property must be done manually.
`setOptions` | `options`: Object                              | Provided key/value pairs get merged with stored `Phrases` options and made available to pipeline methods.

### Available pipeline properties

Except `result` these properties are immutable.

Property   | Type            | Description
---        | ---             | --- 
`result`   | `Phrase<array>` | Contains result array of previous pipe functions. Pipe functions must not change object properties but must reassign the full object with either an empty array or an array of `Phrase` objects. 
`original` | `<string>`      | The original content provided when executing the `extract` function. Must not be changed by pipe functions.
`options`  | `<object>`      | Key/value pairs of options provided by `setOptions`. 

### Sample Usage

```javascript
import extract from '@shopping24/rake-js/src/extract'

// From https://en.wikipedia.org/wiki/Jaguar, available under the Creative Commons Attribution-ShareAlike License.
const text = 'The jaguar is a compact and well-muscled animal. It is the largest cat native to the Americas and the ' +
'third largest in the world, exceeded in size by the tiger and the lion. Its coat is generally a tawny yellow, but ' +
'ranges to reddish-brown, for most of the body. The ventral areas are white. The fur is covered with rosettes for ' +
'camouflage in the dappled light of its forest habitat. The spots and their shapes vary between individual jaguars: ' +
'rosettes may include one or several dots. The spots on the head and neck are generally solid, as are those on the ' +
'tail, where they may merge to form a band. Forest jaguars are frequently darker and considerably smaller than those ' +
'in open areas, possibly due to the smaller numbers of large, herbivorous prey in forest areas.'

const { result } = extract(text)
.setOptions({ separator: ' ' })
.pipe(phrases => {
    const { toPhrase, options } = phrases
    const { separator } = options
    let { result } = phrases

    phrases.result = result.merge(original.split(separator).map(res => toPhrase(res)))

    return phrases
})
.pipe(doScoring)
``` 
