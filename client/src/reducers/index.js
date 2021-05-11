const initialState = {
    Concatenadas: [],
    Show: [],
    Inicio: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_API_BD_CONCATENAR_SHOW':
            console.log(action.payload)
            return{
                ...state,
                Show: action.payload
            }
        case "GET_API_BD_CONCATENAR":
            return{
                ...state,
                Inicio: action.payload
            }
        case 'GET_POKE_BY_NAME':
            console.log(action.payload)
            return{
                ...state,
                Show: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;