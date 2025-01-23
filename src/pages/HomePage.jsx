export default function HomePage() {
  return (
    <>
      <p>Home page</p>
      <p>accessToken: {localStorage.getItem("accessToken")}</p>
    </>
  )
}