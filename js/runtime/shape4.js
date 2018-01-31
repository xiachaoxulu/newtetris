export default class Shape4 {
    /**
     *   *
     *   ****
     */

    constructor(row, column) {
        this.position = {}
        this.position.row = 1
        this.position.column = 5
        this.keyPixe = {
            row: 1,
            column: 1
        }
        this.size = {
            row: 2,
            column: 3
        }
        this.data = [[1, 0, 0], [1, 1, 1]]
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
            row: 3,
            column: 2
        }
        this.data = [[1, 1], [1, 0], [1, 0]]
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
            row: 2,
            column: 3
        }
        this.data = [[1, 1, 1], [0, 0, 1]]
    }
    transform270Deg(isInit) {
        if (isInit) {
            this.position.row = 2
            this.position.column = 5
        }
        this.keyPixe = {
            row: 1,
            column: 1
        }
        this.size = {
            row: 3,
            column: 2
        }
        this.data = [[0, 1], [0, 1], [1, 1]]
    }
    transform360Deg(isInit) {
        if (isInit) {
            this.position.row = 1
            this.position.column = 5
        }
        this.keyPixe = {
            row: 1,
            column: 1
        }
        this.size = {
            row: 2,
            column: 3
        }
        this.data = [[1, 0, 0], [1, 1, 1]]
    }
}
