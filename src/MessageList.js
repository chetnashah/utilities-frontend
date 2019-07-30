import React from "react";
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class MessageList extends React.Component {
    
    clearLog = () => {
        this.props.Store.messageList = [];
    }

    render(){
        return (
            <React.Fragment>
            <button onClick={this.clearLog}>Clear Log</button>
                {this.props.Store.messageList.map((message, idx) => {
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