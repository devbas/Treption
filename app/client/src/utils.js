import axios from 'axios'

// Based on: https://jsfiddle.net/mw7optL5/
export const blendColors = (base, added) => {
  //var base = [0, 0, 0, 0.6];
  //var added = [255,0,0,0.55];

  const mix = [];
  mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
  mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3])); // red
  mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3])); // green
  mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3])); // blue

  return mix
}

/**
 * 
 * 
 * @param {any} numOfSteps 
 * @param {any} step 
 * @returns 
 */
export const rainbow = (numOfSteps, step) => {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let r, g, b;
  const h = step / numOfSteps
  const i = ~~(h * 6);
  const f = h * 6 - i;
  const q = 1 - f;
  switch(i % 6){
    case 0: r = 1; g = f; b = 0; break;
    case 1: r = q; g = 1; b = 0; break;
    case 2: r = 0; g = 1; b = f; break;
    case 3: r = 0; g = q; b = 1; break;
    case 4: r = f; g = 0; b = 1; break;
    case 5: r = 1; g = 0; b = q; break;
  }
  const c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}


/**
 * 
 * 
 * @param {any} min 
 * @param {any} max 
 * @returns 
 */
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

export const supportedPosTokens = () => {
  return [
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
}

/**
 * 
 * 
 * @param {any} cname 
 * @returns 
 */
export const getCookie = (cname) => {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {

  const originalRequest = error.config

  if(error.response.status === 401 && !originalRequest._retry && !error.response.request.responseURL.includes('/api/refresh')) {
    originalRequest._retry = true
    const refreshToken = getCookie('refreshToken')

    return axios({
      method: 'post', 
      url: `/api/refresh`, 
      config: { headers: {'Content-Type': 'multipart/form-data', 'Cookie': `refreshToken=${refreshToken}` }}
    }).then((data) => {
      document.cookie = `accessToken=${data.data.access_token}`
      console.log('cookies: ', document.cookie)
      //originalRequest.headers.Cookie = `accessToken=${data.data.access_token};`
      axios.defaults.headers.common['Cookie'] = `accessToken=${data.data.access_token};`
      return axios(originalRequest)
    }).catch((error) => {
      return Promise.reject(error)
    }) 
  } else if(error.response.status === 401 && error.response.request.responseURL.includes('/api/refresh')) {
    if(window.location.pathname !== '/login') {
      window.location.replace(`/login?loginredirect=true`);
    }
  } else {
    return Promise.reject(error)
  }
})