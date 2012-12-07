var packer = new (require('./packer'))()
, Canvas = require('canvas')

module.exports = function(images) {
    var pieces = images.map(function(i) {
        return { image: i, width: i.width, height: i.height }
    })
    , packed = packer.pack(pieces)
    , canvas = new Canvas(packed.width, packed.height)
    , context = canvas.getContext('2d')

    pieces.forEach(function(sprite) {
        context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height)
    })

    return {
        pieces: pieces.map(function(p) {
            return {
                x: p.x,
                y: p.y,
                width: p.width,
                height: p.height,
                image: p.image
            }
        }),

        puzzle: canvas
    }
}