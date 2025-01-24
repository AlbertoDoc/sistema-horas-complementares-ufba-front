import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <p>Home page</p>
      <p>accessToken: {localStorage.getItem("accessToken")}</p>
      <Link to="/barema">Barema</Link>
    </>
  )
}