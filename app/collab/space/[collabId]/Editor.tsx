import Editor from '@monaco-editor/react';


export default function CodeEditor({ value, onChange } : { value:string, onChange: any }) {

    return (
    <div className='md:h-[90vh] md:w-[75%] h-[60vh]'>
       <Editor
      language='javascript'
      theme='vs-dark'
      value={value}
      onChange={onChange}
    />
    </div>
    );
}