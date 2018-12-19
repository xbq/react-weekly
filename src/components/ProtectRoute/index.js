import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {globalVar} from '../../util'


let {fakeAuth} = globalVar;
function ProtectRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectRoute
