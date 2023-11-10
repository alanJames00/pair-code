import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';


export default function CodeEditor({ value } : { value:string }) {

    const [editorWidth, setEditorWidth] = useState(window.innerWidth);
    const [paddingRatio, setPaddingRatio] = useState(1);
    console.log(editorWidth);
    

    useEffect(() => {

        const handleResize = () => {

            if(window.innerWidth >= 768) {
                setEditorWidth(window.innerWidth - 400);
            }
            else{
                setEditorWidth(window.innerWidth);
            }
            
        }



        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    return (
        <>
       <Editor
      height="90vh"
      language='javascript'
      value={value}
      width={editorWidth}
    />
    </>
    );
}