// import { User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "./Icon"

export function UserAvatar({ user, ...props }: any) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icon name="mdiAccount" className="text-purple-900" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}