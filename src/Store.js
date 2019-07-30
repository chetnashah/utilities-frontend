import { observable, action } from "mobx";
class Store{
    @observable messageList = [];

    constructor(){
        this.messageList = ["Message Log:"];
    }
    
    @action
    pushMessageToList(msg){
        this.messageList.push(msg);
    }
}

export default new Store();