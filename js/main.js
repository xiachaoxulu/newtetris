import BackGround from './runtime/background'
import CircularButton from './runtime/CircularButton'
import manager from './GlobalEventManage'
import shapeManage from './runtime/shapeManage'
import BgPixes from './runtime/BgPixes'
import GameInfo from './runtime/gameInfo'
import musicManage from './runtime/music'
let ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        wx.onShow(this.onShow.bind(this))
        this.caculateGlobalMatrix()
        // 旋转方向 0 顺时针 1 逆时针
        this.playVoice = true
        this.rotateDirection = 0
        this.gameOver = false
        this.pause = false
        // 是否暂停生成方块
        this.createShapePause = false
        this.frame = 0
        this.rows = 20
        this.columns = 10
        this.startX = 60
        this.startY = 68
        this.init()
    }
    caculateGlobalMatrix() {
        let scaleRadio = +(canvas.width / 375).toFixed(2)
        window.globalMatrix = {
            b: 0,
            c: 0,
            e: 0,
            f: 0
        }
        window.globalMatrix.a = scaleRadio
        window.globalMatrix.d = scaleRadio
        if (ctx.canvas.height - scaleRadio * 667 > 10) {
            window.globalMatrix.f = Math.floor((ctx.canvas.height - scaleRadio * 667) / 2)
        }
    }
    onShow() {
        if (this.gameOver) {
            this.loop()
        }
    }
    init() {
        this.musicManage = new musicManage()
        this.GameInfo = new GameInfo()
        this.bg = new BackGround(ctx, this.rows, this.columns, this.startX, this.startY)
        this.buttons = []
        this.buttons.push(
            new CircularButton(110, 480, 35, '声音', {
                touchEnd: this.upButtonTouchEnd.bind(this)
            })
        )
        this.buttons.push(
            new CircularButton(50, 550, 35, '左', {
                touchEnd: this.leftButtonTouchEnd.bind(this)
            })
        )
        this.buttons.push(
            new CircularButton(170, 550, 35, '右', {
                touchEnd: this.rightButtonTouchEnd.bind(this)
            })
        )
        this.buttons.push(
            new CircularButton(110, 620, 35, '下', {
                touchEnd: this.bottomButtonTouchEnd.bind(this)
            })
        )
        this.buttons.push(
            new CircularButton(300, 550, 45, '旋转', {
                touchEnd: this.rotateButtonTouchEnd.bind(this)
            })
        )
        /**
         * 真实像素数组
         */
        this.base = []

        for (let row = 0; row < this.rows; row++) {
            let realrowPixes = []
            for (var column = 0; column < this.columns; column++) {
                realrowPixes.push(0)
            }
            this.base.push(realrowPixes)
        }
        this.bgPixes = new BgPixes(this.base, this.startX, this.startY)

        window.requestAnimationFrame(this.loop.bind(this), canvas)
    }
    upButtonTouchEnd() {
        this.playVoice = !this.playVoice
    }
    restartButtonClick() {
        this.GameInfo.removeListner()
        this.GameInfo.reset()
        this.gameOver = false
        this.pause = false
        this.frame = 0
        this.currentShape = null
        shapeManage.dispose()
        this.base = []
        for (let row = 0; row < this.rows; row++) {
            let realrowPixes = []
            for (var column = 0; column < this.columns; column++) {
                realrowPixes.push(0)
            }
            this.base.push(realrowPixes)
        }
        this.bgPixes = new BgPixes(this.base, this.startX, this.startY)

        this.loop()
    }

    leftButtonTouchEnd() {
        if (this.currentShape) {
            if (this.playVoice) {
                this.musicManage.playHit()
            }
            this.currentShape.position.column -= 1
            let flag = this.checkMerge()
            if (!flag) {
                this.currentShape.position.column += 1
            } else {
                this.mergeBase(2)
            }
        }
    }

    rightButtonTouchEnd() {
        if (this.currentShape) {
            if (this.playVoice) {
                this.musicManage.playHit()
            }
            this.currentShape.position.column += 1
            let flag = this.checkMerge()
            if (!flag) {
                this.currentShape.position.column -= 1
            } else {
                this.mergeBase(2)
            }
        }
    }

    bottomButtonTouchEnd() {
        if (this.currentShape) {
            if (this.playVoice) {
                this.musicManage.playLine()
            }
            this.currentShape.position.row += 1
            let flag = this.checkMerge()
            if (!flag) {
                this.currentShape.position.row -= 1
                this.mergeBase(1)
                this.CalculaScore()
                this.currentShape = null
                shapeManage.dispose()
            } else {
                this.mergeBase(2)
                while (flag) {
                    this.currentShape.position.row += 1
                    flag = this.checkMerge()
                    if (!flag) {
                        this.currentShape.position.row -= 1
                        this.mergeBase(1)
                        this.CalculaScore()
                        this.currentShape = null
                        shapeManage.dispose()
                    } else {
                        this.mergeBase(2)
                    }
                }
            }
        }
    }

    rotateButtonTouchEnd() {
        if (this.currentShape) {
            if (this.playVoice) {
                this.musicManage.playHit()
            }
            if (this.rotateDirection === 0) {
                shapeManage.rotate(this.rotateDirection)
                let flag = this.checkMerge()
                if (!flag) {
                    shapeManage.rotate(this.rotateDirection === 0 ? 1 : 0)
                } else {
                    this.mergeBase(2)
                }
            }
        }
    }
    /**
     * 消减并计算分数
     */
    CalculaScore() {
        let compeleRows = 0
        let length = this.base.length
        for (let row = length - 1; row > 0; row--) {
            let flag = true
            for (let column = 0; column < this.base[row].length; column++) {
                if (this.base[row][column] === 0) {
                    flag = false
                }
            }
            if (flag) {
                compeleRows++
                this.base.splice(row, 1)
            }
        }
        let self = this
        function createNewRow() {
            let initRow = []
            for (let index = 0; index < self.columns; index++) {
                initRow.push(0)
            }
            return initRow
        }

        for (let index = 0; index < compeleRows; index++) {
            this.base.unshift(createNewRow())
        }
        if (compeleRows > 0) {
            this.GameInfo.updateScore(compeleRows, this.playVoice)
        }
    }
    /**
     * 创建新的方块
     */
    ShapeMove() {
        // console.log(this.frame)
        // 如果当前没有活动的方块则生成新的
        if (!this.currentShape) {
            this.currentShape = shapeManage.createShape()
            // 更新下一个信息
            this.GameInfo.updateNext(shapeManage.getNextShape())
            // 检查是否游戏结束
            let flag = this.checkMerge()
            // 更新base数组
            this.mergeBase(2)
            if (!flag) {
                this.gameOver = true
            }
        } else if (this.currentShape && this.frame % this.GameInfo.speed == 0) {
            // 检查是否可以向下移动
            //目标位置 行索引+1

            this.currentShape.position.row += 1
            let flag = this.checkMerge()

            // 不能进行移动,则更新base数组这块区域为1
            if (!flag) {
                this.currentShape.position.row -= 1
                this.mergeBase(1)
                this.CalculaScore()
                this.currentShape = null
                shapeManage.dispose()
            } else {
                this.mergeBase(2)
            }
        }
    }
    indexTransform(Index, type) {
        if (type === 'row') {
            return Index - this.currentShape.position.row + this.currentShape.keyPixe.row
        } else {
            return Index - this.currentShape.position.column + this.currentShape.keyPixe.column
        }
    }
    /**
     * 检查是否能合并
     */
    checkMerge() {
        let startRowIndex = this.currentShape.position.row - this.currentShape.keyPixe.row
        let endRowIndex = startRowIndex + this.currentShape.size.row - 1
        let startColumnIndex = this.currentShape.position.column - this.currentShape.keyPixe.column
        let endColumnIndex = startColumnIndex + this.currentShape.size.column - 1
        if (startRowIndex > endRowIndex || startColumnIndex > endColumnIndex) {
            return false
        }
        if (startRowIndex < 0 || endRowIndex > this.rows - 1 || startColumnIndex < 0 || endColumnIndex > this.columns - 1) {
            return false
        }
        let mergeSource = this.currentShape.data
        for (let row = startRowIndex; row <= endRowIndex; row++) {
            for (let column = startColumnIndex; column <= endColumnIndex; column++) {
                if (mergeSource[this.indexTransform(row, 'row')][this.indexTransform(column, 'column')] === 1 && this.base[row][column] === 1) {
                    return false
                }
            }
        }
        return true
    }
    /**
     * 合并方块到base上
     * @param {*} startRowIndex
     * @param {*} endRowIndex
     * @param {*} startColumnIndex
     * @param {*} endColumnIndex
     * @param {*} type  如果方块还能移动则更新的值为2,不能移动为1
     */
    mergeBase(type) {
        let startRowIndex = this.currentShape.position.row - this.currentShape.keyPixe.row
        let endRowIndex = startRowIndex + this.currentShape.size.row - 1
        let startColumnIndex = this.currentShape.position.column - this.currentShape.keyPixe.column
        let endColumnIndex = startColumnIndex + this.currentShape.size.column - 1
        // 擦除所有为2的方块
        for (let row = 0; row < this.rows; row++) {
            for (var column = 0; column < this.columns; column++) {
                if (this.base[row][column] === 2) {
                    this.base[row][column] = 0
                }
            }
        }
        let mergeSource = this.currentShape.data
        for (let row1 = startRowIndex; row1 <= endRowIndex; row1++) {
            for (let column1 = startColumnIndex; column1 <= endColumnIndex; column1++) {
                let transformRowIndex = this.indexTransform(row1, 'row')
                let transformColumnIndex = this.indexTransform(column1, 'column')
                if (mergeSource[transformRowIndex][transformColumnIndex] === 1) {
                    this.base[row1][column1] = type
                }
            }
        }
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = '#00b4c2'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.transform(window.globalMatrix.a, window.globalMatrix.b, window.globalMatrix.c, window.globalMatrix.d, window.globalMatrix.e, window.globalMatrix.f)
        this.bg.render(ctx)
        /** 按钮 */
        this.buttons.forEach(item => {
            item.render(ctx)
        })
        this.bgPixes.render(ctx)
        this.GameInfo.renderGameScore(ctx)
        this.GameInfo.renderNextShape(ctx)
        if (this.gameOver) {
            this.GameInfo.addListner({
                touchEnd: this.restartButtonClick.bind(this)
            })
            this.GameInfo.renderGameOver(ctx)
        }
    }

    // 游戏逻辑更新主函数
    update() {
        // 方块移动
        this.ShapeMove()
        // console.log(this.base)
        this.bgPixes.update(this.base)
    }

    // 实现游戏帧循环
    loop() {
        if (this.frame === this.GameInfo.speed * 5) {
            this.frame = 0
        }

        this.frame++
        this.update()
        this.render()
        if (this.gameOver) {
            return
        }
        window.requestAnimationFrame(this.loop.bind(this), canvas)
    }
}
