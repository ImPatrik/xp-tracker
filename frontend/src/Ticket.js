function Ticket() {
return (
        <div style={{display:"flex", flexWrap:"wrap"}}>
            <form>
                <label>
                    Title:
                    <input name="titleInput" />
                </label>
                <label>
                    Description:
                    <textarea name="descInput" rows={4} cols={40}/>
                </label>
                <button>Create Ticket</button>
            </form>
        </div>
    );
}

export default Ticket;