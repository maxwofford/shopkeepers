const initialShopkeeperSpeed = 3.5
let shopkeeperSpeed = initialShopkeeperSpeed

async function shopkeeperInteraction(message) {
  await setShopkeeperSpeed(null)
  await shopkeeperSay(null, null, true)
  for (const line of message.split('|')) {
    console.log({line, message})
    if (line.startsWith('speed:')) {
      if (line.split(':')[1] === 'default') {
        await setShopkeeperSpeed(null)
      } else {
        await setShopkeeperSpeed(parseFloat(line.split(':')[1]))
      }
    } else if (line.startsWith('icon:')) {
      await shopkeeperSay(line.split(':')[1], null, false)
    } else {
      await shopkeeperSay(null, line, false)
    }
  }
}
function setShopkeeperSpeed(setSpeed) {
  if (setSpeed) {
    shopkeeperSpeed = setSpeed
  } else {
    shopkeeperSpeed = initialShopkeeperSpeed
  }
}
async function shopkeeperSay(expression, text, clearText = true, overrideRate = shopkeeperSpeed) {
  if (clearText) {
    document.getElementById('shopkeeper-speech').innerText = ''
  }
  if (expression) {
    shopkeeperLook(transcript('shopkeeper.' + expression))
  }
  if (text) {
    shopkeeperActive()
    await new Promise(resolveCallback => {
      yap(text, {
        baseRate: overrideRate,
        // baseRate: 3.5,
        // rateVariance: 2,
        letterCallback: async ({letter, sound}) => {
          document.getElementById('shopkeeper-speech').innerHTML += letter
        },
        endCallback: () => {
          resolveCallback()
          shopkeeperIdle()
        }
      })
    })
  }
}
async function shopkeeperLook(image) {
  document.getElementById('shopkeeper-image').src = image
}

async function shopkeeperIdle() {
  document.getElementById('shopkeeper-image').classList.add('idle')
  document.getElementById('shopkeeper-image').classList.remove('talking')
}

async function shopkeeperActive() {
  document.getElementById('shopkeeper-image').classList.add('talking')
  document.getElementById('shopkeeper-image').classList.remove('idle')
}