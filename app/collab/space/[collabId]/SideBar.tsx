import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SideBar({ members }: { members:[string | null]}) {

    return (
        <div className=" m-6">
            <h1 className=" text-2xl font-semibold mb-4"> PairCode: CollabSpace</h1>
            <div>
                <h1 className=" text-lg mb-2">Active Members</h1>
                <div>
                    {members.map((elem) => 
                        (   
                            <div className=" flex">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadc0n.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className=" ml-2 mt-1">{elem}</h1>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}