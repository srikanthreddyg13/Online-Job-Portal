import { ActionReducerMap, Action } from "@ngrx/store"
import { AppState } from "./app.state";

import { AddDataAction, DataAction} from "./app.action";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { data } from './data/data.state';


export const reducers: ActionReducerMap<AppState> = {
    data: mapReducer
};

/**
 * retuns current state of data along with the previous state 
 */
export function mapReducer( data: data, action:DataAction):data{
    switch(action.type){
        case 'add':
        {
            data = action.payload;
            return data;
        }
    }
}
