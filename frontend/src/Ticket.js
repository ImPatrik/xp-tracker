import { useState } from "react";

function Ticket() {
const [ticket, setTicket] = useState({
    'title': '',
    'description': '',
    'priority': 'medium',
    'submittedBy': '',
})
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/create-ticket', {
            'method': 'POST',
            'headers': {'Content-Type': 'application/json' },
            'body': JSON.stringify(ticket)
        })
        if(response.ok){
            alert('Ticket HAS BEEN MADE LFG');
            setTicket({
                'title': '',
                'description': '',
                'priority': 'medium',
                'submittedBy': '',
            })
        }
    } catch(error){
        console.log('Something is not correct', error)
        alert('You have broken something within the ticket system')
    }
};
return (
    <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Your Name"
        value={ticket.submittedBy}
        onChange={(e) => setTicket({...ticket, submittedBy: e.target.value})}
        required
        />
        <input 
        type="text"
        placeholder="Ticket Title"
        value={ticket.title}
        onChange={(e) => setTicket({...ticket, title: e.target.value})}
        required
        />
        <textarea
        placeholder="Describe your issue"
        value={ticket.description}
        onChange={(e) => setTicket({...ticket, description: e.target.value})}
        required
        />
        <select 
        value={ticket.priority}
        onChange={(e) => setTicket({...ticket, priority: e.target.value})}
        >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>
            <button type="submit">Submit Ticket HOMIE</button>
    </form>
)
}
// async function submitTicket(el){
//     el.preventDefault()

//     try {
//         let res = await fetch('http://localhost:3000/api', {
//                            method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({data:'this is my data'})
//         })
//     } catch (err) {
//         console.log("we have an error", err)
//     }
// }

// return (
//         <div className="flex items-center justify-center columns-12 bg-slate-600 p-4">
//             <title>
//                 Create New Ticket
//             </title>
//             <form 
//                 onSubmit={submitTicket} 
//                 className="w-full"
//                 style={{height:"1000px"}}
//             >
//                 <label className="flex flex-wrap columns-12 p-4 text-white">
//                     <span className="w-full">Title:</span>
//                     <input 
//                         name="titleInput" 
//                         className="bg-slate-400 text-black w-full border border-slate-600"/>
//                 </label>
//                 <label className="flex flex-wrap columns-12 p-4 text-white">
//                     <span className="w-full"> Description: </span>
//                     <textarea 
//                         name="descInput" 
//                         className="bg-slate-400 text-black w-full border border-slate-600" 
//                         rows={10} 
//                     />
//                 </label>
//                 <div className="columns-12 flex">
//                     <button
//                         type="submit"
//                         className="bg-blue-400 p-2 w-full hover:bg-blue-700"
//                     >
//                         Create Ticket
//                     </button>
//                 </div>


//             </form>
//         </div>
//     );
// }

export default Ticket;