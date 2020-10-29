import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { useState,useLayoutEffect } from  "react";
import appStore from "./appstore";
import { fromEvent, Observable } from 'rxjs';


function MyApp() {
	   const [appState, setAppState] = useState(appStore.initialState);
	   useLayoutEffect(()=> {
    		appStore.subscribe(setAppState);
    		appStore.init();
  		},[]);

	   const onFormSubmit = e => {
    		e.preventDefault();
    		appStore.clearChat();
    		appStore.sendMessage({pressure:"100",temperature:"200",humidity:"400"})
    	};

	   
		return (
             <div id="messageForm">
                 <h2 style={{margin:"2em"}}> Experimenting with Observables</h2>
	             <div style={{margin:"2em"}}>
	             	{appState.data.map(message => (
	             		<div>
	             		<p> Pressure :   {message.pressure} </p>
	             	
	             		<p>Temperature :  {message.temperature}</p>
	             
	             		<p>Humidity :   {message.humidity}</p>
	             	
	             		</div>))}
	             </div>
	             <form id="messageForm" onSubmit={onFormSubmit}>
	               <div>
	         			<button style={{margin:"2em"}} type="submit">Add</button> 
	        		 	<button type="clear" onClick={() => appStore.clearChat()}>Clear</button>
	      			</div>
	      		</form>
             </div>	
      	);

}

const observable = new Observable(function subscribe(subscriber) {
  	const id = setInterval(() => {
    	subscriber.next(Math.random())}, 1000);
});

observable.subscribe(x => {
	console.log(x);
	appStore.clearChat();
    appStore.sendMessage({pressure:50*x,temperature:200*x,humidity:100*x});
});




ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
