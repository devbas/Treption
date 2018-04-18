import nltk
from nltk.tag.stanford import CoreNLPPOSTagger
from pprint import pprint
#import urllib.request

def POSTagger(content): 

  result = CoreNLPPOSTagger(url='http://postagger:9000').tag('What is the airspeed of an unladen swallow ?'.split())
  return result