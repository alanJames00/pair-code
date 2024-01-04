"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OutputTerminal from "./Output";
import { CodeResult } from "@/app/states/codeResult";
import { useRecoilState } from "recoil";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { codeLang } from "@/app/states/codeLang";
import { CodeContent } from "@/app/states/codeContent";

export default function SideBar({ members }: { members: any[]}) {

    const [output, setOutput] = useRecoilState(CodeResult);
    const [lang, setLang] = useRecoilState(codeLang);

    const [codeText] = useRecoilState(CodeContent);
    console.log(codeText);


    const langArray = [ {name:'javascript', val:'js'}, {name:'python',val:'py'}, {name:'c',val:'c'} , {name:'rust', val:'rs'}, {name:'java' ,val:'java'}]

    async function handleCodeRun() {
       
        try {

            const reqBody = {
    
                    // language: runtime.val,
                    // version: (langVers.find(opt => opt.val == runtime.val)).ver,
                    // files: [
                    //     {
                    //         name: `sample_code.${runtime.val}`,
                    //         content: codeText,
                    //     }
                    // ],
                    // stdin: "",
                    // args: ["1", "2", "3"],
                    // compile_timeout: 10000,
                    // run_timeout: 3000,
                    // compile_memory_limit: -1,
                    // run_memory_limit: -1
                }
                
            const resp = await fetch('https://emkc.org/api/v2/piston/execute', {method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            }, body: JSON.stringify(reqBody) } );
            
            const respJson = await resp.json();
            // handle code results
        }
        catch(e) {
            console.log(e);
            
        }

    }
    


    return (
        <div className=" m-6">
            <h1 className=" text-2xl font-semibold mb-4"> PairCode: CollabSpace</h1>

            <div className=" mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className=" w-60" variant="secondary">{`Change Language: ${lang.name}`}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={lang.name} onValueChange={(e) => {
                    const a = langArray.find((elem) => elem.name == e );
                    console.log(a);
                    setLang(a);
                } }>
                    {
                        langArray.map((elem) => (
                            <DropdownMenuRadioItem value={elem.name}>{elem.name}</DropdownMenuRadioItem>
                        ))
                    }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className=" ml-4">Run</Button>
            </div>

            <div className=" mb-4">
                <OutputTerminal output={output}/>
            </div>

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