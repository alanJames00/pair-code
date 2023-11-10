import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link';

function HomePage() {
  return (
    <div className=' mt-32'>

        <h1 className=" flex justify-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
            Pair Code: Instant Collaborative Code Editor
        </h1>

        <div className=' flex justify-center'>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Realtime Collaboration With Easy Sharable Links</li>
                <li>Built-in Code Compiler</li>
                <li>Growing Programming Languages Support With 10+ Languages</li>
            </ul>
        </div>

        <div className=' flex justify-center mt-4'>
            <Link href={'/collab/createCollab'}></Link>
            <Button>Create An Instant Collab-Space Now &gt; &gt;</Button>
        </div>
    </div>
  );
}

export default HomePage
