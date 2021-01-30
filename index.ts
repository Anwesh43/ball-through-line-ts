const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 4.9
const circleRFactor : number = 15.9
const delay : number = 20 
const colors : Array<string> = [
    "#f44336",
    "#0D47A1",
    "#FF5722",
    "#004D40",
    "#0D47A1"
]
const backColor : string = "#bdbdbd"
const lines : number = 5 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawBallThroughLine(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const lineSize : number = Math.min(w, h) / sizeFactor 
        const r : number = Math.min(w, h) / circleRFactor 
        const gap : number = 2.5 * r 
        context.save()
        context.translate(w / 2 - gap * (lines / 2), h / 2)
        for (var j = 0; j < lines; j++) {
            context.save()
            context.translate(gap * j, 0)
            DrawingUtil.drawLine(context, 0, 0, 0, -lineSize * sf1)
            DrawingUtil.drawCircle(context, 0, -lineSize + (lineSize + r) * sf3, r * sf2)
            context.restore()
        }
        context.restore() 
    }

    static drawBTLNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.fillStyle = colors[i]
        context.strokeStyle = colors[i]
        DrawingUtil.drawBallThroughLine(context, scale)
    }
}