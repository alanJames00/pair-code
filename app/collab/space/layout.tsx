import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }: { children : string }) {

    return (
        <div>
            <div>
                { children }
                <Toaster />
            </div>
        </div>
    );
}