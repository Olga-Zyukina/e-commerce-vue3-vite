import usersData from "assets/data/users.json"
const users: UserData[] = usersData as UserData[]

export default defineEventHandler(() => {
  return users
});
