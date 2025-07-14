import { Outlet } from "@remix-run/react";

export default function Component() {
  return (
    <div className="container mx-auto flex flex-col gap-4 max-w-4xl p-10 prose">
      <Outlet />
    </div>
  );
}
