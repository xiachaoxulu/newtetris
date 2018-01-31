let instance

/**
 * 全局事件派发
 */
class GlobalEventManage {
    /**
     * 舞台
     */
    stage
    constructor(stage) {
        if (instance) {
            return instance
        }
        this.spotsMap = new Map()
        this.stage = stage

        instance = this
        this.init()
    }
    init() {
        if (this.stage) {
            this.stage.addEventListener('touchstart', e => {
                if (e.targetTouches.length > 0) {
                    this.dispatch(
                        'touchstart',
                        e.targetTouches[0].pageX,
                        e.targetTouches[0].pageY,
                        e
                    )
                }
            })
            this.stage.addEventListener('touchmove', e => {
                if (e.targetTouches.length > 0) {
                    this.dispatch(
                        'touchmove',
                        e.targetTouches[0].pageX,
                        e.targetTouches[0].pageY,
                        e
                    )
                }
            })
            this.stage.addEventListener('touchend', e => {
                if (e.changedTouches.length > 0) {
                    this.dispatch(
                        'touchend',
                        e.changedTouches[0].pageX,
                        e.changedTouches[0].pageY,
                        e
                    )
                }
            })
        }
    }
    wrapCurrenEvent(area) {
        if (area.currentEventName !== undefined) {
            return
        }
        let _currentEventName = ''
        Object.defineProperty(area, 'currentEventName', {
            set: val => {
                _currentEventName = val
                // 触发事件
                this.spotsMap.get(area).forEach(item => {
                    if (item.targetEventName === _currentEventName) {
                        item.fun()
                    }
                })
            },
            get: () => {
                return _currentEventName
            }
        })
    }
    /**
     *
     * @param {*} eventName  事件名
     * @param {*} area 区域
     * @param {*} fun 回调函数
     */
    on(area, eventName, fun) {
        this.wrapCurrenEvent(area)
        if (this.spotsMap.has(area)) {
            let targets = this.spotsMap.get(area)
            targets.push({
                targetEventName: eventName,
                fun: fun
            })
            this.spotsMap.set(area, targets)
        } else {
            this.spotsMap.set(area, [
                {
                    targetEventName: eventName,
                    fun: fun
                }
            ])
        }
    }
    dispatch(oEventName, x, y, e) {
        for (const spot of this.spotsMap.keys()) {
            if (oEventName === 'touchmove') {
                if (
                    x >= spot.startX &&
                    x <= spot.endX &&
                    y >= spot.startY &&
                    y <= spot.endY
                ) {
                    if (
                        spot.currentEventName === '' ||
                        spot.currentEventName === 'touchend'
                    ) {
                        spot.currentEventName = 'touchstart'
                    } else {
                        spot.currentEventName = 'touchmove'
                    }
                } else {
                    if (spot.currentEventName === 'touchmove') {
                        spot.currentEventName = 'touchend'
                    }
                }
            } else {
                if (
                    x >= spot.startX &&
                    x <= spot.endX &&
                    y >= spot.startY &&
                    y <= spot.endY
                ) {
                    spot.currentEventName = oEventName
                }
            }
        }
    }
}
let manager = new GlobalEventManage(canvas)
export default manager
