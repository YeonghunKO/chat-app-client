export const queryKeys = {
  userInfo: ["userInfo"],
  users: ["users"],
  messages: (from: string, to: string) => ["messages", from, to],
};
