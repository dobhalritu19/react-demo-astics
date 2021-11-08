import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = ({ component: Component, ...rest }) => {

    const getState = useSelector(state => state)
    const authentication = getState.auth.authentication;
    
    return (
        <Route {...rest}
            render={props => (authentication ? <Component {...props} /> :
                <Redirect to="/" />)} />
    )
}

export default Private