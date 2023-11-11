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
import { useToast } from "@/components/ui/use-toast";

export default function JoinCollab({ collabId } : { collabId: string }) {

    const [collabLink, setCollabLink] = React.useState(collabId);
    const [userName, setUserName] = React.useState('');

    async function handleJoin() {
        
        try {

            const resp = await fetch('http://localhost:4000/collab/joinRoom', {
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
                // show toast
            }
        }
        catch(e) {

            console.log(e);
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
            value={`http://localhost:3000/collab/space/${collabLink}`}
            />
            <Label htmlFor="name">Your Name ( Visible to Other Members )</Label>
              <Input id="name" placeholder="Your Name" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
        </div>
        
      </div>
    
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel </Button>
    <Button
        onClick={handleJoin}
    >Join Now &gt;</Button>
  </CardFooter>
    </Card>
    </div>

   );

}