
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>

		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>,
		</BrowserRouter>
	</ContextProvider>
);
