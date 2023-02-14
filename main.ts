let Intensity = 255
basic.forever(function () {
    basic.showLeds(`
        . # . # .
        . # . # .
        # . . . #
        . . # . .
        . . # . .
        `)
    basic.pause(100)
    basic.showLeds(`
        . # # # .
        . # # # .
        # . # . #
        . . . . .
        . . . . .
        `)
    basic.pause(100)
    Intensity += -10
})
