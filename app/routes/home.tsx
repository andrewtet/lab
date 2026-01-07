import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Home page" },
  ];
}

export default function Home() {
  return (
    <div>
      hello Andy
      <br />
      <Link to="/blink">blink</Link>
    </div>
  );
}
