import React, { useEffect } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";

function ChildComponent(props) {
  let match = useRouteMatch();

  return <div>{match.url}</div>;
}

export function TestComponent(props) {
  let { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(url, path, " <------- match ->>>>>>>");
  });

  return (
    <div>
      <div>{path}</div>
      <ul>
        <li>
          <Link to={`${url}/tiblisi`}>tiblisi</Link>
        </li>
        <li>
          <Link to={`${url}/rustaveli`}>rustavel</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <ChildComponent />
        </Route>
        <Route path={`${path}/:id`}>
          <ChildComponent />
        </Route>
      </Switch>
    </div>
  );
}
