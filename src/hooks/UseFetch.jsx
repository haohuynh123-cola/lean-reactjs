import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        let isMounted = true; // Để tránh cập nhật state khi component đã unmount

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, options);
                if (!response.ok) throw new Error("Lỗi khi fetch API");

                const result = await response.json();
                if (isMounted) setData(result);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup function
        };
    }, [url, JSON.stringify(options)]); // options được stringify để tránh bug khi truyền object

    return { data, loading, error };
};

export default useFetch;
