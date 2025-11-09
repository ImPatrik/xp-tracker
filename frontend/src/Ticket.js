function Ticket() {

async function submitTicket(el){
    el.preventDefault()

    try {
        let res = await fetch('http://localhost:3000/api', {
                           method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data:'this is my data'})
        })
    } catch (err) {
        console.log("we have an error", err)
    }
}

return (
        <div className="flex items-center justify-center columns-12 bg-slate-600 p-4">
            <title>
                Create New Ticket
            </title>
            <form 
                onSubmit={submitTicket} 
                className="w-full"
                style={{height:"1000px"}}
            >
                <label className="flex flex-wrap columns-12 p-4 text-white">
                    <span className="w-full">Title:</span>
                    <input 
                        name="titleInput" 
                        className="bg-slate-400 text-black w-full border border-slate-600"/>
                </label>
                <label className="flex flex-wrap columns-12 p-4 text-white">
                    <span className="w-full"> Description: </span>
                    <textarea 
                        name="descInput" 
                        className="bg-slate-400 text-black w-full border border-slate-600" 
                        rows={10} 
                    />
                </label>
                <div className="columns-12 flex">
                    <button
                        type="submit"
                        className="bg-blue-400 p-2 w-full hover:bg-blue-700"
                    >
                        Create Ticket
                    </button>
                </div>


            </form>
        </div>
    );
}

export default Ticket;