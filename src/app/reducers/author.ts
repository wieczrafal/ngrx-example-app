import * as author from '../actions/author';


export interface State {
    loaded: boolean;
    loading: boolean;
    authors: string[];
};

const initialState: State = {
    loaded: false,
    loading: false,
    authors: []
};

export function reducer(state = initialState, action: author.Actions): State {
    switch (action.type) {
        case author.LOAD: {
            return {
                ...state,
                loading: true
            };
        }

        case author.LOAD_SUCCESS: {
            return {
                loaded: true,
                loading: false,
                authors: action.payload
            };
        }

        case author.ADD_AUTHOR_SUCCESS:
        case author.REMOVE_AUTHOR_FAIL: {
            const author = action.payload;

            if (state.authors.indexOf(author) > -1) {
                return state;
            }

            return {
                ...state,
                authors: [...state.authors, author]
            };
        }

    case author.REMOVE_AUTHOR_SUCCESS:
    case author.ADD_AUTHOR_FAIL: {
        const author = action.payload;

        return {
            ...state,
            authors: state.authors.filter(auth => auth !== author)
        };
    }

        default: {
            return state;
        }
    }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getAuthors = (state: State) => state.authors;
