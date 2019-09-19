import splitSentences from '../../src/lib/sentences'
import mockData from '../__mocks__/mockData'

describe('splitSentences', () => {
    const standard = mockData.defaultText
    const specialChars = mockData.specialChars
    it('should return an array of strings', () => {
        expect(splitSentences(standard)).toBeInstanceOf(Array)
    })
    // it('should split at the delimiters and remove them', () => {
    //     expect(splitSentences(specialChars).toNotContain)
    // })
})
