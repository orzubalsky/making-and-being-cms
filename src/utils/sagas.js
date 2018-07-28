import _ from 'lodash'
import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { log } from 'utils/common'

export function * apiCall (payload, actions = {}) {
  // should we force calls to the non cached api?
  // we do this when primary api url fails
  const isForceSecondaryAPI = _.get(payload, 'isForceSecondaryAPI', false)
  const data = _.get(payload, 'data', {})

  const { api, success, saga } = actions

  if (!isForceSecondaryAPI) {
    try {
      const result = yield call(api, { data, isForceSecondaryAPI })

      yield call(success, { ...result })
    } catch (error) {
      yield call(handleFailure, { ...error, saga: saga, isForceSecondaryAPI })
    }
  }
}

export function * validResponse (response) {
  if (response.errors) {
    log(response.errors)
  }

  if (response.data) {
    return response.data
  }
}

export function * handleFailure (response) {
  log('Error', response)

  // after 2 failed attempts, redirect to homepage
  if (_.get(response, 'error.isForceSecondaryAPI')) {
    yield put(push({ pathname: '/' }))
  }

  // try again with secondary api call
  yield put(response.saga({ isForceSecondaryAPI: true }))
}
