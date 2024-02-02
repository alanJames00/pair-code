"use client"
import { userState } from "@/app/states/userState";
import { useRecoilState } from "recoil";
import CodeEditor from "./Editor";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { CodeContent } from "@/app/states/codeContent";
import { codeLang } from "@/app/states/codeLang";


export default function Page({ params } : { params: { collabId: string } }) {

    const [currentUser, setCurrentUser] = useRecoilState(userState);
    const [socket, setSocket] = useState<any>(null);
    const [activeUsers, setActiveUsers] = useState<any>([]);
    const [codeText, setCodeText] = useRecoilState(CodeContent);
    
    
    const [lang] = useRecoilState(codeLang);
    

    // console.log(codeText);
    

    // getActiveUsers();    
    console.log(activeUsers);
    
    async function  getActiveUsers() {
        
        try {

            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/collab/getActiveUsers?id=${params.collabId}`);
            const respJson = await resp.json();

            setActiveUsers(respJson);
            // construct the array to add you option
        }
        catch(e) {

            console.log(e);
        }
    }

    function emitCodeChange(e: any) {

        console.log(e);
        socket.emit('send-code-change', { code: e, user: currentUser });
    }
0

    const { toast } = useToast();

    console.log(currentUser);

    console.log("page render");

    // useEffect to connect to the ws server
    useEffect(() => {

        // connect to server
        const newSocket = io('https://ws-pc.linkzip.co/');
        setSocket(newSocket);
        
        // verify user
        
        // join room
        newSocket.emit('join-room', { collabId: params.collabId, user: currentUser});
        
        setTimeout(getActiveUsers,3000);

        // when other users join
        newSocket.on('user-joined', message => {
            
            console.log(`${message} joined the space`);
            toast({
                title: `${message} Joined Collab-Space`,
                description: `${message} has joined the Collab-Space Now`,
                action: <ToastAction altText="Try again">Dismiss</ToastAction>,
            });

           // call the api for active Users list
            setTimeout(getActiveUsers,2000);            

        })

        // handle code change
       
        newSocket.on('receive-code-change', message => {

            console.log(`${message.user} wrote ${message.code}`)
            // check if its written by current user himself
            setCodeText(message.code);
            
            // put a star on editing user

            
        })

        // when a user leaves
        newSocket.on('receive-left-room', userLeft => {
            toast({
                title: `${userLeft} Left Collab-Space`,
                description: `${userLeft} has left the Collab-Space now`,
                action: <ToastAction altText="Try again">Dismiss</ToastAction>,
            });

            setTimeout(getActiveUsers);
        });


        // cleanup when unmounted

        return () => {
            
            // send leaving room event
            newSocket.emit('send-left-room', currentUser);

            newSocket.disconnect();

        }
        
    }, []);


    return (
        <div>
            <div className=" mt-2 ml-2 mb-4 ">
                <h1 className=" text-3xl font-bold">PairCode</h1>
                
            </div>
            <div className=" md:flex">
            <CodeEditor value={codeText} lang={lang.name} onChange={(e: any) => {
                // change the localcode state
                setCodeText(e);

                // emit the code change
                emitCodeChange(e);
            }}/>
            <SideBar members={activeUsers}/>
            </div>
        </div>
    );
}