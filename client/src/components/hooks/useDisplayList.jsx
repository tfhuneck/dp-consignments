import { useState, useEffect } from "react";

export const useDisplayList = () => {

    const [ displayList, setDisplayList ]   = useState('');
    const activeListButton                  = document.getElementById('dashListActive');
    const pendingListButton                 = document.getElementById('dashListPending');
    const soldListButton                    = document.getElementById('dashListSold');

    useEffect(()=> {
        setDisplayList('activeListings')
    }, [])

    useEffect(()=> {
        if(activeListButton && soldListButton && pendingListButton){
            if(displayList === 'activeListings'){
                activeListButton.className = 'dash-list btn-active';
                pendingListButton.className = 'dash-list';
                soldListButton.className = 'dash-list';
            }
            if(displayList === 'pendingListings'){
                activeListButton.className = 'dash-list';
                pendingListButton.className = 'dash-list btn-active';
                soldListButton.className = 'dash-list';
            }
            if(displayList === 'soldListings'){
                activeListButton.className = 'dash-list';
                pendingListButton.className = 'dash-list';
                soldListButton.className = 'dash-list btn-active';
            } 
        };
        console.log('buttons updated and active button is:', displayList)
    },[displayList, activeListButton, soldListButton]);

    return { displayList, setDisplayList }
}