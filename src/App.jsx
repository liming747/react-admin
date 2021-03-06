import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Router from './router/index';
import store from '@/redux/store';
import './assets/css/app';
import './assets/css/common';
import './App.css';
class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}
// 222
export default hot(App);
// export default App;
