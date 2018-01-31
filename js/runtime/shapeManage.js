import shape1 from './shape1'
import shape2 from './shape2'
import shape3 from './shape3'
import shape4 from './shape4'
import shape5 from './shape5'
import shape6 from './shape6'
import shape7 from './shape7'
let nextShape = null
let currentShape = null
class ShapeManage {
    constructor() {}

    createShape() {
        if (currentShape == null && nextShape == null) {
            currentShape = this._createShape()
            nextShape = this._createShape()
        }
        if (currentShape == null && nextShape != null) {
            currentShape = nextShape
            nextShape = this._createShape()
        }
        return currentShape
    }
    _createShape() {
        let num = Math.ceil(Math.random() * 7)
        let shape
        switch (num) {
            case 1:
                shape = new shape1()
                break
            case 2:
                shape = new shape2()
                break
            case 3:
                shape = new shape3()
                break
            case 4:
                shape = new shape4()
                break
            case 5:
                shape = new shape5()
                break
            case 6:
                shape = new shape6()
                break
            case 7:
                shape = new shape7()
                break
        }
        let deg = Math.ceil(Math.random() * 4)
        shape.deg = deg
        this._rotate(deg, shape, true)
        return shape
    }
    dispose() {
        currentShape = null
    }
    _rotate(deg, shape, isInit) {
        switch (deg) {
            case 1:
                shape.transform360Deg(isInit)
                break
            case 2:
                shape.transform90Deg(isInit)
                break
            case 3:
                shape.transform180Deg(isInit)
                break
            case 4:
                shape.transform270Deg(isInit)
                break
        }
    }
    rotate(rotateDirection) {
        if (currentShape !== null) {
            if (rotateDirection === 0) {
                currentShape.deg += 1

                if (currentShape.deg > 4) {
                    currentShape.deg = 1
                }
                this._rotate(currentShape.deg, currentShape, false)
            } else {
                currentShape.deg -= 1

                if (currentShape.deg < 1) {
                    currentShape.deg = 4
                }
                this._rotate(currentShape.deg, currentShape, false)
            }
        }
    }
    getNextShape() {
        return nextShape
    }
}
let manager = new ShapeManage()
export default manager
