import { useReducer, useMemo } from "react";

const ACTION = {
    ALL: 'all',
    ACTIVE: 'active',
    PENDING: 'pending',
    SOLD: 'sold',
    UNSOLD: 'unsold',
    CANCELED: 'canceled'
}

const reducer = (stateInclude, action) => {
    switch(action.type) {
        case ACTION.ALL :
            return {
                include : ['active', 'pending', 'sold', 'unsold', 'canceled'],
                all: 'on',
                active: 'off',
                pending: 'off',
                sold: 'off',
                unsold: 'off',
                canceled: 'off',
                dataIncluded: action.includeData
            }
        case ACTION.ACTIVE :
            console.log(action)
            return {
                all: action.checkedAll,
                active: action.checkedActive,
                pending: action.checkedPending,
                sold: action.checkedSold,
                unsold: action.checkedUnsold,
                canceled: action.checkedCanceled,
                include: action.includeFilter,
                dataIncluded: action.includeData
            }
        case ACTION.PENDING :
            console.log(action)
            return {
                all: action.checkedAll,
                active: action.checkedActive,
                pending: action.checkedPending,
                sold: action.checkedSold,
                unsold: action.checkedUnsold,
                canceled: action.checkedCanceled,
                include: action.includeFilter,
                dataIncluded: action.includeData
            }
        case ACTION.SOLD :
            console.log(action)
            return {
                all: action.checkedAll,
                active: action.checkedActive,
                pending: action.checkedPending,
                sold: action.checkedSold,
                unsold: action.checkedUnsold,
                canceled: action.checkedCanceled,
                include: action.includeFilter,
                dataIncluded: action.includeData
            }
        case ACTION.UNSOLD :
            console.log(action)
            return {
                all: action.checkedAll,
                active: action.checkedActive,
                pending: action.checkedPending,
                sold: action.checkedSold,
                unsold: action.checkedUnsold,
                canceled: action.checkedCanceled,
                include: action.includeFilter,
                dataIncluded: action.includeData
            }
        case ACTION.CANCELED :
            console.log(action)
            return {
                all: action.checkedAll,
                active: action.checkedActive,
                pending: action.checkedPending,
                sold: action.checkedSold,
                unsold: action.checkedUnsold,
                canceled: action.checkedCanceled,
                include: action.includeFilter,
                dataIncluded: action.includeData
            }
            default:
                return stateInclude
    }
}

