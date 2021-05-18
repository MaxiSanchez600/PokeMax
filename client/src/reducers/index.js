import { Filter } from "../actions/actions";

const initialState = {
    Anterior: [],
    Show: [],
    Filter: [],
    Busca: false,
    bdlocal: false,
};

const rootReducer =  (state = initialState, action) => {
    switch(action.type){
        case 'CHECK_BD':{
            return{
                ...state,
                bdlocal: action.payload
            }
        }
        case 'VACIAR':{
            return{
                ...state,
                Show: [],
                Busca: true,
                Filter: []
            }
        }
        case 'GET_FILTER':{
            return{
                ...state,
                Filter: action.payload.filter,
                Busca: false,
            }
        }
        case 'GET_FILTER_F':{
            return{
                ...state,
                Filter: action.payload.filter,
                Busca: false,
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
                Filter: [],
                Busca: false
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
                Filter: [],
                Busca: false
            }
        default:
            return state;
    }
}

export default rootReducer;