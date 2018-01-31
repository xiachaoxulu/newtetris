const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/**
 * 游戏背景类
 * 提供update和render函数实现背景
 */
export default class BackGround {
    constructor(ctx) {
        this.render(ctx)
    }
    render(ctx) {
        /**外边框 */

        ctx.save()
        ctx.lineJoin = 'round'
        ctx.lineWidth = 2

        ctx.strokeStyle = '#00a5b5'
        ctx.rect(40, 50, 300, 390)
        ctx.fillRect(40, 50, 300, 390)
        ctx.stroke()
        ctx.restore()

        /**内边框 */
        ctx.beginPath()
        ctx.save()
        ctx.lineWidth = 2
        ctx.strokeStyle = '#00b6be'
        ctx.shadowColor = 'rgba(0,0,0,.7)'
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1
        ctx.shadowBlur = 15
        ctx.fillStyle = '#9aaea3'
        ctx.rect(50, 60, 280, 370)
        ctx.fillRect(50, 60, 280, 370)
        ctx.stroke()
        ctx.restore()
    }
}
