import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '@/views/layout/Index';
import Login from '@/views/Login';
import AuthRouter from '@/views/auth/AuthRouter';
const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route component={Login} exact path="/login" />
				<AuthRouter path="/" component={Layout} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
