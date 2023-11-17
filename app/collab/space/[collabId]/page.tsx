"use client"
import { userState } from "@/app/states/userState";
import { useRecoilState } from "recoil";
import CodeEditor from "./Editor";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"


export default function Page({ params } : { params: { collabId: string } }) {

    const [currentUser, setCurrentUser] = useRecoilState(userState);
    const [socket, setSocket] = useState<any>(null);
    const [activeUsers, setActiveUsers] = useState<any>([]);

    const { toast } = useToast();

    console.log(currentUser);

    console.log("page render");

    // useEffect to connect to the ws server
    useEffect(() => {

        // connect to server
        const newSocket = io('http://localhost:4001');
        setSocket(newSocket);

        // verify user

        // join room
        newSocket.emit('join-room', { collabId: params.collabId, user: currentUser});4

        // when other users join
        newSocket.on('user-joined', message => {
            console.log(`${message} joined the space`);
            toast({
                title: `${message} Joined Collab-Space`,
                description: `${message} has joined the Collab-Space Now`,
                action: <ToastAction altText="Try again">Dismiss</ToastAction>,
            });

            setActiveUsers((prev: any[]) => [...prev, message]);
        })

        // cleanup when unmounted


    }, []);


    return (
        <div>
            <div className=" mt-2 ml-2 mb-4 ">
                <h1 className=" text-3xl font-bold">PairCode</h1>
            </div>
            <div className=" md:flex">
            <CodeEditor value=""/>
            <SideBar members={[`${currentUser} (You)`,...activeUsers]}/>
            </div>
        </div>
    );
}