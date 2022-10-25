import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../client/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function loginUser(event) {
    event.preventDefault();

    setLoading(true);
    const data = { email, password };
    const res = await login(data);

    if (res.user) {
      localStorage.setItem("token", res.user);
      toast.success("Login successful!");
      history.push("/");
    } else {
      toast.error("Invalid email or password!");
    }
    setLoading(false);
  }

  return (
    <div className="infoBox">
      <h1>LOGIN</h1>
      <form onSubmit={loginUser}>
        <TextField style={{ marginBottom: 20 }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" label="Email" name="email" size="small" required />
        <TextField
          style={{ marginBottom: 20 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          size="small"
          required
        />
        <LoadingButton loading={loading} variant="contained" type="submit">
          LOGIN
        </LoadingButton>
      </form>

      <p>
        Don't have an account? <Link to="/register">REGISTER</Link>
      </p>
    </div>
  );
}

export default Login;