export const useInclude = (data) => {

    const [ stateInclude, dispatch ] = useReducer(reducer, { include : [
        'active', 'pending', 'sold', 'unsold', 'canceled'
        ],
        all: 'on',
        active: 'off',
        pending: 'off',
        sold: 'off',
        unsold: 'off',
        canceled: 'off',
        dataIncluded: data
    });

    useMemo(() => {
        if(data){
            let filtered = ['active', 'pending', 'sold', 'unsold', 'canceled']
            dispatch({type: ACTION.ALL, 
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
            })
        }
    }, [data])

    const handleAll = () => {
        let filtered = ['active', 'pending', 'sold', 'unsold', 'canceled']
        dispatch({type: ACTION.ALL, 
            includeData: data.filter((i) => filtered.some((n) => n === i.status))
        })
    }

    const handleActive = () => {
        if(stateInclude.all === 'on'){
            let filtered = ['active']
            dispatch({
                type: ACTION.ACTIVE, 
                checkedAll: 'off',
                checkedActive: 'on',
                checkedPending: 'off',
                checkedSold: 'off',
                checkedUnsold: 'off',
                checkedCanceled: 'off',
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.active === 'on'){
            let included = [...stateInclude.include]
            let filtered = included.filter((i) => i !== 'active');
            dispatch({
                type: ACTION.ACTIVE, 
                checkedAll: 'off',
                checkedActive: 'off',
                checkedPending: stateInclude.pending,
                checkedSold: stateInclude.sold,
                checkedUnsold: stateInclude.unsold,
                checkedCanceled: stateInclude.canceled,
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
       if(stateInclude.all === 'off' && stateInclude.active === 'off'){
            let included = [...stateInclude.include]
            included.push('active')
            dispatch({
                type: ACTION.ACTIVE, 
                checkedAll: 'off',
                checkedActive: 'on',
                checkedPending: stateInclude.pending,
                checkedSold: stateInclude.sold,
                checkedUnsold: stateInclude.unsold,
                checkedCanceled: stateInclude.canceled,
                includeFilter: included,
                includeData: data.filter((i) => included.some((n) => n === i.status))
             })
        }
    }

    const handlePending = () => {
        if(stateInclude.all === 'on'){
            let filtered = ['pending']
            dispatch({
                type: ACTION.PENDING, 
                checkedAll: 'off',
                checkedActive: 'off',
                checkedPending: 'on',
                checkedSold: 'off',
                checkedUnsold: 'off',
                checkedCanceled: 'off',
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.pending === 'on'){
            let included = [...stateInclude.include]
            let filtered = included.filter((i) => i !== 'pending');
            dispatch({
                type: ACTION.PENDING, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: 'off',
                checkedSold: stateInclude.sold,
                checkedUnsold: stateInclude.unsold,
                checkedCanceled: stateInclude.canceled,
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.all === 'off' && stateInclude.pending === 'off'){
            let included = [...stateInclude.include]
            included.push('pending')
            dispatch({
                type: ACTION.ACTIVE, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: 'on',
                checkedSold: stateInclude.sold,
                checkedUnsold: stateInclude.unsold,
                checkedCanceled: stateInclude.canceled,
                includeFilter: included,
                includeData: data.filter((i) => included.some((n) => n === i.status))
             })
        }
    }
    
    const handleSold = () => {
        if(stateInclude.all === 'on'){
            let filtered = ['sold']
            dispatch({
                type: ACTION.SOLD, 
                checkedAll: 'off',
                checkedActive: 'off',
                checkedPending: 'off',
                checkedSold: 'on',
                checkedUnsold: 'off',
                checkedCanceled: 'off',
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.sold === 'on'){
            let included = [...stateInclude.include]
            let filtered = included.filter((i) => i !== 'sold');
            dispatch({
                type: ACTION.SOLD, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: stateInclude.pending,
                checkedSold: 'off',
                checkedUnsold: stateInclude.unsold,
                checkedCanceled: stateInclude.canceled,
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.all === 'off' && stateInclude.sold === 'off'){
            let included = [...stateInclude.include]
            included.push('sold')
            dispatch({
                type: ACTION.SOLD, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: stateInclude.pending,
                checkedSold: 'on',
                checkedUnsold: stateInclude.unsold,
                checkedCanceled: stateInclude.canceled,
                includeFilter: included,
                includeData: data.filter((i) => included.some((n) => n === i.status))
             })
        }
    }
    
    const handleUnsold = () => {
        if(stateInclude.all === 'on'){
            let filtered = ['unsold']
            dispatch({
                type: ACTION.UNSOLD, 
                checkedAll: 'off',
                checkedActive: 'off',
                checkedPending: 'off',
                checkedSold: 'off',
                checkedUnsold: 'on',
                checkedCanceled: 'off',
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.unsold === 'on'){
            let included = [...stateInclude.include]
            let filtered = included.filter((i) => i !== 'unsold');
            dispatch({
                type: ACTION.UNSOLD, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: stateInclude.pending,
                checkedSold: stateInclude.sold,
                checkedUnsold: 'off',
                checkedCanceled: stateInclude.canceled,
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.all === 'off' && stateInclude.unsold === 'off'){
            let included = [...stateInclude.include]
            included.push('unsold')
            dispatch({
                type: ACTION.UNSOLD, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: stateInclude.pending,
                checkedSold: stateInclude.sold,
                checkedUnsold: 'on',
                checkedCanceled: stateInclude.canceled,
                includeFilter: included,
                includeData: data.filter((i) => included.some((n) => n === i.status))
             })
        }
    }
    
    const handleCanceled = () => {
        if(stateInclude.all === 'on'){
            let filtered = ['canceled']
            dispatch({
                type: ACTION.CANCELED, 
                checkedAll: 'off',
                checkedActive: 'off',
                checkedPending: 'off',
                checkedSold: 'off',
                checkedUnsold: 'off',
                checkedCanceled: 'on',
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.canceled === 'on'){
            let included = [...stateInclude.include]
            let filtered = included.filter((i) => i !== 'canceled');
            dispatch({
                type: ACTION.CANCELED, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: stateInclude.pending,
                checkedSold: stateInclude.sold,
                checkedUnsold:  stateInclude.unsold,
                checkedCanceled: 'off',
                includeFilter: filtered,
                includeData: data.filter((i) => filtered.some((n) => n === i.status))
             })
        }
        if(stateInclude.all === 'off' && stateInclude.canceled === 'off'){
            let included = [...stateInclude.include]
            included.push('canceled')
            dispatch({
                type: ACTION.CANCELED, 
                checkedAll: 'off',
                checkedActive: stateInclude.active,
                checkedPending: stateInclude.pending,
                checkedSold: stateInclude.sold,
                checkedUnsold:  stateInclude.unsold,
                checkedCanceled: 'on',
                includeFilter: included,
                includeData: data.filter((i) => included.some((n) => n === i.status))
             })
        }
    }

    return {stateInclude, handleAll, handleActive, handlePending, handleSold, handleUnsold, handleCanceled }
    
}