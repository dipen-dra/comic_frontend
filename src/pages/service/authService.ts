const ACCESS_TOKEN_KEY = 'accessToken';

export const isLoggedIn = (): boolean => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
};

export const doLogin = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// Function to perform logout and remove the token from localStorage
export const doLogout = (): void => {
    localStorage.clear();

};

export const isAuthenticated = ( ) : boolean => {
    return isLoggedIn();
};

// // Clear localStorage when the browser is closed
// window.addEventListener('beforeunload', () => {
//     localStorage.clear();
// });