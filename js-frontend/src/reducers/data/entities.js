/**
 * Created by andrew on 15/03/16.
 */
import T from '../../constants/ACTION_TYPES';

const initialState = {
};

const nodeInitialState = {
  loading: false,
  data: {}
};

export const entities = (state = {...initialState}, action) => {
  switch(action.type) {
    case T.ENTITIES.REQUESTED: {
      const { id } = action;
      return {
        ...state,
        [id]: null
      }
    }
    case T.ENTITIES.RECEIVED: {
      const { id, entity = {} } = action;
      return {
        ...state,
        [id]: {
          ...entity
        }
      }
    }

    case T.AUTH.AUTHENTICATE_COMPLETE:
    case T.AUTH.SIGN_IN_COMPLETE:
    {
      const { user } = action;
      const { toAccounts = [] } = user;
      return {
        ...state,
        ...toAccounts
      };

    }
    case T.ACCOUNTS.LIST_COMPLETE: {
      const { payload } = action;
      const hashMap = payload.reduce((memo, item) => {
        memo[item.accountId] = item;
        return memo;
      }, {});
      return {
        ...state,
        ...hashMap
      };
    }
    case T.ENTITIES.RECEIVED_LIST:
    default:
      return state;
  }
};