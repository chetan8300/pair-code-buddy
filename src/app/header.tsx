"use client";

import {
  LogOut,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={session.data?.user?.image ?? ""}
              alt={session.data?.user?.name ?? ""}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const session = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:text-blue-900 dark:hover:text-blue-100">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
          <span className="text-lg font-bold">Pair Code Buddy</span>
        </Link>
        <div className="flex items-center gap-3">
          {session.data ? (
            <AccountDropdown />
          ) : (
            <Button onClick={() => signIn("google")}>Sign in</Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
