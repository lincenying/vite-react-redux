import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import api from '@/api'
import { errConfig } from '../global'

const initStates = fromJS({
    data: [],
    hasNext: 0,
    page: 1,
    path: ''
})

const reducers = {
    ['receiveTopics']: (state, action) => {
        const { data, page, pathname } = action
        const lists = page === 1 ? [].concat(data) : state.toJS().data.concat(data)
        return state.merge({
            data: lists,
            page,
            pathname
        })
    }
}

export const getTopics = config => {
    return async dispatch => {
        const { data, success } = await api.get('/api/v1/topics', config)
        if (success === true) {
            return dispatch({
                type: 'receiveTopics',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export default createReducer(initStates, reducers)
