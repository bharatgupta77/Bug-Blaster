import React, {useState} from 'react';

export default function TicketForm({dispatch, editingTicket}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1');

    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    }

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const ticketData = {
            id: editingTicket? editingTicket.id :  Date().toISOString(),
            title,
            description,
            priority
        }
        //console.log(ticketData);

        dispatch({
            type: editingTicket? 'UPDATE_TICKET':'ADD_TICKET',
            payload: ticketData});

        clearForm();
    }


    return (
        <form onSubmit={handleSubmit} className="ticket-form">
            <div>
                <label htmlFor="title">Title</label>
                <input type="text"
                       id="title"
                       className="form-input"
                       value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description"
                          className="form-input"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
            </div>
            <fieldset className="priority-fieldset">
                <legend>Priority</legend>
                {
                    Object.entries(priorityLabels).map(([value, label]) => (
                        <label key={value} className="priority-label">
                            <input
                                type="radio"
                                value={value}
                                checked={priority === value}
                                className="priority-input"
                                onChange={(e) => setPriority(e.target.value)}>
                            </input>
                            {label}
                        </label>
                    ))
                }
            </fieldset>

            <button type="submit" className="button">Submit</button>
        </form>
    )

}