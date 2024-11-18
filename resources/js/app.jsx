import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App {...props} />
      </ThemeProvider>,
    );
  },
});
