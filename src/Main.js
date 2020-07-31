import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes  from './routes'
console.log(`routes:`, routes)

const Main = () =>
    <Switch>
        { routes.map(({url, component}, idx)=>
            <Route key={url + idx} path={url} component={component} exact/>) }
            <Redirect from="/*" to="/ToolSelection" strict exact/>
    </Switch>

export default Main