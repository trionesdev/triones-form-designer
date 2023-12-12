export interface IPoint {
    x: number
    y: number
}

export class Point implements IPoint {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export interface IRect {
    x: number
    y: number
    width: number
    height: number
}

export class Rect implements IRect {
    x = 0
    y = 0
    width = 0
    height = 0

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    get left() {
        return this.x
    }

    get right() {
        return this.x + this.width
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.height
    }
}

/**
 * 判断点是否在矩形的靠后位置
 * @param point
 * @param rect
 * @param inline
 */
export function isNearAfter(point: IPoint, rect: IRect, inline = false) {
    if (inline) {
        return (
            Math.abs(point.x - rect.x) + Math.abs(point.y - rect.y) >
            Math.abs(point.x - (rect.x + rect.width)) +
            Math.abs(point.y - (rect.y + rect.height))
        )
    }
    return Math.abs(point.y - rect.y) > Math.abs(point.y - (rect.y + rect.height))
}

export function isPointInRect(point: IPoint, rect: IRect, sensitive = true) {
    const boundSensor = (value: number) => {
        if (!sensitive) return 0
        const sensor = value * 0.1
        if (sensor > 20) return 20
        if (sensor < 10) return 10
        return sensor
    }

    return (
        point.x >= rect.x + boundSensor(rect.width) &&
        point.x <= rect.x + rect.width - boundSensor(rect.width) &&
        point.y >= rect.y + boundSensor(rect.height) &&
        point.y <= rect.y + rect.height - boundSensor(rect.height)
    )
}