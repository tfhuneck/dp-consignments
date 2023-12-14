import { useReducer } from "react";

const ACTION = {
    SORTNAME: 'sortName',
    SORTPRICE: 'sortPrice',
    SORTTIME: 'sortTime',
    SORTBIDS: 'sortBids'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.SORTNAME:
            return {
                sortPrice: 'default', 
                sortTime: 'default',
                sortBids: 'default',
                sortName: action.value,
                sorted: action.filter
            }
        case ACTION.SORTPRICE:
            return {
                sortName: 'default', 
                sortTime: 'default',
                sortBids: 'default',
                sortPrice: action.value,
                sorted: action.filter
            }
        case ACTION.SORTTIME:
            return {
                sortName: 'default', 
                sortPrice: 'default',
                sortBids: 'default',
                sortTime: action.value,
                sorted: action.filter
            }
        case ACTION.SORTBIDS:
            return {
                sortName: 'default', 
                sortPrice: 'default',
                sortTime: 'default',
                sortBids: action.value,
                sorted: action.filter
            }
        default:
            return state
    }
  }

export const useSort = (data) => {
    
     const [ state, dispatch ]                   = useReducer(reducer, { sorted: [], sortName: 'default', sortPrice: 'default', sortTime: 'default', sortBids: 'default'});

     const handleSortName = () =>{
         if(state.sortName === 'default'){
             let sorted = data.sort((a,b) => (a.title > b.title ? 1: -1));
             dispatch({ type: ACTION.SORTNAME, value:'ascend', filter: sorted });
         }
         if(state.sortName === 'ascend'){
             let sorted = data.sort((a,b) => (a.title < b.title ? 1: -1));
             dispatch({ type: ACTION.SORTNAME, value:'descend', filter: sorted  });
         }
         if(state.sortName === 'descend'){
             let sorted = data.sort((a,b) => (a.title > b.title ? 1: -1));
             dispatch({ type: ACTION.SORTNAME, value:'ascend', filter: sorted  });
         }
     }
     const handleSortPrice = () =>{
         if(state.sortPrice === 'default'){
             let sorted = data.sort((a,b) => (a.currentprice > b.currentprice ? 1: -1));
             dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted });
         }
         if(state.sortPrice === 'ascend'){
             let sorted = data.sort((a,b) => (a.currentprice < b.currentprice ? 1: -1));
             dispatch({ type: ACTION.SORTPRICE, value:'descend', filter: sorted  });
         }
         if(state.sortPrice === 'descend'){
             let sorted = data.sort((a,b) => (a.currentprice > b.currentprice ? 1: -1));
             dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted  });
         }
     }
     const handleSortTime = () =>{
         if(state.sortTime === 'default'){
             let sorted = data.sort((a,b) => (a.timeleft > b.timeleft ? 1: -1));
             dispatch({ type: ACTION.SORTTIME, value:'ascend', filter: sorted });
         }
         if(state.sortTime === 'ascend'){
             let sorted = data.sort((a,b) => (a.timeleft < b.timeleft ? 1: -1));
             dispatch({ type: ACTION.SORTTIME, value:'descend', filter: sorted  });
         }
         if(state.sortTime === 'descend'){
             let sorted = data.sort((a,b) => (a.timeleft > b.timeleft ? 1: -1));
             dispatch({ type: ACTION.SORTTIME, value:'ascend', filter: sorted  });
         }
     }
     const handleSortBids = () =>{
         if(state.sortBids === 'default'){
             let sorted = data.sort((a,b) => (a.bidcount > b.bidcount ? 1: -1));
             dispatch({ type: ACTION.SORTBIDS, value:'ascend', filter: sorted });
         }
         if(state.sortBids === 'ascend'){
             let sorted = data.sort((a,b) => (a.bidcount < b.bidcount ? 1: -1));
             dispatch({ type: ACTION.SORTBIDS, value:'descend', filter: sorted  });
         }
         if(state.sortBids === 'descend'){
             let sorted = data.sort((a,b) => (a.bidcount > b.bidcount ? 1: -1));
             dispatch({ type: ACTION.SORTBIDS, value:'ascend', filter: sorted  });
         }
     }
     
    return {state, handleSortName, handleSortPrice, handleSortTime, handleSortBids} 
}
