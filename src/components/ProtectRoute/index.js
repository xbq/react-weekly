import React from 'react'
import {Route,Redirect} from 'react-router-dom'

function ProtectRoute({ component: Component,fakeAuth:fakeAuth, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectRoute
