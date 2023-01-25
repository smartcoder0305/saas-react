import { Route, Routes } from "react-router-dom";
import CandidateApplicationForm from "./CandidateApplicationForm";
import Dashboard from "./dashboard";
import Login from "./Login";
import Signup from "./Signup";

/**
 * Base Program Provider component.
 * Contains routes to all major pages in this section
 */

const Candidates = () => {
	return (
		<Routes>
			<Route index element={<Login />} />
			<Route path="/signin" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/apply" element={<CandidateApplicationForm />} />
		</Routes>
	);
};

export default Candidates;
