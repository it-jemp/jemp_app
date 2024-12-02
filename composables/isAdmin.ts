export default async function () {
  const { data: isAdmin } = await useAsyncData("admin", async () => {
    const { data } = await useSupabaseClient().rpc("check_admin", {
      user_email: useSupabaseUser().value!.email!,
    })
    return data
  })
  return isAdmin.value === true
}
