import { useReducer, useEffect } from "react";

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
                sortName: action.value,
                sorted: action.filter
            }
        case ACTION.SORTPRICE:
            return {
                sortName: 'default', 
                sortPrice: action.value,
                sorted: action.filter
            }
        case ACTION.SORTTIME:
            return {
                sortName: 'default', 
                sortPrice: 'default',
                sorted: action.filter
            }
        case ACTION.SORTBIDS:
            return {
                sortName: 'default', 
                sortPrice: 'default',
                sorted: action.filter
            }
        default:
            return state
    }
  }

export const useSort = (data) => {
    
     const [ state, dispatch ] = useReducer(reducer, { sorted: [], sortName: 'default', sortPrice: 'default', sortTime: 'default', sortBids: 'default'});

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
             let sorted = data.sort((a,b) => (data.status === 'active' || data.status === 'unsold' ? a.currentprice > b.currentprice ? 1: -1 : a.finalprice > b.finalprice ? 1: -1));
             dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted });
         }
         if(state.sortPrice === 'ascend'){
             let sorted = data.sort((a,b) => (data.status === 'active' || data.status === 'unsold' ? a.currentprice < b.currentprice ? 1: -1 : a.finalprice < b.finalprice ? 1: -1));
             dispatch({ type: ACTION.SORTPRICE, value:'descend', filter: sorted  });
         }
         if(state.sortPrice === 'descend'){
             let sorted = data.sort((a,b) => (data.status === 'active' || data.status === 'unsold' ? a.currentprice > b.currentprice ? 1: -1 : a.finalprice > b.finalprice ? 1: -1));
             dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted  });
         }
     }

    return {state, handleSortName, handleSortPrice} 
}
