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

export default function SideBar({ members }: { members: any[]}) {

    const [output, setOutput] = useRecoilState(CodeResult);
    const [lang, setLang] = useRecoilState(codeLang);


    return (
        <div className=" m-6">
            <h1 className=" text-2xl font-semibold mb-4"> PairCode: CollabSpace</h1>

            <div className=" mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">{`Change Language: ${lang}`}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
                  <DropdownMenuRadioItem value="javascript">javascript</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="python">python</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="c/c++">c/c++</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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