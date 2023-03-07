let avoiding_protocol = 0
let LFSL = 0
let LFSR = 0
function Soft_Left () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 35)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 35)
    basic.pause(100)
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
function Avoid () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 60)
    basic.pause(100)
    Hard_Right()
    while (avoiding_protocol == 1) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
            Soft_Right()
        } else {
            Soft_Left()
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            avoiding_protocol = 0
            Hard_Right()
        }
    }
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        distance_to_stop()
    }
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
