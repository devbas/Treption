import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import _ from 'lodash'

export const fetchedSentence = createReducer([], {
  [types.SET_SENTENCE](state, action) {
    const words = action.sentence.sentence.words
    let i = 0
    let j = 0

    const aggregatedWords = []
    const keystrokes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    words.forEach((word) => {
      
      if(word.pos !== 'POS') {

        const aggregatedWord = {}

        // Possible tags, as derived from the Penn Treebank site: https://catalog.ldc.upenn.edu/docs/LDC99T42/tagguid1.pdf
        const possibleTags = [
          'CC', // Coordinating conjunction
          'CD', // Cardinal number 
          'DT', // Determiner
          'EX', // Existential *there*
          'FW', // Foreign word
          'IN', // Preposition or subordinating conjunction
          'JJ', // Adjective
          'JJR', // Adjective, comparative 
          'JJS', // Adjective, superlative
          'LS', // List item marker
          'MD', // Modal
          'NN', // Noun, singular or mass
          'NNS', // Noun, plural
          'NNP', // Proper noun, singular
          'NNPS', // Proper noun, plural
          'PDT', // Predeterminer
          'POS', // Possesive ending
          'PRP', // Personal pronoun
          'PRP$', // Possesive pronoun
          'RB', // Adverb
          'RBR', // Adverb, comparative
          'RBS', // Adverb, superlative
          'RP', // Particle
          'SYM', // Symbol
          'TO', // *to*
          'UH', // Interjection
          'VB', // Verb, base form
          'VBD', // Verb, past tense
          'VBG', // Verb, gerund or present participle 
          'VBN', // Verb, past participle, 
          'VBP', // Verb, non-3rd person singular present
          'VBZ', // Verb, 3rd preson singular present
          'WDT', // Wh-determiner
          'WP', // Wh-pronoun
          'WP$', // Possessive wh-pronoun
          'WRB' // Wh-adverb
        ]
        
        if(words[i+1] && words[i+1].pos === 'POS') { // We combine Possesive endings (e.g. 's or ') with the previous noun to increase readability
          aggregatedWord.combined = true 
          aggregatedWord.words = [words[i], words[i+1]]
        } else {
          aggregatedWord.combined = false 
          aggregatedWord.words = [words[i]]
        }

        if(!_.includes(possibleTags, word.pos)) {
          aggregatedWord.inactive = true
          aggregatedWord.keystroke = ''
        } else {
          aggregatedWord.inactive = false 
          aggregatedWord.keystroke = keystrokes[j]
          j++
        }
        
        

        aggregatedWords.push(aggregatedWord)
      }
      
      i++
    })

    const sentence = {
      documentPosition: action.sentence.sentence.documentPosition, 
      wordCount: action.sentence.sentence.wordCount, 
      sentenceId: parseInt(action.sentence.sentence.sentenceId), 
      aggregatedWords: aggregatedWords
    }

    return sentence

    /*
      [
        {
          combined: boolean, 
          status: active/inactive, 
          words: [
            {
              id: int, 
              position: int, 
              value: string, 
              pos: string, 
              primary: boolean, 
              keystroke: string
            }
          ]
        },
        {

        }
      ]

    */

  }
})