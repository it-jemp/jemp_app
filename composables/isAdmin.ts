export default async function () {
  const user = useSupabaseUser()
  const email = user.value?.email ?? ""

  // L'account IT non è nel database soci ma ha sempre accesso admin
  if (email === "it@jemp.it") return true

  const { data: isAdmin } = await useAsyncData("admin", async () => {
    const { data } = await useSupabaseClient().rpc("check_admin", {
      user_email: email,
    })
    return data
  })
  return isAdmin.value === true
}
