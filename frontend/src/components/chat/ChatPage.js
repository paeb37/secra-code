import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

import styles from './chat.module.css';
import axios from 'axios'; // Import Axios

import LoadingText from './LoadingText';

const URL = 'auth'; // change as needed

function ChatPage(props) {

    const logoPath = '/images/secra_logo.png';
    const [messages, setMessages] = useState(Array(0)); // empty array to start
    const navigate = useNavigate();
    const username = props.username;

    // use an array of dictionaries
    // for each dict:
    // prop 1: message itself
    // prop 2: loc (left vs. right for assistant vs. user)

    function onTextSubmit(new_message) {
        setMessages(messages => (
            [...messages, new_message] // this message is a dict (has text, sender as 2 fields)
        ));
    };

    // Generate JSX code for Display each item, Add array index as the key
    // for pos, it should be "left" for assistant and "right" for user
    /**
    const renderMessages = messages.map((item, index) => 
        <div key={index}>
            <TextBubble text={item['text']} sender={item['sender']}/>
        </div>
    );*/

    return (
        <>  

        <div class={styles.container}>
            <h1 id={styles.header}><span style={{color: 'blue'}} id="username">{username}</span>'s Assistant</h1>

            <h3>Your Message</h3>

            <form id="queryForm">
                <textarea name="query" id="query" placeholder="Your Query" style={{resize: 'vertical'}} required></textarea>
                <input type="submit" value="Submit" />
            </form>
        
            <h3>Assistant Response</h3>

            <p id="response">
                <LoadingText />
            </p>
        </div>

        <div class="container">
            <h3>Your Calendar</h3>

            <form id="calendarForm">
                <textarea type="text" name="choice" id="choice" placeholder="Choice" required></textarea>
                <input type="submit" value="Add to my Calendar" />
            </form>
        </div>
        
        {/*-- From tester1.secra calendar */}
        <p align="center">

        <iframe 
            src="https://calendar.google.com/calendar/embed?src=tester1.secra%40gmail.com&ctz=America%2FNew_York" 
            title="User's Google Calendar" 
            style={{ border: 0 }} 
            width="800" 
            height="600" >
        </iframe>

        </p>
        </>
    );
}

export default ChatPage;