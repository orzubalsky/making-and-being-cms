import _ from 'lodash'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import * as app from 'modules/app'
import { actionCreator } from 'utils/common.js'

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'NAVIGATION'
const UPDATE = `${MODULE}/UPDATED`
const UPDATE_NAV = `${MODULE}/NAV/UPDATED`
const UPDATE_PAGE = `${MODULE}/PAGE/UPDATED`
const UPDATE_PAGE_REQUESTED = `${MODULE}/PAGE/UPDATE/REQUESTED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const update = actionCreator(UPDATE, 'payload')
export const updateIsNavOpen = actionCreator(UPDATE_NAV, 'isOpen')
export const updatePage = actionCreator(UPDATE_PAGE, 'payload')
export const updatePageRequested = actionCreator(UPDATE_PAGE_REQUESTED, 'payload')

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE] : (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [UPDATE_NAV] : (state, action) => {
    return {
      ...state,
      isNavOpen: action.isOpen
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isNavOpen: false
}

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// ------------------------------------
// Selectors
// ------------------------------------
export const getModule = state => state.app.navigation
export const getProp = (state, prop, defaultVal) => _.get(getModule(state), prop, defaultVal)
export const getIsNavOpen = state => getProp(state, 'isNavOpen')
export const getLocation = state => _.get(state, 'router.location')
export const getPathname = state => _.get(getLocation(state), 'pathname')

// ------------------------------------
// Sagas
// ------------------------------------
export function * pageUpdated (action) {
  const { slug, type } = action.payload

  const items = yield select(type === 'chapter' ? app.getChapters : app.getSections)
  const item = _.find(items, i => i.slug === slug)

  yield put(app.updateItem({ item, options: { isExpanded: true }}))
}

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all({
    updatePage: takeEvery(UPDATE_PAGE_REQUESTED, pageUpdated)
  })
}
