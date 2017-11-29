import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Signup from './component/container/Signup.jsx';
import store from "./store";

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
    <Signup />
</Provider>, app);


