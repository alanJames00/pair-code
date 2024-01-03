"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SideBar({ members }: { members: any[]}) {

    return (
        <div className=" m-6">
            <h1 className=" text-2xl font-semibold mb-4"> PairCode: CollabSpace</h1>
            <div>
                <h1 className=" text-lg mb-2">Active Members</h1>
                <div className=" mb-10">
                    {members.map((elem) => 
                        (   
                            <div className=" flex mb-2">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadc0n.png" />
                              <AvatarFallback>{elem[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <h1 className=" ml-2 mt-1">{elem}</h1>
                            </div>
                        )
                    )}
                </div>

                <div>
                    <Link href={'/'}>
                        <Button
                            variant="destructive"
                            >Leave CollabSpace</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}