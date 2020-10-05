import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { StorePage } from '../pages/StorePage';
import { CandidatoPage } from '../pages/CandidatoPage';
import { NavBar } from '../components/NavBar';



export const AppRouter = () => {
    return (
        <Router>
            <NavBar />
            <div>
                <Switch>
                    <Route
                        path="/store"
                        component={StorePage}
                    />
                    <Route
                        exact
                        path="/candidato"
                        component={CandidatoPage}
                    />
                     <Redirect to="/store" />
                </Switch>
            </div>
        </Router>
    )
}
