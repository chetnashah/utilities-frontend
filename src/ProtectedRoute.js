import React from 'react';
import { Route, Redirect }  from 'react-router-dom';
import { observer, inject } from 'mobx-react';

function ProtectedRoute({ component: Component, authStore, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authStore.isAuthenticated){
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname:"/login",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }}
        >
        </Route>
    )
}

export default inject("authStore")(observer(ProtectedRoute));