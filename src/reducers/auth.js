
const initialState = {
    authentication: false,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case "authentication":
            return {
                ...state,
                authentication: action.payload
            };
        default:
            return state
    }
}