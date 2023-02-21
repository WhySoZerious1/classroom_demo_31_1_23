function Soft_Left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 35)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 35)
    basic.pause(100)
}
function Hard_Left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 60)
    basic.pause(100)
}
function AllAhead () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
}
function Soft_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 35)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 35)
    basic.pause(100)
}
function Hard_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
    basic.pause(100)
}
let LFSR = 0
let LFSL = 0
let Intensity = 255
basic.forever(function () {
    LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (LFSL == 1 && LFSR == 1) {
        AllAhead()
    } else if (LFSL == 1) {
        Soft_Left()
    } else if (LFSR == 1) {
        Soft_Right()
    } else {
        AllAhead()
    }
})
