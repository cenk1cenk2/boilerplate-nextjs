import { Component } from 'react'

import { ObjectLiteral } from '@interfaces/object.interface'
import { mergeObjects } from '@utils/custom.utils'

export interface StateUtilsType<State, Action> {
  dispatch?: (action: Action) => Promise<void>
  write: (write: State) => void
}

export function StateUtils <State = any, Action = any> (this: Component<any, Partial<State>, any> & { reducer: (state, action) => ObjectLiteral }): StateUtilsType<State, Action> {
  let stateUtils: ObjectLiteral = {}
  if (this?.reducer) {
    stateUtils = {
      dispatch: (action: Action) => this.setState((state: State) => mergeObjects(state, this.reducer(state, action)) as State)
    }
  }
  return {
    ...stateUtils,
    write: (write: State) => this.setState((state: State) => mergeObjects(state, write) as State)
  }
}