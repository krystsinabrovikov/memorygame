document.addEventListener('DOMContentLoaded', () => {
  let cards = document.querySelectorAll('img')
  let resultDisplay = document.querySelector('#result')
  let secondCard = [{
      name: 'pic1',
      image: 'images/pic1.png'
    },
    {
      name: 'pic1',
      image: 'images/pic1.png'
    },
    {
      name: 'pic2',
      image: 'images/pic2.png'
    },
    {
      name: 'pic2',
      image: 'images/pic2.png'
    },
    {
      name: 'pic3',
      image: 'images/pic3.png'
    },
    {
      name: 'pic3',
      image: 'images/pic3.png'
    },
    {
      name: 'pic4',
      image: 'images/pic4.png'
    },
    {
      name: 'pic4',
      image: 'images/pic4.png'
    },
    {
      name: 'pic5',
      image: 'images/pic5.png'
    },
    {
      name: 'pic5',
      image: 'images/pic5.png'
    },
    {
      name: 'pic6',
      image: 'images/pic6.png'
    },
    {
      name: 'pic6',
      image: 'images/pic6.png'
    }
  ]
  let cardsChoosen = []
  let cardsChoosenId = []
  let cardsWon = []

  secondCard.sort(() => 0.5 - Math.random())

  function flip() {
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', () => {
        cards[i].setAttribute('data-id', i)
        cards[i].classList.add('clicked')
        let cardId = cards[i].getAttribute('data-id')
        cards[i].setAttribute('src', secondCard[cardId].image)
        cardsChoosen.push(secondCard[cardId].name)
        cardsChoosenId.push(cardId)
        if (cardsChoosen.length === 2) {
          setTimeout(checkForMatch, 500)
          
        }
      })
    }
  }

  function checkForMatch() {
    let optionOneId = cardsChoosenId[0]
    let optionTwoId = cardsChoosenId[1]
    if (cardsChoosen[0] === cardsChoosen[1]) {
      showAlert("You got a match!", 'match')
      setTimeout(function () {
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cardsWon.push(cardsChoosen)
        resultDisplay.textContent = cardsWon.length
      if (cardsWon.length === secondCard.length / 2) {
          let text = document.querySelector('h3')
          text.innerHTML = 'Congratulation! You found them All!'
          let parentBtn = document.querySelector('.btn')
          let restartBtn = document.createElement('button')
          restartBtn.classList = 'button'
          restartBtn.appendChild(document.createTextNode('Play Again'))
          parentBtn.appendChild(restartBtn)
          restartBtn.addEventListener('click', refreshPage)
        }
      }, 1000)
    } else {
      showAlert('Sorry, try again', 'no-match')
      
      setTimeout(function () {
        
        cards[optionOneId].setAttribute('src', 'images/camomile.png')
        cards[optionOneId].classList.remove('clicked')
        cards[optionTwoId].setAttribute('src', 'images/camomile.png')
        cards[optionTwoId].classList.remove('clicked')
        resultDisplay.textContent = cardsWon.length
      }, 1000)
    }
    cardsChoosen = []
    cardsChoosenId = []
  }

  function showAlert(message, className) {
    const intro = document.querySelector('.intro')
    const h3 = document.querySelector('h3')
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    intro.insertBefore(div, h3)
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 1000)
  }

  function refreshPage() {
    location.reload()
  }
  flip()
})