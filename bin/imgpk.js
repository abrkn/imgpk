if (process.argv.length < 4) {
    return console.log('Pack the specified images\nUsage: imgpk output.png input1.jpg input2.png')
}

var imgpk = require('../lib/imgpk')
, Canvas = require('canvas')
, path = require('path')
, fs = require('fs')
, sources = process.argv.slice(3).map(function(x) {
    var img = new Canvas.Image()
    img.src = fs.readFileSync(x)
    img.sourceFileName = x
    return img
})
, packed = imgpk(sources)

fs.writeFileSync(process.argv[2], packed.puzzle.toBuffer())

console.log(JSON.stringify(packed.pieces.map(function(p) {
    return {
        x: p.x,
        y: p.y,
        width: p.width,
        height: p.height,
        filename: p.image.sourceFileName
    }
}), null, 4))