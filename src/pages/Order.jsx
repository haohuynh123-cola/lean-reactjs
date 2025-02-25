// import React, { use, useEffect, useState } from 'react';
// import { Footer, Nav } from '../components';
// import { Spinner, Table } from 'react-bootstrap';
// import Pagination from '../components/Pagination';
// import UseFetch from '../hooks/UseFetch';

// const Order = () => {

//     const [orders, setOrders] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [total, setTotal] = useState(0);
//     const [limit, setLimit] = useState(10);
//     const [loading, setLoading] = useState(false);


//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://production.trackingis.info/api/etsy/fulfill-orders?page=${page}&length=${limit}`, {
//                     headers: {
//                         'Authorization': 'Bearer soaDQcnGdVgzgxhXl1ScR0i0guwEMTloTgVq1XMpiFTN9JfVsqVk1GfOPkyn'
//                     }
//                 });

//                 const data = await response.json();

//                 setOrders(data.data);
//                 setTotalPages(Math.ceil(data.recordsTotal / limit));
//                 setLoading(false);
//                 setTotal(data.recordsTotal);
//             } catch (error) {
//                 console.error("Lỗi khi lấy dữ liệu:", error);
//             }
//         };

//         fetchOrders();
//     }, [page, limit]);

//     const Loading = () => {
//         return (
//             <div className="col-12 py-5 text-center">
//                 <Spinner animation="border" role="status" />
//             </div>
//         )
//     }

//     const Filter = () => {
//         return (
//             <div className="col-12 py-5 text-center">

//             </div>
//         )
//     }

//     return (
//         <div>
//             <Nav />
//             <div className="container  my-5 py-2">

//                 <div className="card">
//                     <div className="card-body">
//                         <Filter />
//                     </div>
//                 </div>

//                 <div className="card mb-3 mt-2">
//                     <div className="card-body">
//                         <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} setLimit={setLimit} total={total} limit={limit} />

//                         <Table className='table table-bordered'>
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Status</th>
//                                     <th>Date at</th>
//                                     <th>Order ID</th>
//                                     <th>Product Name</th>
//                                     <th>Quantity</th>
//                                     <th>image</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading == false ?
//                                     orders.map((order, index) => (

//                                         <tr key={index} className='fs-18'>
//                                             <td>{index + 1}</td>
//                                             <td>
//                                                 <span className='no-wrapper'>{order.status == 'bought' ? 'done' : order.status}</span>
//                                             </td>
//                                             <td>
//                                                 <span className='no-wrapper'>{order.order.date_at}</span>
//                                             </td>
//                                             <td>{order.order.origin_id}</td>
//                                             <td>{order.product.name}</td>
//                                             <td>{order.quantity}</td>
//                                             <td><img src={order.product.image_url} alt="product" width={100} height={100} /></td>
//                                         </tr>
//                                     ))
//                                     : <Loading />}
//                             </tbody>
//                         </Table>

//                         <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} setLimit={setLimit} total={total} limit={limit} />

//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Order;
import React, { useState } from 'react';
import { Footer, Nav } from '../components';
import { Spinner, Table } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchOrders = async (page, limit) => {
    const response = await axios.get(
        `https://production.trackingis.info/api/etsy/fulfill-orders?page=${page}&length=${limit}`,
        {
            headers: {
                'Authorization': 'Bearer soaDQcnGdVgzgxhXl1ScR0i0guwEMTloTgVq1XMpiFTN9JfVsqVk1GfOPkyn'
            }
        }
    );
    return response.data;  // Trả về data nhận được từ API
};

const Order = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Sử dụng React Query để fetch dữ liệu
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['orders', page, limit],  // Dùng Object form cho queryKey
        queryFn: () => fetchOrders(page, limit), // Dùng Object form cho queryFn
        keepPreviousData: true,  // Giữ lại dữ liệu cũ khi thay đổi page hoặc limit
        onError: (error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    });

    const Loading = () => {
        return (
            <div className="col-12 py-5 text-center">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    const Filter = () => {
        return (
            <div className="col-12 py-5 text-center">
            </div>
        );
    }

    return (
        <div>
            <Nav />
            <div className="container my-5 py-2">
                <div className="card">
                    <div className="card-body">
                        <Filter />
                    </div>
                </div>

                <div className="card mb-3 mt-2">
                    <div className="card-body">
                        <Pagination totalPages={Math.ceil(data?.recordsTotal / limit)} currentPage={page} onPageChange={setPage} setLimit={setLimit} total={data?.recordsTotal} limit={limit} />

                        <Table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th>Date at</th>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <Loading />
                                ) : isError ? (
                                    <tr><td colSpan="7">Lỗi: {error.message}</td></tr>
                                ) : (
                                    data?.data?.map((order, index) => (
                                        <tr key={index} className='fs-18'>
                                            <td>{index + 1}</td>
                                            <td>
                                                <span className='no-wrapper'>{order.status === 'bought' ? 'done' : order.status}</span>
                                            </td>
                                            <td>
                                                <span className='no-wrapper'>{order.order.date_at}</span>
                                            </td>
                                            <td>{order.order.origin_id}</td>
                                            <td>{order.product.name}</td>
                                            <td>{order.quantity}</td>
                                            <td><img src={order.product.image_url} alt="product" width={100} height={100} /></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>

                        <Pagination totalPages={Math.ceil(data?.recordsTotal / limit)} currentPage={page} onPageChange={setPage} setLimit={setLimit} total={data?.recordsTotal} limit={limit} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order;
