export const getUser = (id: number) => ({ id, name: "User" });
export const saveUser = (user: { id: number; name: string }) => true;
