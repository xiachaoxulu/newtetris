export default class Shape1 {
    /**
     *  方块
     *   *****
     *   *****
     *   *****
     */

    constructor(position_row, position_column) {
        this.position = {}
        this.position.row = 1
        this.position.column = 5
        this.keyPixe = {
            row: 1,
            column: 1
        }
        this.size = {
            row: 2,
            column: 2
        }
        this.data = [[1, 1], [1, 1]]
    }
    transform90Deg() {}
    transform180Deg() {}
    transform270Deg() {}
    transform360Deg() {}
}
