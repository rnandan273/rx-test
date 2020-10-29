import { Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';

const subject = new Subject();

const initialState = {
	data: [],
 	newDataCount: 0
}; 

let state = initialState;

const appStore = {
	  init: () => state = {...state, newDataCount: 0},
  	subscribe: setState => subject.subscribe(setState),
  	sendMessage: message => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1
     };
     subject.next(state);
    },
    clearChat: () => {
      state = {...state, data: []};
      subject.next(state);
    },
    initialState,
};


export default appStore;