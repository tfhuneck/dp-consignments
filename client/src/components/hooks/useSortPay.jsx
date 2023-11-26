import { useReducer } from "react";

const ACTION = {
    SORTNAME: 'sortName',
    SORTPRICE: 'sortPrice',
    SORTTIME: 'sortTime',
    SORTDATE: 'sortDate' 
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.SORTNAME:
            return {
                sortPrice: 'default', 
                sortPay: 'default',
                sortDate: 'default',
                sortName: action.value,
                sorted: action.filter
            }
        case ACTION.SORTPRICE:
            return {
                sortName: 'default', 
                sortPay: 'default',
                sortDate: 'default',
                sortPrice: action.value,
                sorted: action.filter
            }
        case ACTION.SORTPAY:
            return {
                sortName: 'default', 
                sortPrice: 'default',
                sortDate: 'default',
                sortPay: action.value,
                sorted: action.filter
            }
        case ACTION.SORTDATE:
            return{
                sortName: 'default', 
                sortPrice: 'default',
                sortPay: 'default',
                sortDate: action.value,
                sorted: action.filter
            }
        default:
            return state
    }
}

export const useSortPay = (data) => {
    
     const [ state, dispatch ] = useReducer(reducer, { sorted: [], sortName: 'default', sortPrice: 'default', sortPay: 'default', sortDate: 'default'});

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
            let sorted = data.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted });
        }
        if(state.sortPrice === 'ascend'){
            let sorted = data.sort((a,b) => (a.price < b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPRICE, value:'descend', filter: sorted  });
        }
        if(state.sortPrice === 'descend'){
            let sorted = data.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted  });
        }
    }
    const handleSortPay = () =>{
        if(state.sortPay === 'default'){
            let sorted = data.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPAY, value:'ascend', filter: sorted });
        }
        if(state.sortPay === 'ascend'){
            let sorted = data.sort((a,b) => (a.price < b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPAY, value:'descend', filter: sorted  });
        }
        if(state.sortPay === 'descend'){
            let sorted = data.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPAY, value:'ascend', filter: sorted  });
        }
    }
    const handleSortDate = () =>{
        if(state.sortDate === 'default'){
            let sorted = data.sort((a,b) => (a.endtime > b.endtime ? 1: -1));
            dispatch({ type: ACTION.SORTDATE, value:'ascend', filter: sorted });
        }
        if(state.sortDate === 'ascend'){
            let sorted = data.sort((a,b) => (a.endtime < b.endtime ? 1: -1));
            dispatch({ type: ACTION.SORTDATE, value:'descend', filter: sorted  });
        }
        if(state.sortDate === 'descend'){
            let sorted = data.sort((a,b) => (a.endtime > b.endtime ? 1: -1));
            dispatch({ type: ACTION.SORTDATE, value:'ascend', filter: sorted  });
        }
    }
     
    return {state, handleSortName, handleSortPrice, handleSortPay, handleSortDate} 
}
