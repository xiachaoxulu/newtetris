import manager from '../GlobalEventManage'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class CircularButton {
    // 坐标x
    x = 0
    // 坐标y
    y = 0
    // 半径r
    r = 0
    // 状态  0:正常状态 1:active
    statu = 0
    // 文本
    text = ''
    listners = {}
    /**
     *
     * @param {*} x 坐标x
     * @param {*} y 坐标y
     * @param {*} r 半径r
     */
    constructor(x, y, r, text, listners) {
        this.x = x
        this.y = y
        this.r = r
        this.text = text
        this.listners = listners || {}
        let area = this.area()
        manager.on(area, 'touchstart', this.ontouchStart.bind(this))
        manager.on(area, 'touchend', this.ontouchEnd.bind(this))
    }
    ontouchStart() {
        this.statu = 1
        this.listners.touchStart && this.listners.touchStart()
    }
    ontouchEnd() {
        this.statu = 0
        this.listners.touchEnd && this.listners.touchEnd()
    }
    area() {
        return {
            startX: (this.x - this.r) * window.globalMatrix.a,
            startY: (this.y - this.r) * window.globalMatrix.d + window.globalMatrix.f,
            endX: (this.x - this.r + 2 * this.r) * window.globalMatrix.a,
            endY: (this.y - this.r + 2 * this.r) * window.globalMatrix.d + window.globalMatrix.f
        }
    }
    render(ctx) {
        ctx.beginPath()
        ctx.save()
        ctx.fillStyle = '#ffe640'
        ctx.shadowColor = 'rgba(0,0,0,.5)'
        if (this.statu === 1) {
            ctx.shadowOffsetX = 2
            ctx.shadowOffsetY = 2
            ctx.shadowBlur = 30
        } else {
            ctx.shadowOffsetX = 2
            ctx.shadowOffsetY = 2
            ctx.shadowBlur = 15
        }

        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.restore()
        // 文本
        ctx.save()
        ctx.font = '20px Arial'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.fillText(this.text, this.x, this.y)
        ctx.restore()
    }
}
