import styled from "styled-components";

export const EventsContainer = styled.div`
    background-image: url("images/image_1.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: absolute;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;
export const EventsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style: none;
    overflow-y: scroll;
`;
export const HoverOverlay = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
`;
/*uždedame raudoną teksto spalvą*/
export const HoverOverlayContent = styled.div`
    color: orangered;
    font-size: 20px;
    font-weight: 800;
`;
/*į EventsListItem įdėsime HoverOverlay*/
export const EventsListItem = styled.li`
    align-items: center;
    background: rgb(221,241,240);
    background: linear-gradient(0deg, rgba(221,241,240,0.9864320728291317) 47%, rgba(70,252,189,1) 100%);
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin-top: 10px ;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;

/*elementas "HoverOverlay" ateina iš "EventsListItem"*/
    ${HoverOverlay} {
        visibility: hidden;
    }
    &:hover {
        ${HoverOverlay} {
            visibility: visible;
    }
}
`;
export const H1 = styled.h1`
    text-align: center;
    color: #24a0ed;
`;
export const EventSpan = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;