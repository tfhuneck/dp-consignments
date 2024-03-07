import { useState, useEffect } from "react";

export const useDisplayList = () => {

    const [ displayList, setDisplayList ]   = useState('');
    const activeListButton                  = document.getElementById('dashListActive');
    const pendingListButton                 = document.getElementById('dashListPending');
    const soldListButton                    = document.getElementById('dashListSold');
    const unsoldListButton                  = document.getElementById('dashListUnsold');
    const summaryListButton                 = document.getElementById('dashListSummary');

    useEffect(()=> {
        setDisplayList('activeListings')
    }, [])

    useEffect(()=> {
        if(activeListButton && soldListButton && pendingListButton && summaryListButton){
            if(displayList === 'activeListings'){
                activeListButton.className = 'dash-list btn-active';
                pendingListButton.className = 'dash-list';
                soldListButton.className = 'dash-list';
                unsoldListButton.className = 'dash-list';
                summaryListButton.className = 'dash-list';
            }
            if(displayList === 'pendingListings'){
                activeListButton.className = 'dash-list';
                pendingListButton.className = 'dash-list btn-active';
                soldListButton.className = 'dash-list';
                unsoldListButton.className = 'dash-list';
                summaryListButton.className = 'dash-list';
            }
            if(displayList === 'soldListings'){
                activeListButton.className = 'dash-list';
                pendingListButton.className = 'dash-list';
                soldListButton.className = 'dash-list btn-active';
                unsoldListButton.className = 'dash-list';
                summaryListButton.className = 'dash-list';
            } 
            if(displayList === 'unsoldListings'){
                activeListButton.className = 'dash-list';
                pendingListButton.className = 'dash-list';
                soldListButton.className = 'dash-list';
                unsoldListButton.className = 'dash-list btn-active';
                summaryListButton.className = 'dash-list';
            } 
            if(displayList === 'summaryListings'){
                activeListButton.className = 'dash-list';
                pendingListButton.className = 'dash-list';
                soldListButton.className = 'dash-list';
                unsoldListButton.className = 'dash-list';
                summaryListButton.className = 'dash-list btn-active';
            } 
        };
        console.log('buttons updated and active button is:', displayList)
    },[displayList, activeListButton, soldListButton]);

    return { displayList, setDisplayList }
}