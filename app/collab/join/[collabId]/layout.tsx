"use client"
import { Toaster } from "@/components/ui/toaster"
import { RecoilRoot } from "recoil"

export default function Layout({ children } : { children: string} ) {

    return(
        <RecoilRoot>
            <div>
                <div>
                    { children }

                </div>
                <Toaster />
            </div>
        </RecoilRoot>
    );
}