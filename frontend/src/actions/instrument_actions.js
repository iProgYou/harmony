export const RECEIVE_INSTRUMENT = "RECEIVE_INSTRUMENT"


export const receiveInstrument = instrument => {

    return {
        type: RECEIVE_INSTRUMENT,
        instrument
    }

}