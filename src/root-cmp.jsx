// import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToyIndex } from './pages/toy-index';
import { AppHeader } from "./cmps/app-header";
import { AppFooter } from "./cmps/app-footer";
import { Home } from "./pages/home";



export function App() {

    return (
        <Provider store={store}>

            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<ToyIndex />} path="/toy" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}

