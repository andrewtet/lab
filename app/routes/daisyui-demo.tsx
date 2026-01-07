import type { Route } from "./+types/daisyui-demo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DaisyUI Demo - React Router App" },
    { name: "description", content: "Testing DaisyUI components" },
  ];
}

export default function DaisyUIDemo() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">DaisyUI Component Demo</h1>
        
        {/* Buttons */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Buttons</h2>
            <div className="flex flex-wrap gap-2">
              <button className="btn">Default</button>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-link">Link</button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <div className="w-full h-48 bg-gradient-to-r from-primary to-secondary"></div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card 1</h2>
              <p>This is a DaisyUI card component with a gradient background.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <div className="w-full h-48 bg-gradient-to-r from-secondary to-accent"></div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card 2</h2>
              <p>Another example card showcasing DaisyUI styling.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">Explore</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <div className="w-full h-48 bg-gradient-to-r from-accent to-primary"></div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card 3</h2>
              <p>A third card to demonstrate the grid layout.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-accent">View</button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="alert alert-info mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>DaisyUI is successfully integrated with Tailwind CSS v4!</span>
        </div>

        {/* Badges */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Badges</h2>
            <div className="flex flex-wrap gap-2">
              <div className="badge">Default</div>
              <div className="badge badge-primary">Primary</div>
              <div className="badge badge-secondary">Secondary</div>
              <div className="badge badge-accent">Accent</div>
              <div className="badge badge-ghost">Ghost</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>

        {/* Link to home */}
        <div className="text-center">
          <a href="/" className="btn btn-outline">Back to Home</a>
        </div>
      </div>
    </div>
  );
}
