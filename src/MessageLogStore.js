import { observable, action } from "mobx";
class MessageLogStore{
    @observable messageList = [];

    constructor(){
        this.messageList = ["Message Log:"];
    }
    
    @action
    pushMessageToList(msg){
        this.messageList.push(msg);
    }
}

export default new MessageLogStore();