import requests
import sys

def createTriple(subject, predicate, objectValue):

  response = requests.post('http://fuseki:3030/treption/update', data={'update': '''PREFIX trp: <http://www.treption.com/test-ontology.owl#> 

    INSERT DATA {
      trp:beer trp:contains trp:water .
    }'''}
  )

  print(response, file=sys.stderr)

  return response


  
    