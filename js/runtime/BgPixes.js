import Pixe from './Pixe'

export default class BgPixes {
    constructor(data, startX, startY) {
        // 二维数组
        this.data = data
        this.startX = startX
        this.startY = startY
        this.pixes = []
        this.init()
    }
    update(data) {
        this.pixes.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (data[rowIndex][columnIndex] !== 0) {
                    this.pixes[rowIndex][columnIndex].update(1)
                } else {
                    this.pixes[rowIndex][columnIndex].update(0)
                }
            })
        })
    }
    init() {
        this.data.forEach((row, rowIndex) => {
            let rowPixes = []
            row.forEach((column, columnIndex) => {
                rowPixes.push(
                    new Pixe(
                        this.startX + columnIndex * 18,
                        this.startY + rowIndex * 18,
                        column !== 0 ? 1 : 0
                    )
                )
            })
            this.pixes.push(rowPixes)
        })
    }
    render(ctx) {
        this.pixes.forEach(row => {
            row.forEach(column => {
                column.render(ctx)
            })
        })
    }
}
