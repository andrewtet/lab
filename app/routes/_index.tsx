import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Lab App" },
    {
      name: "description",
      content: "Welcome to Remix with Tailwind and Daisy UI!",
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there!</h1>
            <p className="py-6">
              Welcome to your minimal Remix app with TypeScript, Tailwind CSS,
              and Daisy UI.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
