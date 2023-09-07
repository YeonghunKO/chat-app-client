export const queryKeys = {
  userInfo: ["userInfo"],
  users: ["users"],
  messages: (
    from: string | undefined | null,
    to: string | undefined | null,
  ) => ["messages", from, to],
};
