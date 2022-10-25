import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../client/auth";

function App() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser(event) {
    event.preventDefault();

    setLoading(true);
    const data = {
      name,
      email,
      password,
    };

    const res = await register(data);

    if (res.status === "OK") {
      toast.success("Register successful!");
      history.push("/login");
    } else {
      toast.error(res.error || "Register failed!");
    }
    setLoading(false);
  }

  return (
    <div className="infoBox">
      <h1>REGISTER</h1>
      <form onSubmit={registerUser}>
        <TextField style={{ marginBottom: 20 }} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" label="Name" name="name" size="small" required />
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
          REGISTER
        </LoadingButton>
      </form>

      <p>
        Already have an account? <Link to="/login">LOGIN</Link>
      </p>
    </div>
  );
}

export default App;
