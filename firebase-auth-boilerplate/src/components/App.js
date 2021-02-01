import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContexts";
import SignUp from "./SignUp";
import {BrowserRouter as Router , Switch,Route} from 'react-router-dom'
import Dasboard from "./Dasboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY)
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: '400px'}}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dasboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/forgot-password" component={ForgotPassword}/>
        </Switch>
      </Router>
      </div>   
      </Container>
    </AuthProvider>
  );
}

export default App;
