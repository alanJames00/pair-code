

export default function OutputTerminal({ output } : { output : string}) {

    return (
        <div>
                <h1 className=" text-lg">Output</h1>
            <div style={{height: '15vw'}} className=" bg-gray-700">
                    
                    <div className=" mt-2 ml-2">
                        { output}
                    </div>

            </div>
        </div>
    );
}   