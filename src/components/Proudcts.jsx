import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addCart } from '../redux/action';

const Proudcts = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const [category, setCategory] = useState([]);

    let componentMounted = true

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    useEffect(() => {
        const getProductsAndCategories = async () => {
            setLoading(true);
            const [productsResponse, categoriesResponse] = await Promise.all([
                fetch("https://fakestoreapi.com/products/"),
                fetch("https://fakestoreapi.com/products/categories")
            ]);

            if (componentMounted) {
                const products = await productsResponse.json();
                const categories = await categoriesResponse.json();
                setData(products);
                setFilter(products);
                setCategory(categories);
                setLoading(false);
            }
        }

        getProductsAndCategories();
    }, [])

    console.log(category)
    const Loading = () => {
        return (
            <>
                <div className="col-12 py-5 text-center">
                    <Skeleton height={40} width={560} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                    <Skeleton height={592} />
                </div>
            </>
        );
    };

    const filterProduct = (cat) => {
        const updatedList = data.filter((item) => item.category === cat);
        setFilter(updatedList);
    };

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons text-center py-5">
                    <button
                        className="btn btn-outline-dark m-1"
                        onClick={() => setFilter(data)}
                    >
                        All
                    </button>
                    {category.map((cat) => {
                        return (
                            <button
                                key={cat}
                                className="btn btn-outline-dark m-1"
                                onClick={() => filterProduct(cat)}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {filter.map((product) => {
                    return (
                        <div
                            id={product.id}
                            key={product.id}
                            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
                        >
                            <div className="card text-center h-100" key={product.id}>
                                <img
                                    className="card-img-top p-3"
                                    src={product.image}
                                    alt="Card"
                                    height={300}
                                />
                                <div className="card-body">
                                    <Link to={"/product/" + product.id} className="text-decoration-none text-dark">
                                        <h5 className="card-title">{product.title}</h5>
                                    </Link>
                                    <p className="card-text">
                                        {product.description.substring(0, 90)}...
                                    </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item lead">$ {product.price}</li>
                                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li> */}
                                </ul>
                                <div className="card-body">
                                    <Link
                                        to={"/product/" + product.id}
                                        className="btn btn-dark m-1"
                                    >
                                        Buy Now
                                    </Link>
                                    <button
                                        className="btn btn-dark m-1"
                                        onClick={() => {
                                            toast.success("Added to cart");
                                            addProduct(product);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <div>

            <div className="container my-3 py-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="display-5 text-center">Latest Products</h2>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Proudcts;