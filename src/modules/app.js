import _ from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import * as navigation from 'modules/navigation'
import { actionCreator } from 'utils/common'
import { apiCall, validResponse } from 'utils/sagas'
import { fetchChapters } from 'utils/api'
import { TYPES, VIDEO, PODCAST, ASSIGNMENT, ACTIVITY, CHAPTER, EVENT } from 'utils/types'

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'APP'

const FETCH_REQUESTED = `${MODULE}/FETCH/REQUESTED`
const MOUNT_REQUESTED = `${MODULE}/MOUNT/REQUESTED`
const UPDATE = `${MODULE}/UPDATED`
const UPDATE_ITEMS = `${MODULE}/ITEMS/UPDATED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const fetchRequested = actionCreator(FETCH_REQUESTED, 'payload')
export const mountRequested = actionCreator(MOUNT_REQUESTED, 'payload')
export const update = actionCreator(UPDATE, 'payload')
export const updateItems = actionCreator(UPDATE_ITEMS, 'payload')

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
  [UPDATE_ITEMS] : (state, action) => {
    const { chapters } = action.payload

    // reusable utility function that adds meta data about content type,
    // and chapter information for each content element. Maintains uniform object shape.
    const assignMetadata = (object, chapter, type) => {
      const types = {
        chapters: TYPES.CHAPTER,
        video: TYPES.VIDEO,
        podcast : TYPES.PODCAST,
        assignments: TYPES.ASSIGNMENT,
        activities: TYPES.ACTIVITY,
        events: TYPES.EVENT
      }

      return {
        ...object,
        parent: { id: parseInt(chapter.id), name: chapter.name },
        type: types[type]
      }
    }

    // items will be a flat array of all content elements (chapter, assignments, video, etc)
    const items = _.map(chapters, chapter => {
      // flatten arrays (activities, assignments, events) and objects (video, podcast) in each chapter
      const flattened = _.flatMap(chapter, (value, type, chapter) => {
        // ignore string values (id, name, position, etc)
        if (!_.isArray(value) && !_.isObject(value)) return null

        // add the chapter's id and name for each content element
        return _.isArray(value)
          ? _.map(value, element => assignMetadata(element, chapter, type))
          : assignMetadata(value, chapter, type)
      })

      // return flat array of elements in order
      // with chapter as an element at the top of each array
      return [
        {
          ..._.pick(chapter, ['id', 'name', 'position', 'content', 'media', 'isActive', 'video', 'podcast']),
          type: 'Chapter'
        },
        ..._.compact(flattened)
      ]
    })

    const allItems = _.filter(_.flatMap(items), item => item.isActive && item.type !== TYPES.VIDEO && item.type !== TYPES.PODCAST)

    const allChapters = _.chain(chapters)
      .filter(c => c.isActive)
      .sortBy(c => c.order)
      .keyBy('id')
      .value()

    const allSections =  _.chain(allChapters)
      .groupBy(chapter => chapter.section && chapter.section.id)
      .mapValues(chapters => ({ chapters: _.sortBy(chapters, c => c.order),  ..._.head(chapters).section }))
      .sortBy(section => section.order)
      .keyBy(section => section.id)
      .value()


    return {
      ...state,
      chapters: allChapters,
      items: allItems,
      sections: allSections
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const reducer = (state = [], action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

const initialState = {}

export const appReducer = (state = initialState, action) => {
  const combinedReducer = combineReducers({
    chapters: (state = {}) => state,
    navigation: navigation.reducer,
    isLoaded: (state = true) => state,
    items: (state = []) => state,
    sections: (state = {}) => state,
  })

  const intermediateState = combinedReducer(state, action)
  const finalState = reducer(intermediateState, action)

  return finalState
}

// ------------------------------------
// Selectors
// ------------------------------------
export const getModule = state => state.app
export const getProp = (state, prop, defaultVal) => _.get(getModule(state), prop, defaultVal)
export const getChapters = state => _.sortBy(getProp(state, 'chapters'), c => c.order)
export const getSections = state => _.sortBy(getProp(state, 'sections'), s => s.order)
export const getItems = state => getProp(state, 'items')
export const getBrowser = state => state.browser

// ------------------------------------
// Sagas
// ------------------------------------
export function * mount (action) {
  yield call(fetch, action)
}

export function * fetch (action) {
  yield put(update({ isLoaded : false }))

  yield call(apiCall, action.payload, {
    api: fetchChapters,
    success: handleFetchSuccess,
    saga: fetchRequested
  })
}

export function * handleFetchSuccess (response) {
  const { data } = response

  const validData = yield call(validResponse, data)

  if (validData) {
    yield put(updateItems({ chapters: validData.allChapters }))
    yield put(update({ isLoaded : true }))
  }
}

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all([
    takeLatest(FETCH_REQUESTED, fetch),
    takeLatest(MOUNT_REQUESTED, mount)
  ])
}
