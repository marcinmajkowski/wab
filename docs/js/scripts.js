window.onresize = function () {
  updateMessageWidths()
}

AppLoader.ondone = function () {
  updateMessageWidths()
  play()
}

function updateMessageWidths() {
  document
    .querySelectorAll('.message')
    .forEach(updateMessageWidth)
}

function updateMessageWidth(message) {
  message.style.width = null
  var span = message.querySelector('.message > span')
  if (span) {
    message.style.width = span.getBoundingClientRect().width + 'px'
  }
}

function onMessageFormSubmit(event) {
  event.preventDefault()
  var content = event.target.message.value
  event.target.message.value = ''

  if (content) {
    appendMessageElement(createMessageElement(content, 'right'));
  }
}

function createMessageElement(content, variant) {
  var span = document.createElement('span')
  span.textContent = content

  var element = document.createElement('div')
  element.classList.add('message')
  element.classList.add('message--' + variant)
  element.appendChild(span)

  return element
}

function appendMessageElement(messageElement) {
  var messengerElement = document.querySelector('.messenger')
  var messageFormElement = messengerElement.querySelector('.message-form')
  messengerElement.insertBefore(messageElement, messageFormElement)
  updateMessageWidth(messageElement)
}

function play() {
  var typingElement = createMessageElement('...', 'left')
  var speed = 1;
  var timeout = 0;

  scenario.forEach(function (item) {
    switch (item.type) {
      case 'wait': {
        timeout += item.duration * speed;
        break;
      }
      case 'typing': {
        setTimeout(function () {
          appendMessageElement(typingElement);
        }, timeout);
        timeout += item.duration * speed;
        setTimeout(function () {
          typingElement.remove();
        }, timeout);
        break;
      }
      case 'left': {
        setTimeout(function () {
          var messageElement = createMessageElement(item.content, 'left');
          appendMessageElement(messageElement);
        }, timeout);
        break;
      }
      case 'right': {
        setTimeout(function () {
          var messageElement = createMessageElement(item.content, 'right');
          appendMessageElement(messageElement);
        }, timeout);
        break;
      }
    }
  })
}

var scenario = [
  { type: 'wait', duration: 1000 },
  { type: 'typing', duration: 1200 },
  { type: 'left', content: 'jestem teraz w studio' },
  { type: 'wait', duration: 1000 },
  { type: 'typing', duration: 500 },
  { type: 'left', content: 'nagrywam' },
  { type: 'wait', duration: 1000 },
  { type: 'typing', duration: 1000 },
  { type: 'left', content: 'nie moge gadac' },
  { type: 'wait', duration: 1400 },
  { type: 'right', content: 'ty do mnie piszesz' },
  { type: 'wait', duration: 2000 },
  { type: 'typing', duration: 300 },
  { type: 'left', content: 'nara.' },
]
