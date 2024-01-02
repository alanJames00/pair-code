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


function CreateCollab() {

    const [userName, setUserName] = React.useState('');

    async function handleCreate() {

    }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create Collab-Space</CardTitle>
        <CardDescription>Create a new CollabSpace with Editor in one-click.</CardDescription>
      </CardHeader> 
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your Name (Host) (Visible to Other Members )</Label>
              <Input id="name" placeholder="Your Name" />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create Space</Button>
      </CardFooter>
    </Card>
  )
}

export default CreateCollab;
