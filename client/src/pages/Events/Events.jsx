import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';

const EventsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const EventsListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;
`;

const EventSpan = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const Events = () => {
    //susikuriame vidinį state
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [client_name, setClient_Name] = useState('');
    const [client_surname, setClient_Surname] = useState('');
    const [client_email, setClient_Email] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const [event_title, setEvent_Title] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setEvents(data);
                }
                setIsLoading(false);
             });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleEventAdd = () => {
        fetch(`${process.env.REACT_APP_API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                client_name, 
                client_surname,
                client_email,
                phone_number,
                event_title,
                userId: user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            if (!data.error) {
                setEvents(data);
                setClient_Name('');
                setClient_Surname('');
                setClient_Email('');
                setPhone_Number('');
                setEvent_Title('');
            }
        });
    }
    console.log(Events);

    return (
        <>
            <EventsList>
                <h1>Events Page</h1>
                <Form onSubmit={handleEventAdd}>
                    <Input
                        placeholder="Client Name" 
                        required 
                        onChange={(e) => setClient_Name(e.target.value)}
                        value={client_name}
                    />
                    <Input
                        placeholder="Client Surname" 
                        required 
                        onChange={(e) => setClient_Surname(e.target.value)}
                        value={client_surname}
                    />
                    <Input
                        placeholder="Client Email" 
                        required 
                        onChange={(e) => setClient_Email(e.target.value)}
                        value={client_email}
                    />
                    <Input
                        placeholder="Phone Number" 
                        required 
                        onChange={(e) => setPhone_Number(e.target.value)}
                        value={phone_number}
                    />
                    <Input
                        placeholder="Event Title" 
                        required 
                        onChange={(e) => setEvent_Title(e.target.value)}
                        value={event_title}
                    />
                    <Button>Add</Button>
                </Form>
                {events.map((ev) => (
                    <EventsListItem key={ev.id}>
                        <EventSpan>{ev.client_name}</EventSpan>
                        <EventSpan>{ev.client_surname}</EventSpan>
                        <EventSpan>{ev.client_email}</EventSpan>
                        <EventSpan>{ev.phone_number}</EventSpan>
                        <EventSpan>{ev.event_title}</EventSpan>
                    </EventsListItem>
                ))}
            </EventsList>
        </>
    )
}