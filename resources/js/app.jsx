import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { SnackbarProvider, useSnackbar } from "notistack";
createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <App {...props} />
        </SnackbarProvider>
      </ThemeProvider>,
    );
  },
});
