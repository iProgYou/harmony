import * as JamsAPIUtil from '../util/jam_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_JAMS = "RECEIVE_JAMS";


export const receiveJams = jams => ({
  type: RECEIVE_JAMS,
  jams
});

export const fetchJams = () => (dispatch) => {
  return JamsAPIUtil.fetchJams()
    .then(jams => dispatch(receiveJams(jams)))
}