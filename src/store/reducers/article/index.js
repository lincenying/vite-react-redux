import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '@/api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: {},
    pathname: ''
})

const reducers = {
    ['receiveArticle']: (state, action) => {
        const { data, pathname } = action
        return state.merge({
            data,
            pathname
        })
    }
}

export const getArticle = config => {
    return async dispatch => {
        const { data, success } = await api.get('/api/v1/topic/' + config.id)
        if (success === true) {
            return dispatch({
                type: 'receiveArticle',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
