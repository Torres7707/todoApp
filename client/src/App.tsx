import React from 'react';
import Login from './pages/Login';
import Todo from './pages/Todo';

class App extends React.Component {
	render() {
		return (
			<main className="App">
				<Todo />
			</main>
		);
	}
}

export default App;
