export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

export const deleteCart = (product) => {
    return {
        type: "DELETEITEM",
        payload: product
    }
}

export const removeItemInCart = (product) => {
    return {
        type: "REMOVEITEM",
        payload: product
    }
}

export const subCart = (product) => {
    return {
        type: "SUBITEM",
        payload: product
    }
}



