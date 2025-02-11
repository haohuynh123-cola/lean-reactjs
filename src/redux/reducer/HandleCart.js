const getInitalCart = () => {
    const storeCart = localStorage.getItem("cart")
    return storeCart ? JSON.parse(storeCart) : []
}

const HandleCart = (state = getInitalCart(), action) => {
    const product = action.payload
    let updatedCart;

    switch (action.type) {
        case "ADDITEM":
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                updatedCart = state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                updatedCart = [...state, { ...product, qty: 1 }]
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart))
            return updatedCart

        case "DELETEITEM":
            const existItem = state.find((x) => x.id === product.id);

            if (existItem.qty === 1) {
                updatedCart = state.filter((x) => x.id !== product.id);
            }
            else {
                updatedCart = state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart))
            return updatedCart

        case "REMOVEITEM":
            updatedCart = state.filter((x) => x.id !== product.id);
            localStorage.setItem("cart", JSON.stringify(updatedCart))
            return updatedCart

        default:
            return state;
    }

}

export default HandleCart;