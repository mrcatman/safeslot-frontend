import { readable, derived, get } from 'svelte/store';
import io from 'socket.io-client';
const socket = io('http://173.249.11.64:3001');
socket.emit('room', window.location.hash.substring(1));

export const params = readable({}, function start(set) {
    socket.on('params', (params) => {
        set(params);
    });
    return function stop() {

    };
});

export const data = readable({
    loading: true,
}, function start(set) {
    socket.on('initial_state', (state) => {
        //console.log(state);
        //setTimeout(() => {
         //   state = {"conversationId":2000000002,"users":[{"id":244560941,"first_name":"Филипп","last_name":"Макеев","is_closed":false,"can_access_closed":true,"sex":2,"screen_name":"taijin__kyofusho","photo_50":"https://sun9-35.userapi.com/c851028/v851028961/12ddc4/ClKE4rAfzNs.jpg?ava=1","photo_100":"https://sun9-9.userapi.com/c851028/v851028961/12ddc3/N0CyetUYr7Q.jpg?ava=1","online":1,"online_info":{"visible":true,"is_online":true}}],"state":"STATE_ROUND_WIN","selectionAnswers":[{"userId":244560941,"number":500,"time":1578422798301,"name":"Филипп Макеев","seconds":3.894,"best":true}],"selectionData":{"number":508,"min":447,"max":563,"random_string":"","timestamp":1578422794407,"md5":"80b0d9a97d081dd310e18bf3ea727954","string":"awdA508_gQeP"},"round":1,"field":[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]],"fieldElements":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"fieldObject":[
        //        [{"number":"01","empty":true},{"number":"02","empty":true},{"number":"03","selected":true,"correct":true},{"number":"04","empty":true},{"number":"05","empty":true}],[{"number":"06","empty":true},{"number":"07","fatal":true},{"number":"08","empty":true},{"number":"09","empty":true},{"number":10,"empty":true}],[{"number":11,"empty":true},{"number":12,"empty":true},{"number":13,"empty":true},{"number":14,"empty":true},{"number":15,"empty":true}]
       //         ],"fatalsString":"zH5eCj_7_8wJ","currentSum":1,
       //         "treeObject":[{"sum":"1.00 Р","current":false,"safetyNet":false},{"sum":"2.50 Р","current":true,"safetyNet":false},{"sum":"5.00 Р","current":false,"safetyNet":false},{"sum":"10.00 Р","current":false,"safetyNet":false},{"sum":"25.00 Р","current":false,"safetyNet":true},{"sum":"50.00 Р","current":false,"safetyNet":false},{"sum":"150.00 Р","current":false,"safetyNet":false},{"sum":"500.00 Р","current":false,"safetyNet":false},{"sum":"1000.00 Р","current":false,"safetyNet":false}],
      //          "safetyNets":[3,6],"hasBomb":true,"hints":{"alternative":{"usedAt":null,"name":"alt","fullName":"Альтернатива"},"locator":{"usedAt":null,"name":"loc","fullName":"Локатор"},"gps":{"usedAt":null,"name":"gps","fullName":"Навигатор"}},"selectedHint":null,"usedHint":false,"player":{"id":244560941,"first_name":"Филипп","last_name":"Макеев","is_closed":false,"can_access_closed":true,"sex":2,"screen_name":"taijin__kyofusho","photo_50":"https://sun9-35.userapi.com/c851028/v851028961/12ddc4/ClKE4rAfzNs.jpg?ava=1","photo_100":"https://sun9-9.userapi.com/c851028/v851028961/12ddc3/N0CyetUYr7Q.jpg?ava=1","online":1,"online_info":{"visible":true,"is_online":true}}}
      //      set(state);
      //  }, 3000);
        set(state);
    });

    socket.on('update', (update) => {
        console.log(update);
        let state = get(data);
        set({
            ...state,
            ...update
        })
    });

    return function stop() {

    };
});

export const loading = derived(
    data,
    ($data => {
        return !!$data.loading
    })
);

export const states = derived(
    params,
    ($params => {
        return {
            states: $params && $params.states ? $params.states : {}
        }
    })
);

export const intervals = derived(
    params,
    ($params => {
        return $params && $params.intervals ? $params.intervals : {}
    })
);

export const hintData = derived(
    data,
    ($data => {
        return {
            hasBomb: $data.hasBomb,
            hints: $data.hints,
            selectedHint: $data.selectedHint,
            usedHint: $data.usedHint
        }
    })
);

export const selectionData = derived(
    data,
    ($data => {
        return $data.selectionData
    })
);

export const selectionAnswers = derived(
    data,
    ($data => {
        return $data && $data.selectionAnswers ? $data.selectionAnswers : []
    })
);

export const treeObject = derived(
    data,
    ($data => {
        return $data && $data.treeObject ? $data.treeObject : []
    })
);

export const fieldObject = derived(
    data,
    ($data => {
        return $data && $data.fieldObject ? $data.fieldObject : []
    })
);

export const player = derived (
    data,
    ($data => {
        return $data && $data.player ? $data.player : {}
    })
);


export const state = derived(
    data,
    ($data => {
        return $data.state
    })
);

