import {createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';



const middleware = applyMiddleware(promiseMiddleware())

export default createStore(reducer, middleware);




//unused code


// import {createStore, applyMiddleware, compose } from 'redux';
// import reducer from './reducer';
// import promiseMiddleware from 'redux-promise-middleware';
// // import ReduxThunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
// import { createBrowserHistory } from 'history';


// // export default createStore(reducer, applyMiddleware( promiseMiddleware()))
// const reduxRouterMiddleware = routerMiddleware(createBrowserHistory());
// const middleware = [promiseMiddleware, /* ReduxThunk, */ reduxRouterMiddleware]


// export const store = createStore(
//     reducer,
//     compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)
//   );
// // export default createStore((reducer, middleware), window.devToolsExtension ? window.devToolsExtension() : f => f);

// export default store;