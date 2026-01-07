import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("daisyui-demo", "routes/daisyui-demo.tsx"),
] satisfies RouteConfig;
