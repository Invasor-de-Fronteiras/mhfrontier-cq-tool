import classNames from 'classnames';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Input } from './Input';

interface PaginationItemProps {
    children: ReactNode;
    className?: string;
    onClick: () => void;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({ children, className, onClick }) => {
    return <div
        onClick={onClick}
        className={classNames(
            "px-3",
            "h-full",
            "leading-tight",
            "text-gray-500",
            "bg-white",
            "border",
            "border-gray-300",
            "hover:bg-gray-100",
            "hover:text-gray-700",
            "dark:bg-slate-800",
            "dark:border-gray-700",
            "dark:text-gray-400",
            "dark:hover:bg-gray-700",
            "dark:hover:text-white",
            "cursor-pointer",
            "select-none",
            "flex",
            "justify-center",
            "items-center",
            className
        )}
    >
        {children}
    </div>
}

interface PaginationProps {
    page: number;
    onChangePage: (page: number) => void;
    perPage: number;
    total: number;
    className?: string;
}

const preparePage = (page: number, totalPages: number): number => {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;

    return page;
}

export const Pagination: React.FC<PaginationProps> = ({
    page,
    onChangePage,
    perPage,
    total,
    className
}) => {
    const [pageInput, setPageInput] = useState(page);
    const totalPages = useMemo(() => {
        return Math.ceil(total / perPage);
    }, [total, perPage]);

    useEffect(() => {
        setPageInput(page);
    }, [page]);

    const goToPage = (toPage: number) => () => {
        onChangePage(preparePage(toPage, totalPages));
    };

    return (
        <div className={classNames("inline-flex items-center relative  h-10", className)}>
            <PaginationItem onClick={goToPage(0)} className="rounded-l-lg">First</PaginationItem>
            <PaginationItem onClick={goToPage(page - 1)}>Prev</PaginationItem>
            <div className="mx-4 flex h-full items-center">
                Page
                <Input
                    type="number"
                    className="mx-2 my-0 w-20"
                    inputClassName="h-5"
                    value={pageInput}
                    onChange={(e) => setPageInput(parseInt(e.target.value, 10))}
                    onBlur={goToPage(pageInput)}
                />
                <span>{`of ${totalPages}`}</span>
            </div>
            <PaginationItem onClick={goToPage(page + 1)}>Next</PaginationItem>
            <PaginationItem className="rounded-r-lg" onClick={goToPage(totalPages)}>Last</PaginationItem>
        </div>
    )
}