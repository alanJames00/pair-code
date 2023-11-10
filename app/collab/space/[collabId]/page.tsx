"use client"
import { userState } from "@/app/states/userState";
import { useRecoilState } from "recoil";
import CodeEditor from "./Editor";
import SideBar from "./SideBar";


export default function Page() {

    const [currentUser, setCurrentUser] = useRecoilState(userState)

    console.log(currentUser);


    return (
        <div>
            
            <div className=" md:flex">
            <CodeEditor value=""/>
            <SideBar members={[currentUser]}/>
            </div>
        </div>
    );
}