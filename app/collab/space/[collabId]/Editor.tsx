import Editor from '@monaco-editor/react';


export default function CodeEditor({ value, onChange, lang } : { value:string, onChange: any, lang: string }) {

    return (
    <div className='md:h-[90vh] md:w-[75%] h-[60vh]'>
       <Editor
      language={lang}
      theme='vs-dark'
      value={value}
      onChange={onChange}
    />
    </div>
    );
}