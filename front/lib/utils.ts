import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { startTransition } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BACKEND_URL = "http://localhost:3333"

/** Helper function for calling our API.
 *  The backend url is hardcoded. Check source code for details.
 * @param route - The suffix representing the route you want to call (e.g. `contacts/4` or `/provider/2`)
 * @param method - GET, POST, PATCH, etc.
 * @param data - The data you want in the body
 * @param router - The router instanced with `useRouter()`. Pass this if you want to refresh the page after the request.
 * @param forbidCache - Whether to disable caching of fetches (used to make table show)
 */
export function ApiFetch(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  route: string,
  data?: any,
  router?: AppRouterInstance,
  forbidCache: boolean = true,
) {
  return fetch(`${BACKEND_URL}${route[0] === '/' ? route : `/${route}`}`,
    {
      method,
      headers: { "Content-Type": "application/json" },
      ...(data && { body: JSON.stringify(data) }),
      ...(forbidCache && { cache: "no-store" })
    }
  )
    .then((res) => {
      if (res.ok) {
        if (router) {
          startTransition(() => {
            router.refresh();
          });
        }
        return res;
      }
    });
}