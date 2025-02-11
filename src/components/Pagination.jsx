import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
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
        <div className="pagination">
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
    );
};

export default Pagination;
