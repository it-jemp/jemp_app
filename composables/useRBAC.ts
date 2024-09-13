import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  user_role: keyof typeof roles
}

const roles = {
  hr: ["jemp_future.all", "jemp_experience.all"],
}

const restrictedTables = ["jemp_future", "jemp_experience"]

export const useRBAC = () => {
  const session = useSupabaseSession()

  function isRestrictedTable(table: string): boolean {
    return restrictedTables.includes(table)
  }

  function hasPermission(permission: string): boolean {
    if (!session.value) return false

    try {
      const userRole = jwtDecode<JwtPayload>(
        session.value.access_token,
      ).user_role
      const permissions = roles[userRole] || []

      return permissions.includes(permission)
    } catch (error) {
      console.error("Invalid token:", error)
      return false
    }
  }

  return {
    isRestrictedTable,
    hasPermission,
  }
}
