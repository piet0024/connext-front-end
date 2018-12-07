import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import './assets/css/index.css';
import App from './containers/App';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/connext.scss';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: "http://192.168.2.148:4000/graphql"
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
