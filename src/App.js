import React from "react";
import Navbar from "./components/SideNavigation";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./components/home"
import Graph from "./pages/graph";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/graph" element={<Graph />} />
			</Routes>
		</Router>
	);
}

export default App;