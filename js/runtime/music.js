let instance

/**
 * 统一的音效管理器
 */
export default class Music {
    constructor() {
        if (instance) return instance

        instance = this

        this.bgmAudio = new Audio()
        this.bgmAudio.loop = true
        this.bgmAudio.src = 'audio/music.mp3'

        this.hitAudio = new Audio()
        this.hitAudio.src = 'audio/hit.mp3'

        this.levelAudio = new Audio()
        this.levelAudio.src = 'audio/level.mp3'

        this.lineAudio = new Audio()
        this.lineAudio.src = 'audio/line.mp3'

        this.boomAudio = new Audio()
        this.boomAudio.src = 'audio/boom.mp3'
        wx.onShow(() => {
            this.bgmAudio.play()
        })
        wx.onAudioInterruptionEnd(() => {
            this.bgmAudio.play()
        })
        this.playBgm()
    }

    playBgm() {
        this.bgmAudio.play()
    }

    playHit() {
        this.hitAudio.currentTime = 0
        this.hitAudio.volume = 0.5
        this.hitAudio.play()
    }

    playLine() {
        this.lineAudio.currentTime = 0
        this.hitAudio.volume = 0.5
        this.lineAudio.play()
    }

    playLevel() {
        this.levelAudio.currentTime = 0
        this.hitAudio.volume = 0.5
        this.levelAudio.play()
    }

    playBoom() {
        this.boomAudio.currentTime = 0
        this.boomAudio.play()
    }
}
