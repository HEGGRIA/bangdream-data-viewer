/* eslint-disable no-unused-vars */
import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  beatmap
  BPM = 0
  cH = 800
  cW = 800
  hitLineHeight
  noteAppearHeight
  // about Time
  startT
  nowT
  lastT
  totalT = 0
  sumT = 0
  frame = 0
  // object
  testText
  totalCombo = 0
  combo = 0
  // note
  k = 245
  speed = 0.175
  noteSpriteInfo () {
  }
  noteSprite = []
  sliderSprite = []
  constructor () {
    super({ key: 'PlayScene' })
  }
  create () {
    // get beatmap
    this.beatmap = JSON.parse(window.name).body
    this.totalCombo = this.beatmap.metadata.combo
    console.log(this.beatmap, this.totalCombo)
    // all the img must connect with cw & ch
    // load bg & bgr
    let bg = this.add.sprite(this.cW / 2, this.cH / 2, 'bg')
    let bgR = this.add.sprite(this.cW / 2, this.cH / 3, 'bgR')
    bg.displayWidth = this.cW * 1.32
    bg.displayHeight = this.cH / 2 * 2
    bgR.displayWidth = this.cH / 820 * 680
    bgR.displayHeight = bgR.displayWidth / 16.7 * 9
    // init the begin & end
    this.hitLineHeight = bgR.y + bgR.displayHeight / 2
    this.noteAppearHeight = bgR.y - bgR.displayHeight / 2
    // load bgHL
    let bgHL = this.add.sprite(this.cW / 2, this.hitLineHeight, 'bgHL')
    bgHL.displayWidth = bgR.displayWidth * 1.5
    bgHL.displayHeight = bgHL.displayWidth / 1800 * 38
    // set bg depth
    bg.depth = bgR.depth = bgHL.depth = 0
    // init note sprite
    let j = 0
    for (let i = 0; i < this.beatmap.objects.length; i++) {
      let nSI = {
        s: null,
        s2: null,
        startT: 0,
        runT: 0,
        isHit: false
      }
      let sSI = {
        s: null,
        startT: 0,
        isHit: false,
        n1: null,
        n2: null
      }
      if (this.beatmap.objects[i].type === 'Object') {
        if ((this.beatmap.objects[i].effect === 'Single' || this.beatmap.objects[i].effect === 'FeverSingle') &&
        this.beatmap.objects[i].property === 'Single') {
          switch (this.beatmap.objects[i].lane) {
            case 1:
              nSI.s = this.add.sprite(this.cW / 2 - 9, this.noteAppearHeight + 10, 'noteN1')
              break
            case 2:
              nSI.s = this.add.sprite(this.cW / 2 - 6, this.noteAppearHeight + 10, 'noteN2')
              break
            case 3:
              nSI.s = this.add.sprite(this.cW / 2 - 3, this.noteAppearHeight + 10, 'noteN3')
              break
            case 4:
              nSI.s = this.add.sprite(this.cW / 2, this.noteAppearHeight + 10, 'noteN4')
              break
            case 5:
              nSI.s = this.add.sprite(this.cW / 2 + 3, this.noteAppearHeight + 10, 'noteN5')
              break
            case 6:
              nSI.s = this.add.sprite(this.cW / 2 + 6, this.noteAppearHeight + 10, 'noteN6')
              break
            case 7:
              nSI.s = this.add.sprite(this.cW / 2 + 9, this.noteAppearHeight + 10, 'noteN7')
              break
          }
          nSI.s.displayWidth = 10
          nSI.s.displayHeight = 5
          nSI.s.depth = -1
          nSI.startT = this.beatmap.objects[i].timing - 2000 / 1000
        } else if (this.beatmap.objects[i].effect === 'Flick' || this.beatmap.objects[i].effect === 'SlideEndFlick_A' || this.beatmap.objects[i].effect === 'SlideEndFlick_B') {
          switch (this.beatmap.objects[i].lane) {
            case 1:
              nSI.s = this.add.sprite(this.cW / 2 - 9, this.noteAppearHeight + 10, 'noteU1')
              nSI.s2 = this.add.sprite(this.cW / 2 - 9, this.noteAppearHeight + 5, 'upImg')
              break
            case 2:
              nSI.s = this.add.sprite(this.cW / 2 - 6, this.noteAppearHeight + 10, 'noteU2')
              nSI.s2 = this.add.sprite(this.cW / 2 - 6, this.noteAppearHeight + 5, 'upImg')
              break
            case 3:
              nSI.s = this.add.sprite(this.cW / 2 - 3, this.noteAppearHeight + 10, 'noteU3')
              nSI.s2 = this.add.sprite(this.cW / 2 - 3, this.noteAppearHeight + 5, 'upImg')
              break
            case 4:
              nSI.s = this.add.sprite(this.cW / 2, this.noteAppearHeight + 10, 'noteU4')
              nSI.s2 = this.add.sprite(this.cW / 2, this.noteAppearHeight + 5, 'upImg')
              break
            case 5:
              nSI.s = this.add.sprite(this.cW / 2 + 3, this.noteAppearHeight + 10, 'noteU5')
              nSI.s2 = this.add.sprite(this.cW / 2 + 3, this.noteAppearHeight + 5, 'upImg')
              break
            case 6:
              nSI.s = this.add.sprite(this.cW / 2 + 6, this.noteAppearHeight + 10, 'noteU6')
              nSI.s2 = this.add.sprite(this.cW / 2 + 6, this.noteAppearHeight + 5, 'upImg')
              break
            case 7:
              nSI.s = this.add.sprite(this.cW / 2 + 9, this.noteAppearHeight + 10, 'noteU7')
              nSI.s2 = this.add.sprite(this.cW / 2 + 9, this.noteAppearHeight + 5, 'upImg')
              break
          }
          nSI.s.displayWidth = 10
          nSI.s.displayHeight = 5
          nSI.s.depth = -1
          nSI.startT = this.beatmap.objects[i].timing - 2000 / 1000
          nSI.s2.displayWidth = 6
          nSI.s2.displayHeight = 3
          nSI.s2.depth = -1
        } else if (this.beatmap.objects[i].effect === 'Slide_A' || this.beatmap.objects[i].effect === 'Slide_B') {
          switch (this.beatmap.objects[i].lane) {
            case 1:
              nSI.s = this.add.sprite(this.cW / 2 - 9, this.noteAppearHeight + 10, 'sliderP')
              break
            case 2:
              nSI.s = this.add.sprite(this.cW / 2 - 6, this.noteAppearHeight + 10, 'sliderP')
              break
            case 3:
              nSI.s = this.add.sprite(this.cW / 2 - 3, this.noteAppearHeight + 10, 'sliderP')
              break
            case 4:
              nSI.s = this.add.sprite(this.cW / 2, this.noteAppearHeight + 10, 'sliderP')
              break
            case 5:
              nSI.s = this.add.sprite(this.cW / 2 + 3, this.noteAppearHeight + 10, 'sliderP')
              break
            case 6:
              nSI.s = this.add.sprite(this.cW / 2 + 6, this.noteAppearHeight + 10, 'sliderP')
              break
            case 7:
              nSI.s = this.add.sprite(this.cW / 2 + 9, this.noteAppearHeight + 10, 'sliderP')
              break
          }
          nSI.s.displayWidth = 10
          nSI.s.displayHeight = 5
          nSI.s.depth = -1
          nSI.startT = this.beatmap.objects[i].timing - 2000 / 1000
        } else if (this.beatmap.objects[i].property === 'LongStart' || this.beatmap.objects[i].property === 'LongEnd' || this.beatmap.objects[i].property === 'Slide') {
          switch (this.beatmap.objects[i].lane) {
            case 1:
              nSI.s = this.add.sprite(this.cW / 2 - 9, this.noteAppearHeight + 10, 'noteS1')
              break
            case 2:
              nSI.s = this.add.sprite(this.cW / 2 - 6, this.noteAppearHeight + 10, 'noteS2')
              break
            case 3:
              nSI.s = this.add.sprite(this.cW / 2 - 3, this.noteAppearHeight + 10, 'noteS3')
              break
            case 4:
              nSI.s = this.add.sprite(this.cW / 2, this.noteAppearHeight + 10, 'noteS4')
              break
            case 5:
              nSI.s = this.add.sprite(this.cW / 2 + 3, this.noteAppearHeight + 10, 'noteS5')
              break
            case 6:
              nSI.s = this.add.sprite(this.cW / 2 + 6, this.noteAppearHeight + 10, 'noteS6')
              break
            case 7:
              nSI.s = this.add.sprite(this.cW / 2 + 9, this.noteAppearHeight + 10, 'noteS7')
              break
          }
          nSI.s.displayWidth = 10
          nSI.s.displayHeight = 5
          nSI.s.depth = -1
          nSI.startT = this.beatmap.objects[i].timing - 2000 / 1000
        }
        if (this.beatmap.objects[i].effect === 'Slide_A' ||
        this.beatmap.objects[i].effect === 'Slide_B' ||
        this.beatmap.objects[i].property === 'LongStart' ||
        (this.beatmap.objects[i].effect === 'SlideStart_A' && this.beatmap.objects[i].property === 'Slide') ||
        (this.beatmap.objects[i].effect === 'SlideStart_A' && this.beatmap.objects[i].property === 'Slide')) {
          sSI.s = this.add.sprite(this.cW / 2, 0, 'longNL')
          sSI.s.displayWidth = 10
          sSI.s.displayHeight = 5
          sSI.s.depth = -1
          sSI.startT = this.beatmap.objects[i].timing - 2000 / 1000
          for (let i0 = i; i0 < this.beatmap.objects.length; i0++) {
            if (this.beatmap.objects[i0].effect === this.beatmap.objects[i].effect ||
              this.beatmap.objects[i0].property === 'LongEnd' ||
              (this.beatmap.objects[i].effect === 'SlideStart_A' && this.beatmap.objects[i0].effect === 'SlideEnd_A') ||
              (this.beatmap.objects[i].effect === 'SlideStart_B' && this.beatmap.objects[i0].effect === 'SlideEnd_B')) {
              sSI.n1 = i0
              break
            }
          }
          this.sliderSprite[j] = sSI
          j++
        }
      }
      this.noteSprite[i] = nSI
    }
    // word
    this.testText = this.add.text(20, 15, 'FPS：计算中...', {
      fontStyle: '等线',
      fill: '#fff',
      fontSize: 100 + 'px'
    })
    // init time
    this.startT = Date.now()
    this.nowT = this.startT
  }
  countTime () {
    this.nowT = Date.now()// 获取当前时间
    this.totalT = this.nowT - this.startT // 计算经过时间
  }
  update () {
    this.lastT = this.nowT// 保存当前时间
    this.countFPS()
    // hit note
    for (let i = 0; i < this.noteSprite.length; i++) {
      // console.log(this.beatmap.objects[i])
      if (this.noteSprite[i].isHit === false && this.beatmap.objects[i].type === 'Object') {
        if (this.noteSprite[i].s !== null && (this.totalT / 1000) >= this.noteSprite[i].startT) {
          this.nowT = Date.now()// 获取当前时间
          this.totalT = this.nowT - this.startT // 计算经过时间
          // console.log(this.noteSprite[1].runT)
          this.noteSprite[i].runT = this.totalT / 1000 - this.noteSprite[i].startT
          if (this.noteSprite[i].s2 != null) {
            this.changeNoteSSX(i)
            this.noteSprite[i].s2.displayWidth = 4 + 1 * (this.noteSprite[i].s.y - 100) / 10
            this.noteSprite[i].s2.displayHeight = 2 + 0.5 * (this.noteSprite[i].s.y - 100) / 10
            this.noteSprite[i].s2.y = this.noteAppearHeight + (10 + 1000 * this.noteSprite[i].runT * this.speed) * 0.9
            this.noteSprite[i].s2.depth = 2
          }
          this.changeNoteX(i)
          this.noteSprite[i].s.displayWidth = 8 + 2 * (this.noteSprite[i].s.y - 100) / 10
          this.noteSprite[i].s.displayHeight = 4 + 1 * (this.noteSprite[i].s.y - 100) / 10
          this.noteSprite[i].s.y = this.noteAppearHeight + 10 + 1000 * this.noteSprite[i].runT * this.speed
          this.noteSprite[i].s.depth = 2
        }
        if (this.noteSprite[i].s !== null && this.beatmap.objects[i].timing <= this.totalT / 1000) {
          this.combo++
          // eslint-disable-next-line no-unused-expressions
          this.noteSprite[i].isHit = true
          this.noteSprite[i].s.depth = -1
          if (this.noteSprite[i].s2 !== null) {
            this.noteSprite[i].s2.depth = -1
          }
        }
      }
    }/*
    for (let i = 0; i < this.noteSprite.length; i++) {
      this.nowT = Date.now()// 获取当前时间
      this.totalT = this.nowT - this.startT // 计算经过时间
      if (this.sliderSprite[i].runT <= (this.totalT / 1000)) {
        // this.sliderSprite[i].s.depth = 0
        // this.sliderSprite[i].s.displayWidth=
      }
    } */
  }
  countFPS () {
    this.countTime()
    this.sumT += this.nowT - this.lastT
    this.frame++// 帧片数++
    if (this.sumT >= 998) { // 如果时间和大于1000ms
      this.testText.text = (this.totalT / 1000).toFixed(3) + '   ' + this.combo + '   ' + Math.floor(1000 / (this.sumT / this.frame)) + ' fps'
      this.frame = 0 // 标志位置0
      this.sumT = 0 // 时间和清零
    }
  }
  changeNoteX (i1) {
    switch (this.beatmap.objects[i1].lane) {
      case 1:
        this.noteSprite[i1].s.x = this.cW / 2 - 9 - 3 * this.k * this.noteSprite[i1].runT * this.speed
        break
      case 2:
        this.noteSprite[i1].s.x = this.cW / 2 - 6 - 2 * this.k * this.noteSprite[i1].runT * this.speed
        break
      case 3:
        this.noteSprite[i1].s.x = this.cW / 2 - 3 - this.k * this.noteSprite[i1].runT * this.speed
        break
      case 4:
        break
      case 5:
        this.noteSprite[i1].s.x = this.cW / 2 + 3 + this.k * this.noteSprite[i1].runT * this.speed
        break
      case 6:
        this.noteSprite[i1].s.x = this.cW / 2 + 6 + 2 * this.k * this.noteSprite[i1].runT * this.speed
        break
      case 7:
        this.noteSprite[i1].s.x = this.cW / 2 + 9 + 3 * this.k * this.noteSprite[i1].runT * this.speed
        break
    }
  }
  changeNoteSSX (i1) {
    switch (this.beatmap.objects[i1].lane) {
      case 1:
        this.noteSprite[i1].s2.x = this.cW / 2 - 9 - 3 * this.k * this.noteSprite[i1].runT * this.speed
        break
      case 2:
        this.noteSprite[i1].s2.x = this.cW / 2 - 6 - 2 * this.k * this.noteSprite[i1].runT * this.speed
        break
      case 3:
        this.noteSprite[i1].s2.x = this.cW / 2 - 3 - this.k * this.noteSprite[i1].runT * this.speed
        break
      case 4:
        break
      case 5:
        this.noteSprite[i1].s2.x = this.cW / 2 + 3 + this.k * this.noteSprite[i1].runT * this.speed
        break
      case 6:
        this.noteSprite[i1].s2.x = this.cW / 2 + 6 + 2 * this.k * this.noteSprite[i1].runT * this.speed
        break
      case 7:
        this.noteSprite[i1].s2.x = this.cW / 2 + 9 + 3 * this.k * this.noteSprite[i1].runT * this.speed
        break
    }
  }
}