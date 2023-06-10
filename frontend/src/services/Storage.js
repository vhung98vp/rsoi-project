export async function setToken(accessToken) {
    localStorage.setItem('jwt_token', accessToken);
    console.log(accessToken)
    return accessToken;
}

export async function getToken(set = true){
    let token = localStorage.getItem('jwt_token')
    if (token == '' && set) {
        token = await setToken();
    }
    return token;
}

export function setUser(username) {
    localStorage.setItem('username', username);
    console.log(username)
    return username;
}

export function getUser() {
    return localStorage.getItem('username');
}