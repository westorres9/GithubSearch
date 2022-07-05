import "./styles.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary nav-text">
      <div>
        <Link  to="/" className="nav-logo-text">
          <h4>Github API</h4>
        </Link>  
      </div>
    </nav>
  );
};

export default Navbar;