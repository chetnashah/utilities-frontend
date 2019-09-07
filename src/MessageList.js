import React from "react";
import { inject, observer } from "mobx-react";

@inject("messageLogStore")
@observer
class MessageList extends React.Component {
    
    clearLog = () => {
        this.props.messageLogStore.messageList = [];
    }

    render(){
        return (
            <React.Fragment>
            <button onClick={this.clearLog}>Clear Log</button>
                {this.props.messageLogStore.messageList.map((message, idx) => {
                    return (
                        <div style={{ border: '1px solid white' }}key={idx}>
                            {message}
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }
}

export default MessageList;