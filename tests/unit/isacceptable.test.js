import { isAcceptable } from '../../src/keywords'

describe('isAcceptable', () => {
    const phrase = 'lirum larum löffelstiel lol rofl'

    it('should decide whether a phrace qualifies', () => {
        const notAccepted = isAcceptable(phrase, 2, 4)
        const accepted = isAcceptable(phrase, 2, 7)
        expect(notAccepted).toBeFalsy()
        expect(accepted).toBeTruthy()
    })
})
