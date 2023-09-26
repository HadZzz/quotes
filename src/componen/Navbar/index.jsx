import Style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={Style.nav}>
      <h1 className={Style.logo}>Quots</h1>
    </nav>
  );
}
