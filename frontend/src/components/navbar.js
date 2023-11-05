import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [cookies, setCookies] = useCookies("access_token");
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("UserID");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to={"/"}>Pocetak</Link>
      <Link to={"/create-job"}>Objavi posao</Link>
      <Link to={"/saved-jobs"}>Sacuvaj posao</Link>
      {!cookies.access_token ? (
        <Link to={"/auth"}>Prijava/Registracija</Link>
      ) : (
        <button className="btn" onClick={logout}>
          Odjava
        </button>
      )}
    </div>
  );
};
