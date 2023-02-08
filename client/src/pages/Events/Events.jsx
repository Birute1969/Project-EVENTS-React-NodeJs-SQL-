import { useContext, useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { EventsContainer, 
    EventsList, 
    HoverOverlay, 
    HoverOverlayContent, 
    EventsListItem, 
    H1, 
    EventSpan } 
    from "./EventsStyled";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';
import { DateTime } from 'luxon';

export const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [client_name, setClient_Name] = useState('');
    const [client_surname, setClient_Surname] = useState('');
    const [client_email, setClient_Email] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const [event_title, setEvent_Title] = useState('');
    const [date, setDate] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events?userId=${user.id}`, {
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
                userId: user.id,
                timestamp: date
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

    const handleDeleteEvent = (id) => {
        if (window.confirm('Do you really want to delete this event?')) {
            fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setEvents(data);
            });
        }
    }

    console.log(Events);

    return (
        <EventsContainer>
            <EventsList>
            <H1>Events Registration List</H1>
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
                            type= "email"
                            onChange={(e) => setClient_Email(e.target.value)}
                            value={client_email}
                        />
                    <Input
                            placeholder="Phone Number +XXX XX XXXXX" 
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
                    <Input 
                        placeholder="Date"
                        type="datetime-local"
                        //required
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                    <Button>Add</Button>
                </Form>
            
            {events.map((event) => (
                <EventsListItem key={event.id} onClick={() => handleDeleteEvent(event.id)}>
                    <HoverOverlay>
                        <HoverOverlayContent>DELETE</HoverOverlayContent>
                    </HoverOverlay>
                    <EventSpan>{event.client_name}</EventSpan>
                    <EventSpan>{event.client_surname}</EventSpan>
                    <EventSpan>{event.client_email}</EventSpan>
                    <EventSpan>{event.phone_number}</EventSpan>
                    <EventSpan>{event.event_title} ({DateTime.fromISO(event.timestamp).toFormat('yyyy-LL-dd HH:mm')})</EventSpan>
                </EventsListItem>
            ))}
            </EventsList>
        </EventsContainer>
    );
}