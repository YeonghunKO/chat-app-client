import { signInHandlers } from "./signIn.handler";
import { dashboardHandlers } from "./dashboard.handler";

// handler 타입 설정하고 server에 handler만 import하면 됨.
export const handlers = [...signInHandlers, ...dashboardHandlers];
