const showMusic = new Howl({
  src: ['https://cloud-akjvxw4d0-hack-club-bot.vercel.app/0indigo_park_ost_-_airplayn___mollie_s_landing_pad____vmy-mxohsuy__audio.mp4'],
  loop: true,
  rate: 0.5,
  volume: 0.1
})

const playMusic = async () => {
  // strange fade-in effect where the pitch shifts up like a record player
  showMusic.fade(0, 1, 1000);
  showMusic.play()
  while (showMusic.rate() < 1) {
    showMusic.rate(showMusic.rate() + 0.05)
    await new Promise(r => setTimeout(r, 200))
  }
}

const spinDownMusic = async () => {
  showMusic.fade(1, 0.5, 5000);
  while (showMusic.rate() > 0.5) {
    showMusic.rate(showMusic.rate() - 0.05)
    await new Promise(r => setTimeout(r, 500))
  }
}