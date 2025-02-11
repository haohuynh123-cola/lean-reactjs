import React from "react";
import { Button, FormSelect } from "react-bootstrap";

const Pagination = ({ totalPages, currentPage, onPageChange, total, setLimit, limit }) => {
    const maxVisiblePages = 5; // Số trang gần nhất hiển thị

    const generatePageNumbers = () => {
        let pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        //add info

        <div className="pagination d-flex justify-content-between">
            <div className=" d-flex justify-content-between">
                <span>Page {currentPage} of {totalPages}</span> <span>Total: {total}</span>

                <FormSelect onChange={(e) => setLimit(e.target.value)} className="form-select form-select-sm">
                    <option value="5" selected={limit == 5}>5</option>
                    <option value="10" selected={limit == 10}>10</option>
                    <option value="20" selected={limit == 20}>20</option>
                    <option value="50" selected={limit == 50}>50</option>
                    <option value="100" selected={limit == 100}>100</option>
                </FormSelect>
            </div>
            <div >
                <Button className="btn-sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>«</Button>

                {generatePageNumbers().map((page, index) => (
                    <Button
                        key={index}
                        onClick={() => typeof page === "number" && onPageChange(page)}
                        className={`btn-sm ${page === currentPage ? "active" : ""}`}
                        disabled={page === "..."}
                    >
                        {page}
                    </Button>
                ))}

                <Button className="btn-sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>»</Button>
            </div>
        </div >
    );
};

export default Pagination;
