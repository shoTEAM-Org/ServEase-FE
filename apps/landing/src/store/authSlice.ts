// src/store/authSlice.ts - Redux slice for authentication state

import { IUser } from '../types';

/**
 * Redux Auth Slice
 * 
 * Manages authentication state including:
 * - User information
 * - Auth tokens (access, refresh)
 * - Loading states
 * - Auth errors
 */

// State Interface
export interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial State
export const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Action Types
export const authActionTypes = {
  // Auth Request
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',

  SIGNUP_REQUEST: 'auth/signupRequest',
  SIGNUP_SUCCESS: 'auth/signupSuccess',
  SIGNUP_FAILURE: 'auth/signupFailure',

  LOGOUT: 'auth/logout',

  // Token Refresh
  REFRESH_TOKEN_REQUEST: 'auth/refreshTokenRequest',
  REFRESH_TOKEN_SUCCESS: 'auth/refreshTokenSuccess',
  REFRESH_TOKEN_FAILURE: 'auth/refreshTokenFailure',

  // Update User
  UPDATE_USER_REQUEST: 'auth/updateUserRequest',
  UPDATE_USER_SUCCESS: 'auth/updateUserSuccess',
  UPDATE_USER_FAILURE: 'auth/updateUserFailure',

  // Clear Error
  CLEAR_ERROR: 'auth/clearError',
} as const;

// Action Creators
export const authActions = {
  // Login
  loginRequest: () => ({
    type: authActionTypes.LOGIN_REQUEST,
  }),
  loginSuccess: (user: IUser, accessToken: string, refreshToken: string) => ({
    type: authActionTypes.LOGIN_SUCCESS,
    payload: { user, accessToken, refreshToken },
  }),
  loginFailure: (error: string) => ({
    type: authActionTypes.LOGIN_FAILURE,
    payload: { error },
  }),

  // Signup
  signupRequest: () => ({
    type: authActionTypes.SIGNUP_REQUEST,
  }),
  signupSuccess: (user: IUser, accessToken: string, refreshToken: string) => ({
    type: authActionTypes.SIGNUP_SUCCESS,
    payload: { user, accessToken, refreshToken },
  }),
  signupFailure: (error: string) => ({
    type: authActionTypes.SIGNUP_FAILURE,
    payload: { error },
  }),

  // Logout
  logout: () => ({
    type: authActionTypes.LOGOUT,
  }),

  // Refresh Token
  refreshTokenRequest: () => ({
    type: authActionTypes.REFRESH_TOKEN_REQUEST,
  }),
  refreshTokenSuccess: (accessToken: string) => ({
    type: authActionTypes.REFRESH_TOKEN_SUCCESS,
    payload: { accessToken },
  }),
  refreshTokenFailure: (error: string) => ({
    type: authActionTypes.REFRESH_TOKEN_FAILURE,
    payload: { error },
  }),

  // Update User
  updateUserRequest: () => ({
    type: authActionTypes.UPDATE_USER_REQUEST,
  }),
  updateUserSuccess: (user: IUser) => ({
    type: authActionTypes.UPDATE_USER_SUCCESS,
    payload: { user },
  }),
  updateUserFailure: (error: string) => ({
    type: authActionTypes.UPDATE_USER_FAILURE,
    payload: { error },
  }),

  // Clear Error
  clearError: () => ({
    type: authActionTypes.CLEAR_ERROR,
  }),
};

// Reducer
export const authReducer = (
  state = initialAuthState,
  action: ReturnType<typeof Object.values<typeof authActions>[number]>
): AuthState => {
  switch (action.type) {
    // Login Cases
    case authActionTypes.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        error: null,
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isAuthenticated: false,
      };

    // Signup Cases
    case authActionTypes.SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case authActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        error: null,
      };
    case authActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isAuthenticated: false,
      };

    // Logout
    case authActionTypes.LOGOUT:
      return initialAuthState;

    // Refresh Token Cases
    case authActionTypes.REFRESH_TOKEN_REQUEST:
      return { ...state, loading: true };
    case authActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
        error: null,
      };
    case authActionTypes.REFRESH_TOKEN_FAILURE:
      return initialAuthState;

    // Update User Cases
    case authActionTypes.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case authActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: null,
      };
    case authActionTypes.UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    // Clear Error
    case authActionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Selectors
export const authSelectors = {
  getUser: (state: { auth: AuthState }) => state.auth.user,
  getAccessToken: (state: { auth: AuthState }) => state.auth.accessToken,
  getRefreshToken: (state: { auth: AuthState }) => state.auth.refreshToken,
  getLoading: (state: { auth: AuthState }) => state.auth.loading,
  getError: (state: { auth: AuthState }) => state.auth.error,
  isAuthenticated: (state: { auth: AuthState }) => state.auth.isAuthenticated,
};

/**
 * Example usage in a component:
 * 
 * ```typescript
 * const user = useSelector((state) => authSelectors.getUser(state));
 * const loading = useSelector((state) => authSelectors.getLoading(state));
 * const dispatch = useDispatch();
 * 
 * const handleLogin = async (email: string, password: string) => {
 *   dispatch(authActions.loginRequest());
 *   try {
 *     const response = await authService.login(email, password);
 *     dispatch(authActions.loginSuccess(response.user, response.accessToken, response.refreshToken));
 *   } catch (error) {
 *     dispatch(authActions.loginFailure(error.message));
 *   }
 * };
 * ```
 */
