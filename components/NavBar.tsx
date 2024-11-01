import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { LogIn, LogOut } from "lucide-react";
import { createOrUpdateUser } from "@/utils/db/actions";
import { useEffect } from "react";

export default function NavBar() {
    const {login, logout, authenticated, user} = usePrivy()

    useEffect(() => {
        if (authenticated && user) {
            handleUserAuthenticated()
        }
    }, [authenticated, user])
    
    const handleUserAuthenticated = async () => {
        if(user && user.wallet?.address) {
            try {
                await createOrUpdateUser(
                    user.wallet.address,
                    user.email?.address || ''
                )
            } catch (error) {
                console.error('Error creating or updating user', error)
            }
        }
    }
    const handleAuth = () => {
        if(authenticated) {
            logout();
        } else {
            login();
        }
    }

    return (
        <>
            <nav className="flex justify-between items-center mb-1 py-2 pt-4 px-4 md:px-8 lg:px-16">
                <Link href="/" className="flex items-center">
                    <Image src="/svg/lock-square-rounded.svg" alt="HTTP3 Logo" width={70} height={70} priority />
                    <span className="ml-2 text-3xl font-bold" style={{ textShadow: '0 0 15px rgba(0, 149, 255, 0.8), 0 0 25px rgba(0, 149, 255, 0.8), 0 0 35px rgba(0, 149, 255, 0.6)' }}>H3X</span>
                </Link>
                <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-foreground hover:text-primary"
          >
            Dashboard
          </Link>
          <Link href="/search" className="text-foreground hover:text-primary">
            Search
          </Link>
          <Link href="/docs" className="text-foreground hover:text-primary">
            Docs
          </Link>
          <Button onClick={handleAuth} variant="outline">
            {authenticated ? (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </>
                    )}
                    </Button>
                </div>
            </nav>
        </>
    )
}