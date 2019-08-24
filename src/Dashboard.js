import React from 'react'
import ".//firebaseMessagingSetup";
import Axios from 'axios';
import { baseUrl } from './config';

export default function Dashboard() {

    return (
        <div>
            Welcome to the dashboard!
            Click on the links above to do something useful!
            <button
                onClick={()=>{
                    Axios(`${baseUrl}/pinger`,{
                        method: 'get',
                        withCredentials: true,
                    }).then((resp) => {
                        console.log(resp);
                    })
                }}
            >Pinger</button>
        </div>
    )
}
