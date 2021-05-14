import { Filter } from "../actions/actions";

const initialState = {
    Anterior: [],
    Show: [],
    Filter: []
};

const rootReducer =  (state = initialState, action) => {
    switch(action.type){
        case 'GET_FILTER':{
            return{
                ...state,
                Filter: action.payload.filter,
            }
        }
        case 'GET_FILTER_F':{
            return{
                ...state,
                Filter: action.payload.filter,
            }
        }
        case 'SWITCH_BD':
            return{
                ...state,
                Anterior: [],
                Show: action.payload,
                Filter: []
            }
        case 'UPDATE_BD_SHOW':
            return{
                ...state,
                Anterior: action.payload.viejo,
                Show: action.payload.nuevo,
                Filter: []
            }
        case 'GET_BD_SHOW':
            return{
                ...state,
                Show: action.payload,
                Filter: []
            }
        case 'GET_API_BD_CONCATENAR_SHOW':
            return{
                ...state,
                Anterior: action.payload.viejo,
                Show: action.payload.show,
                Filter: []
            }
        case "GET_API_BD_CONCATENAR":
            return{
                ...state,
                Show: action.payload,
                Filter: []
            }
        case 'GET_POKE_BY_NAME':
            return{
                ...state,
                Show: action.payload.show,
                Anterior: action.payload.anterior,
                Filter: []
            }
        default:
            return state;
    }
}

export default rootReducer;