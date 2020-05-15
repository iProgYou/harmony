import { RECEIVE_INSTRUMENT} from '../../actions/instrument_actions'



const instrumentsReducer = (state = { instruments: ["keyboard", "piano", "drums", "bass"] }, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_INSTRUMENT:
            let newState = {...state}
            let newInstruments = newState.instruments.filter(instrument => instrument !== action.instrument  )
            return Object.assign({}, {instruments: newInstruments} )
            break;
        default:
            return state
            break;
    }

}


export default instrumentsReducer