"use client"
import { userState } from "@/app/states/userState";
import { useRecoilState } from "recoil";
import CodeEditor from "./Editor";


export default function Page() {

    const [currentUser, setCurrentUser] = useRecoilState(userState)

    console.log(currentUser);

    return (
        <div>
            
            <div>
            <CodeEditor />
            </div>
        </div>
    );
}