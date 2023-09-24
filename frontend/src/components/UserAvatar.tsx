// import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Icon from "@mdi/react"
import { mdiAccount } from "@mdi/js"
// import { Icons } from "@/components/icons"

// interface UserAvatarProps extends AvatarProps {
//   user: Pick<User, "image" | "name">
// }

export function UserAvatar({ user, ...props }: any) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icon path={mdiAccount} />
        </AvatarFallback>
      )}
    </Avatar>
  )
}