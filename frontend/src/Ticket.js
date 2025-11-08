function Ticket() {
return (
        <div>
            <form className="bg-blue-500">
                <label>
                    Title:
                    <input name="titleInput" />
                </label>
                <label>
                    Description:
                    <textarea name="descInput" rows={4} cols={40}/>
                </label>
                <button>Create Ticket</button>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                    Create Ticket
                </button>
            </form>
        </div>
    );
}

export default Ticket;