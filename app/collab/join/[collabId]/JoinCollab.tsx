"use client"
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useRecoilState } from "recoil"
import { userState } from "@/app/states/userState"
import Link from "next/link"

export default function JoinCollab({ collabId } : { collabId: string }) {

    const [collabLink, setCollabLink] = React.useState(collabId);
    const [userName, setUserName] = React.useState('');
    const [hasJoined, setJoined] = React.useState(false);

    const [currentUser, setCurrentUser] = useRecoilState(userState);
    console.log(currentUser);
    

    const { toast } = useToast()

    async function handleJoin() {
        
        try {

            console.log('trying');
            const resp = await fetch('https://api-pc.linkzip.co/collab/joinRoom', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    collabId: collabLink
                })
            });

            const respJson = await resp.json();
            
            
            
            if(resp.ok == false ) {
                // show error toast
                console.log(respJson);
                
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: 'This CollabID Does not Exist',
                    action: <ToastAction altText="Try again">Dismiss</ToastAction>,
                });
            }

            else if(resp.ok == true) {
                console.log(respJson);
                
                // add the user state to recoil state
                setCurrentUser(userName);

                // disable all inputs once joined


                // set joined state
                setJoined(true);
                
                
                // show success toast of joining
                toast({
                    title: "You Have Joined the Collab-Space.",
                    description: 'You can now go the Collab-Space by Clicking the Go to Collab-Space Button',
                    action: <ToastAction altText="Try again">Dismiss</ToastAction>,
                });
                
            }
        }
        catch(e) {

            console.log(e);
            // show a error toast

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: 'Check your internet connectivity',
                action: <ToastAction altText="Try again">Dismiss</ToastAction>,
            });
        }
    }

    return (
        <div className=" flex justify-center mt-40">

        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Join Collab-Space </CardTitle>
                <CardDescription>You are invited to join this CollabSpace</CardDescription>
            </CardHeader> 
            
            <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="url">Collab-Space Link</Label>
                    <Input id="url"
                      type="text"
                      spellCheck={false}
                      autoCorrect="off"
                      value={`${collabLink}`}
                      />
                      <Label htmlFor="name">Your Name ( Visible to Other Members )</Label>
                        <Input id="name" placeholder="Your Name" 
                          value={userName}
                          disabled={hasJoined}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                  </div>
                </div>
    
                 </CardContent>
                    <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel </Button>
                    {
                        !hasJoined &&
                            <Button
                            onClick={handleJoin}
                            >Join Now &gt;</Button>
                    }
                    
                    {
                        hasJoined && 
                            <Link href={`/collab/space/${collabLink}`}>
                                <Button>Go to Collab-Space &gt;</Button>
                            </Link>
                    }
                    </CardFooter>
            </Card>
        </div>

   );

}