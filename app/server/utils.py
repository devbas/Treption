import nltk
from nltk.tag.stanford import CoreNLPPOSTagger
from pprint import pprint
import logging
#import urllib.request

logger = logging.getLogger('spam_application')

def POSTagger(content): 

  result = CoreNLPPOSTagger(url='http://postagger:9000').tag("A passenger plane has crashed shortly after take-off from Kyrgyzstan's capital, Bishkek, killing a large number of those on board. The head of Kyrgyzstan's civil aviation authority said that out of about 90 passengers and crew, only about 20 people have survived. The Itek Air Boeing 737 took off bound for Mashhad, in north-eastern Iran, but turned round some 10 minutes later.".split())
  if result:
    logger.info("done")
    return result