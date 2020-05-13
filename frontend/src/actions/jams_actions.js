import * as JamsAPIUtil from '../util/jam_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_JAMS = "RECEIVE_JAMS";
export const RECEIVE_JAM = "RECEIVE_JAM";

export const receiveJams = jams => ({
  type: RECEIVE_JAMS,
  jams
});

export const receiveJam = jam => ({
  type: RECEIVE_JAM,
  jam
})

export const fetchJams = () => (dispatch) => {
  return JamsAPIUtil.fetchJams()
    .then(jams => dispatch(receiveJams(jams)))
}

export const createJam = (jam) => (dispatch) => (
  JamsAPIUtil.createJam(jam)
    .then(jam => dispatch(receiveJam))
)