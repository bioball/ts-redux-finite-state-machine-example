import { Reducer } from 'redux';

import { Action, SearchAction } from './actions';
import * as states from './states';

const initialState: states.State = states.State.Form({});

export const reducer: Reducer<states.State, Action> = (state = initialState, action) => {
    const defaultTransition = () => state;
    const searchTransition = ({ query }: SearchAction) => states.State.Loading({ query });
    return states.State.match({
        Form: () =>
            Action.match({
                Search: searchTransition,
                default: defaultTransition,
            })(action),
        Loading: () =>
            Action.match({
                SearchFailure: () => states.State.Failure({}),
                SearchSuccess: ({ items }) => states.State.Success({ items }),
                default: defaultTransition,
            })(action),
        Failure: () =>
            Action.match({
                Search: searchTransition,
                default: defaultTransition,
            })(action),
        Success: () =>
            Action.match({
                Search: searchTransition,
                default: defaultTransition,
            })(action),
    })(state);
};
