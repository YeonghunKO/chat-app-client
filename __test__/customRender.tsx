import Layout from "@/components/common/Layout";
import { render } from "@testing-library/react";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

function AllTheProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>{children}</Layout>,
    </QueryClientProvider>
  );
}

const customRender = (ui: React.ReactNode) => {
  return render(ui, { wrapper: AllTheProviders });
};

export { customRender };
