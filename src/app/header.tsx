"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();

  return (
    <header>
      {session.data ? (
        <Button onClick={() => signOut()}>
          Sign out
        </Button>
      ) : (
        <Button onClick={() => signIn("google")}>
          Sign in
        </Button>
      )}
      {session.data?.user?.name}
      <ModeToggle />
    </header>
  );
}

export default Header;