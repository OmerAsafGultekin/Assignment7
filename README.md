# Assignment 7 - Multi-Page React Shop with Shared State

A multi-page e-commerce application built with React, React Router, Zustand, and Context API. The application fetches product catalogue data from the public DummyJSON API and implements client-side routing, URL-driven filtering, custom hooks, and state isolation according to course architecture requirements.

---

## File Organization

```text
/assignment7
├── src/
│   ├── api/
│   │   ├── productsApi.js       # Fetch wrappers supporting AbortSignal
│   │   └── authApi.js           # Simulated asynchronous authentication service
│   ├── hooks/
│   │   ├── useFetch.js          # useReducer-based fetch hook with AbortController cancellation
│   │   └── useLocalStorage.js   # LocalStorage synchronization hook matching useState signature
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state via Context API and useReducer
│   ├── store/
│   │   └── cartStore.js         # Zustand cart store with external subscription persistence
│   ├── components/
│   │   ├── Layout.jsx           # Shared application shell with navigation bar and footer
│   │   ├── NavBar.jsx           # Navigation header displaying item count and theme switch
│   │   ├── ProductCard.jsx      # Reusable presentation card for single catalogue item
│   │   └── ProtectedRoute.jsx   # Route guard preserving attempted navigation locations
│   ├── pages/
│   │   ├── Home.jsx             # Welcome landing page
│   │   ├── ProductList.jsx      # Catalogue with URL-driven search and filtering
│   │   ├── ProductDetail.jsx    # Single product view reading URL params and adding to cart
│   │   ├── Cart.jsx             # Shopping cart with quantity management and derived total
│   │   ├── Login.jsx            # Controlled authentication form with redirect handling
│   │   └── NotFound.jsx         # 404 fallback page rendered inside layout
│   ├── App.jsx                  # Main route table, nested routes, and root providers
│   ├── main.jsx                 # Entry point mounting the React root
│   └── index.css                # Minimal layout styles and CSS theme custom properties
├── package.json
└── README.md
```

---

## Reasoning Questions

### 1. State Choices
* **Signed-in user:** Lives in React Context (`AuthContext`) managed by `useReducer`. Authentication status is accessed across wide areas (navigation, cart guard) but updates infrequently (only on explicit login or logout), making Context optimal without triggering rendering bottlenecks.
* **Cart:** Lives in an external Zustand store (`cartStore`). The cart experiences frequent mutations across disjoint components (adding from detail page, updating counters in navbar, modifying quantities in cart), making Zustand's selective subscriptions ideal to prevent unneeded re-renders.
* **Filter values:** Live directly in the browser URL query string (`useSearchParams`). Storing filter states in the URL makes the current view shareable, bookmarkable, and resilient across page reloads without requiring internal React state.
* **Product list:** Lives inside local component state via the custom `useFetch` hook. It represents remote asynchronous server state that is fetched on demand and requires no cross-page global persistence.
* **Theme:** Lives in local component state synchronized with `localStorage` via the `useLocalStorage` hook. It is consumed at the top-level layout to apply root CSS classes and remembered between browser visits.

### 2. Context versus Store
The signed-in user is kept in Context because authentication status updates rarely; re-rendering dependent components on login or logout incurs negligible performance cost. In contrast, the cart changes frequently through additions and quantity updates. If the cart were placed in Context, every minor state mutation would trigger re-renders across all consumers of the context. Swapping them would make the cart inefficient due to broad component re-renders, while moving auth to a store would add unnecessary third-party architecture for a low-frequency state.

### 3. Custom Hooks
The `useFetch` hook shares asynchronous request lifecycle logic between `ProductList` and `ProductDetail`, including request initiation, success/error handling, and cancellation via `AbortController`. It deliberately does not share state data; each component invoking `useFetch` gets its own isolated instance of `useReducer` with independent `data`, `loading`, and `error` states.

### 4. Route Parameters
The `id` retrieved from the URL via `useParams()` is always of type `string`. This distinction is critical when passing the ID into `fetchProduct(id, signal)` and when performing lookups or equality checks (`===`) against numeric API identifiers or store items, requiring explicit type awareness to avoid mismatched comparisons.

### 5. Protected Routes
The `ProtectedRoute` component is purely a user-experience enhancement, not a security boundary, because client-side JavaScript and memory state can easily be manipulated in browser developer tools. True security requires server-side authentication, where private API endpoints validate cryptographically signed session tokens or HTTP-only cookies before serving restricted data.

### 6. Deep Links
On a plain static file server, reloading `/products/3` returns a 404 Not Found error because the server looks for an actual file at `/products/3/index.html` which does not exist on disk. It works on the Vite development server because Vite includes a development SPA fallback mechanism that redirects all non-file route requests back to `index.html`, allowing client-side React Router to resolve the URL.

---

## Self-Study Notes

* **Updating Query Parameters Without Data Loss:** To prevent filter conflicts (such as resetting search keywords when choosing a category), we used `URLSearchParams` functional updates (`setSearchParams(prev => ...)`). By copying existing keys and updating only the targeted parameter, multiple filters coexist cleanly.
* **Safe LocalStorage Initialization:** Directly parsing raw storage can crash an application if the JSON format is invalid or missing. We implemented defensive initialization using `try...catch` blocks that safely fall back to default initial values if parsing fails.
* **Light/Dark Theme Implementation:** Implemented a system utilizing CSS custom properties (`--bg-color`, `--text-color`) bound to container classes (`.app-container.dark`). Toggling the class dynamically restyles all descendant components without inline CSS overrides.

---

## Challenges Faced

* **Request Cleanup & Abort Handling:** Ensuring that unmounting components cleanly abort in-flight fetch operations without setting state on unmounted components or logging false error alerts required ignoring `AbortError` instances inside `useFetch`.
* **State Synchronization Outside React:** Subscribing the Zustand store to `localStorage` from outside the React lifecycle ensured storage persistence without polluting React rendering lifecycles with unnecessary side effects.