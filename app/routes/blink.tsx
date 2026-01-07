import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/blink";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blink" },
    { name: "description", content: "Blink page" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, error: "Username and password are required" };
  }

  try {
    // Dynamically import the Blink module (CommonJS)
    const Blink = (await import("node-blink-security")).default;
    
    // Create a unique device ID for this session
    const deviceId = `web-app-${Date.now()}`;
    
    // Initialize Blink instance
    const blink = new Blink(username, password, deviceId);
    
    // Setup the system (this will attempt to login)
    await blink.setupSystem();
    
    // Note: In a production app, store session/account data securely server-side
    // rather than returning to the client
    return { 
      success: true, 
      message: "Login successful! System setup complete."
    };
  } catch (error: any) {
    // Log error for debugging, but sanitize user-facing message
    console.error("Blink login error:", error?.code || "UNKNOWN");
    
    // Return generic error to avoid exposing internal details
    return { 
      success: false, 
      error: "Login failed. Please check your credentials and try again."
    };
  }
}

export default function Blink({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Blink Login</h2>
          
          <Form method="post">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                disabled={isSubmitting}
                required
              />
            </div>

            {actionData && (
              <div className={`alert ${actionData.success ? "alert-success" : "alert-error"} mt-4`}>
                <span>{actionData.success ? actionData.message : actionData.error}</span>
              </div>
            )}

            <div className="card-actions justify-end mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
