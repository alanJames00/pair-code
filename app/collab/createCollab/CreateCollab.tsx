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


function CreateCollab() {

    const [userName, setUserName] = React.useState('');
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [isCreated, setCreated] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [copyBtn, setCopyBtn] = React.useState('Copy Link');

    const { toast } = useToast();

    async function handleCreate() {
        // disable button
        setSubmitting(true);
        // check if username is empty string
        if(userName.length == 0) {
            setSubmitting(false);
            return ;
        }
        
        else {
            
            console.log(userName);
            
            try {
                
                const result = await fetch('http://localhost:4000/collab/createRoom', {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name: userName
                    })
                });
                
                const respJson = await result.json();
                console.log(respJson);
                
                if(result.ok == true) {
                    // set the url and show the success card
                    setUrl(`https://localhost:3000/collab/join/${respJson.collabId}`);
                    setCreated(true);
                }
                else {

                    // show error toast
                }
            }
            catch(e) {
                console.log(e);
                // show the error toast
                
            }
            setSubmitting(false);
        }
    }

  return (
    
    <Card className="w-[400px]">

        {   !isCreated &&
            <div>
                <CardHeader>
        <CardTitle>Create Collab-Space</CardTitle>
        <CardDescription>Create a new CollabSpace with Editor in one-click.</CardDescription>
      </CardHeader> 
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your Name (Host) ( Visible to Other Members )</Label>
              <Input id="name" placeholder="Your Name" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button
            disabled={isSubmitting}
            type="submit" onClick={handleCreate}>Create Space</Button>
      </CardFooter>
            </div>
        }

        {
            isCreated && 
            <div>
            <CardHeader>
    <CardTitle>Collab-Space Created 🚀</CardTitle>
    <CardDescription>Share This Link With Your Members. Then Go To The Space By Clicking Button</CardDescription>
  </CardHeader> 
  <CardContent>
    
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="url">Collab-Space Link</Label>
          <Input id="url"
            type="text"
            readOnly={true}
            spellCheck={false}
            autoCorrect="off"
            value={url}
            />
        <Button
            onClick={() => {
                navigator.clipboard.writeText(url);
                setCopyBtn('Link Copied')
            }}
            variant="outline">{copyBtn}</Button>
        </div>
        
      </div>
    
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel </Button>
    <Button>Go To Collab-Space &gt;</Button>
  </CardFooter>
        </div>
        }
      
    </Card>
  )
}

export default CreateCollab;
