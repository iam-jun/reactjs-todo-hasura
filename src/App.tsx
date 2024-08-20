import './App.css';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <TaskList />
      </div>
    </ApolloProvider>
  );
};

export default App;
