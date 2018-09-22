import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { shuffle, sample } from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/auth1.jpg',
    imageSource: 'Wki',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/auth2.jpg',
    imageSource: 'Wki',
    books: ['Heart of Darkness']
  },
  {
    name: 'JK Rowling',
    imageUrl: 'images/authors/auth3.jpg',
    imageSource: 'Wki',
    books: ['Harry Potter']
  },
  {
    name: 'Stephan King',
    imageUrl: 'images/authors/auth1.jpg',
    imageSource: 'Wki',
    books: ['The Shining', 'IT']
  },
  {
    name: 'William Shakesphere',
    imageUrl: 'images/authors/auth2.jpg',
    imageSource: 'Wki',
    books: ['Hamlet', 'Macbeth']
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some(title => title === answer))
  };
}

function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: '' },
  action
) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some(
        book => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? 'correct' : 'wrong'
      });

    case 'CONTINUE':
      return Object.assign({}, state, {
        highlight: '',
        turnData: getTurnData(state.authors)
      });
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });
    default:
      return state;
  }
}

let store = Redux.createStore(reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
