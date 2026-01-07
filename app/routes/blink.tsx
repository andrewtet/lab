import type { Route } from "./+types/blink";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blink" },
    { name: "description", content: "Blink page" },
  ];
}

export default function Blink() {
  return <div>hello blink</div>;
}
