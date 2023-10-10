export const queryKeys = {
  userInfo: ["userInfo"],
  users: ["users"],
  messages: (from: number, to: number) => ["messages", from, to],
  chatLists: ["chatList"],
  filteredMessages: ["filtered-messages"],
};
