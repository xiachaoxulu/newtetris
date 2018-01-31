import manager from '../GlobalEventManage'
import shapeManage from './shapeManage'
import Pixe from './Pixe'
import musicManage from './music'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let instance
let atlas = new Image()
atlas.src = 'images/Common.png'

/**
 * 游戏结束
 */
export default class GameInfo {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.musicManage = new musicManage()
        this.reset()
        /**
         * 重新开始按钮区域
         * 方便简易判断按钮点击
         */
        // console.log(Math.floor(screenHeight / 667))
        this.btnArea = {
            startX: 130 * window.globalMatrix.a,
            startY: 350 * window.globalMatrix.d + window.globalMatrix.f,
            endX: 250 * window.globalMatrix.a,
            endY: 390 * window.globalMatrix.d + window.globalMatrix.f
        }
        manager.on(this.btnArea, 'touchend', this.ontouchEnd.bind(this))
    }
    reset() {
        this.data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this.pixes = []
        this.data.forEach((row, rowIndex) => {
            let rowPixes = []
            row.forEach((column, columnIndex) => {
                rowPixes.push(new Pixe(250 + columnIndex * 18, 190 + rowIndex * 18, column !== 0 ? 1 : 0))
            })
            this.pixes.push(rowPixes)
        })
        this.speed = 60
        this.level = 1
        this.listners = {}
        this.rate = 100
        this.score = 0
    }
    ontouchEnd() {
        this.listners.touchEnd && this.listners.touchEnd()
    }
    addListner(listners) {
        this.listners = listners
    }
    removeListner() {
        this.listners = {}
    }
    renderGameOver(ctx) {
        ctx.save()
        ctx.drawImage(atlas, 0, 0, 119, 108, 40, 200, 300, 300)

        ctx.fillStyle = '#ffffff'
        ctx.font = '20px Arial'

        ctx.fillText('游戏结束', 150, 260)

        ctx.drawImage(atlas, 120, 6, 39, 24, 130, 350, 120, 40)
        ctx.textAlign = 'end'
        ctx.textBaseline = 'middle'
        ctx.fillText('重新开始', 230, 368)
        ctx.restore()
    }
    updateScore(removeRows, playVoice) {
        if (removeRows == 3) {
            removeRows = 4
        }
        if (removeRows == 4) {
            removeRows = 6
        }
        this.score += this.rate * removeRows
        if (playVoice) {
            this.musicManage.playBoom()
        }
        let _level = 1
        if (this.score >= 16000) {
            this.speed = 10
            _level = 7
        } else if (this.score >= 12000) {
            this.speed = 20
            _level = 6
        } else if (this.score >= 8000) {
            this.speed = 30
            _level = 5
        } else if (this.score >= 4000) {
            this.speed = 35
            _level = 4
        } else if (this.score >= 2000) {
            this.speed = 40
            _level = 3
        } else if (this.score >= 1000) {
            this.speed = 45
            _level = 3
        } else if (this.score >= 500) {
            this.speed = 50
            _level = 2
        }

        if (_level !== this.level) {
            this.level = _level
            if (playVoice) {
                this.musicManage.playLevel()
            }
        }
    }
    renderGameScore(ctx) {
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '20px Arial'
        ctx.fillText('SCORE', 245, 100)
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '16px Arial'
        ctx.textAlign = 'end'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.score, 314, 130)
        ctx.restore()
    }
    update(data) {
        this.pixes.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (data.data[rowIndex] != undefined && data.data[rowIndex][columnIndex] != undefined && data.data[rowIndex][columnIndex] !== 0) {
                    this.pixes[rowIndex][columnIndex].update(1)
                } else {
                    this.pixes[rowIndex][columnIndex].update(0)
                }
            })
        })
    }
    updateNext(data) {
        this.update(shapeManage.getNextShape())
    }
    renderNextShape(ctx) {
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '20px Arial'
        ctx.fillText('NEXT', 255, 170)
        ctx.restore()
        this.pixes.forEach(row => {
            row.forEach(column => {
                column.render(ctx)
            })
        })

        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '20px Arial'
        ctx.fillText('LEVEL', 255, 290)
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '16px Arial'
        ctx.textAlign = 'end'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.level, 314, 310)
        ctx.restore()

        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '20px Arial'
        ctx.fillText('SPEED', 255, 350)
        ctx.restore()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '16px Arial'
        ctx.textAlign = 'end'
        ctx.textBaseline = 'middle'
        ctx.fillText(this.speed, 314, 375)
        ctx.restore()
    }
}
