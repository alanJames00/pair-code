"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRecoilState } from "recoil";
import { userState } from "@/app/states/userState";
import Link from "next/link";


function CreateCollab() {

    const [userName, setUserName] = React.useState('');
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [isCreated, setCreated] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [copyBtn, setCopyBtn] = React.useState('Copy Link');
	const [collabId, setCollabId] = React.useState('');

	const [currentUser, setCurrentUser] = useRecoilState(userState);
	console.log(currentUser);
	
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
                
                const result = await fetch('https://api-pc.linkzip.co/collab/createRoom', {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name: userName,
                    })
                });
                
                const respJson = await result.json();
                console.log(respJson);
                
                if(result.ok == true) {
                    // set the url and show the success card
					
					// set the recoil userState
					setCurrentUser(userName); 
					
					setCollabId(respJson.collabId);
                    setUrl(`https://mypaircode.vercel.app/collab/join/${respJson.collabId}`);
                    setCreated(true);
                }
                else {
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                  })
                }
            }
            catch(e) {
                console.log(e);
                // show the error toast
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: 'Check your internet connectivity',
                  action: <ToastAction altText="Try again">Dismiss</ToastAction>,
              });
                
            }
            setSubmitting(false);
        }
    }

  return (
    
    <div>
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
	<Link href={`/collab/space/${collabId}`}><Button>Go To Collab-Space &gt;</Button></Link>
  </CardFooter>
        </div>
        }
      
    </Card>
    </div>
  )
}

export default CreateCollab;
