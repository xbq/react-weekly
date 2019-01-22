import Users from '../Users/UserList'
import ProjectList from '../Projects/ProjectList'
import React from "react";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import ProtectRoute from "../ProtectRoute"

function SidebarExample() {
    return (
        <Router>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        padding: "10px",
                        width: "40%",
                        background: "#f0f0f0"
                    }}
                >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/manage/users">用户</Link>
                        </li>
                        <li>
                            <Link to="/manage/projects">项目</Link>
                        </li>
                        <li>
                            <Link to="/manage/weekly">周报</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/manage/projects" component={ProjectList}/>
                        <Route path="/manage/weekly" component={Users}/>
                        <Route path="/manage/users" component={Users}/>
                    </Switch>

                </div>
            </div>
        </Router>

    );
}

export default SidebarExample;
