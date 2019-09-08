import { observable, action } from "mobx";
import Axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from './config'; 


class AuthStore {
    @observable isAuthenticated = false;

    constructor(){
        if (localStorage){
            this.isAuthenticated = localStorage.getItem('isLoggedIn');
        }

    }

    @action
    login(email, password) {
        Axios(`${baseUrl}/login`,{
            method: 'post',
            data: {
                email: email,
                password: password,    
            },
            withCredentials: true
        }).then(response => {
            console.log('login response: ');
            console.log(response);
            if(response && response.data) {
                if (response.data.success) {
                    this.isAuthenticated = true;
                    localStorage.setItem('isLoggedIn', true);
                }
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                }
            }
        });
    }

    @action
    logout(){
        this.isAuthenticated = false;
        localStorage && localStorage.removeItem('isLoggedIn');
        Axios.post(`${baseUrl}/logout`)
        .then((resp) => {
            console.log('logout resp:');
            console.log(resp);
            if(resp.data && resp.data.redirect) {
                window.location.href = resp.data.redirect;
            }
        });
    }
}

export default new AuthStore();