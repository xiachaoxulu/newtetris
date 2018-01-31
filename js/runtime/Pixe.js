export default class Pixe {
    // x坐标
    x = 0
    // y坐标
    y = 0
    // 尺寸
    size = 14
    // 类型
    type = 0
    constructor(x, y, type = 0) {
        this.x = x
        this.y = y
        this.type = type
    }
    update(type) {
        this.type = type
    }
    render(ctx) {
        ctx.beginPath()
        ctx.save()
        if (this.type === 0) {
            ctx.strokeStyle = '#8e9d94'
        } else {
            ctx.strokeStyle = '#000'
        }
        ctx.rect(this.x, this.y, this.size, this.size)
        ctx.stroke()
        ctx.restore()

        ctx.beginPath()
        ctx.save()
        if (this.type === 0) {
            ctx.fillStyle = '#8e9d94'
        } else {
            ctx.fillStyle = '#000'
        }
        ctx.fillRect(this.x + 3, this.y + 3, this.size - 6, this.size - 6)
        // console.log(11)
        ctx.restore()
    }
}
