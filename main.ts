function Soft_Left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
}
function distance_to_stop () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
    basic.pause(100)
    while (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function Hard_Left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 60)
    basic.pause(500)
}
function AllAhead () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
}
function Soft_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
}
function Hard_Right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
    basic.pause(500)
}
function Avoid () {
    avoiding_protocol = 1
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
    basic.pause(500)
    Hard_Right()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
    basic.pause(200)
    while (avoiding_protocol == 1) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 20) {
            Hard_Right()
        } else {
            Soft_Left()
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            avoiding_protocol = 0
            Hard_Right()
            Right = 0
        }
    }
}
let LFSR = 0
let LFSL = 0
let avoiding_protocol = 0
let Right = 0
Right = 0
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        Avoid()
    }
    LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (LFSL == 0 && LFSR == 0) {
        AllAhead()
        if (Right) {
            Right = 0
        }
    } else if (LFSL == 1) {
        Soft_Right()
        Right = 1
    } else if (LFSR == 1) {
        Soft_Left()
        Right = 0
    } else {
        if (Right) {
            Soft_Left()
        } else {
            Soft_Right()
        }
    }
})
