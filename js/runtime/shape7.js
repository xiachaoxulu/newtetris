export default class Shape7 {
    /**
     *  方块
     *   *
     *   *
     *   *
     *   *
     */

    constructor(position_row, position_column) {
        this.position = {}
        this.position.row = 0
        this.position.column = 4
        this.keyPixe = {
            row: 0,
            column: 1
        }
        this.size = {
            row: 1,
            column: 4
        }
        this.data = [[1, 1, 1, 1]]
    }
    transform90Deg(isInit) {
        if (isInit) {
            this.position.row = 1
            this.position.column = 4
        }
        this.keyPixe = {
            row: 1,
            column: 0
        }
        this.size = {
            row: 4,
            column: 1
        }
        this.data = [[1], [1], [1], [1]]
    }
    transform180Deg(isInit) {
        if (isInit) {
            this.position.row = 0
            this.position.column = 4
        }
        this.keyPixe = {
            row: 0,
            column: 1
        }
        this.size = {
            row: 1,
            column: 4
        }
        this.data = [[1, 1, 1, 1]]
    }
    transform270Deg(isInit) {
        if (isInit) {
            this.position.row = 1
            this.position.column = 4
        }
        this.keyPixe = {
            row: 1,
            column: 0
        }
        this.size = {
            row: 4,
            column: 1
        }
        this.data = [[1], [1], [1], [1]]
    }
    transform360Deg(isInit) {
        if (isInit) {
            this.position.row = 0
            this.position.column = 4
        }
        this.keyPixe = {
            row: 0,
            column: 1
        }
        this.size = {
            row: 1,
            column: 4
        }
        this.data = [[1, 1, 1, 1]]
    }
}
