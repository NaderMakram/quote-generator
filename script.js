// selectors

const newQuoteButton = document.querySelector('#new-quote')
const tweetButton = document.querySelector('#twitter')

const quoteTemplate = document.querySelector('#quote')
const authorTemplate = document.querySelector('#author')

const container = document.querySelector('#container')
const loader = document.querySelector('#loader')



// functions


// show and hide loader and quote-container
function toggleLoader() {
  loader.hidden = !loader.hidden;
  container.hidden = !container.hidden;
}



async function getQuote() {
  toggleLoader()
  try {
    const res = await fetch('https://api.quotable.io/random')
    let data = await res.json()
    console.log(data)
    let quote = data.content
    let author = data.author
    if (quoteTemplate.textContent == quote) {
      console.log('---------------- its the same quote, get another')
      return getQuote()
    }
    // if there is no author, add unknown
    if (author === '') {
      authorTemplate.textContent = 'Unknown'
    } else {
      authorTemplate.textContent = author
    }
    // // reduce font size for long quotes
    if (quote.length > 120) {
      quoteTemplate.classList.add('long-text')
    } else {
      quoteTemplate.classList.remove('long-text')
    }
    quoteTemplate.textContent = quote
  } catch (err) {
    // getQuote()
    console.error(err)
    console.log(err)
  }
  toggleLoader()
}



const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}



function tweetQuote() {
  let quote = quoteTemplate.textContent
  let author = authorTemplate.textContent
  let msg = `${quote}\n${author}`
  let twitterUrl = "https://twitter.com/intent/tweet?text=" + escape(msg)
  console.log(msg)
  window.open(twitterUrl, '_blank')
}


// events
newQuoteButton.addEventListener('click', debounce(getQuote, 500))
tweetButton.addEventListener('click', tweetQuote)