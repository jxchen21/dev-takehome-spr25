import React from "react";
import {useState, useRef, useEffect} from "react";
import Dropdown from "./Dropdown";
import { MockItemRequest } from "@/lib/types/mock/request";
import { RequestStatus } from "@/lib/types/request";
import Pagination from "../molecules/Pagination";
interface TableProps {
    columns: string[];
    tabs: string[];
    title: string;
}

export default function Table({ columns, tabs, title }: TableProps) {
    const [data, setData] = useState<MockItemRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize] = useState(6);

    const notSelected = `bg-gray-fill text-gray-text
                        hover:bg-primary-fill transition-colors duration-300 ease-in-out`
    const selected = `bg-primary text-white`
    const tableText = `text-left text-sm px-[1vw] py-2 bg-white
                        flex-1 font-semibold text-gray-text`

    const selectTab = (tab: string) : void => {
        setCurrentTab(tab);
        setCurrentPage(1);
    }

    const fetchData = async (status?: string, page: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            const url = new URL('/api/mock/request', window.location.origin);
            if (status && status !== 'All') {
                url.searchParams.set('status', status);
            }
            url.searchParams.set('page', page.toString());

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result.data);
            setTotalRecords(result.totalRecords);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        if (currentTab && currentTab !== 'All') {
            fetchData(currentTab, newPage);
        } else {
            fetchData(undefined, newPage);
        }
    };

    useEffect(() => {
        fetchData(undefined, 1);
    }, []);

    useEffect(() => {
        if (currentTab && currentTab !== 'All') {
            fetchData(currentTab, 1);
        } else {
            fetchData(undefined, 1);
        }
        setCurrentPage(1);
    }, [currentTab]);

    const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            return new Date(date).toLocaleDateString();
        }
        return date.toLocaleDateString();
    };

    // Dynamic text sizing based on content length
    const getTextSize = (text: string, maxLength: number = 20) => {
        if (text.length <= maxLength) return 'text-sm';
        if (text.length <= maxLength * 1.5) return 'text-xs';
        if (text.length <= maxLength * 2) return 'text-xs';
        return 'text-xs'; // Minimum size
    };

    const handleStatusChange = async (id: number, newStatus: RequestStatus) => {
        try {
            const response = await fetch('/api/mock/request', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setData(prevData =>
                prevData.map(item =>
                    item.id === id
                        ? { ...item, status: newStatus, lastEditedDate: new Date() }
                        : item
                )
            );

        } catch (err) {
            console.error('Error updating status:', err);
            alert(`Failed to update status: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    if (loading) {
        return (
            <div className="relative w-[85vw] flex flex-col">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-text">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative w-[85vw] flex flex-col">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="flex justify-center items-center py-8">
                    <p className="text-red-500">Error: {error}</p>
                    <button
                        onClick={() => fetchData(currentTab === 'All' ? undefined : currentTab, currentPage)}
                        className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return(
    <>
        <div className="relative w-[85vw] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="flex flex-row md:gap-2 gap-1">
                {
                    tabs.map((tab) => (<p key={tab}
                        className={`${tab === currentTab ? selected : notSelected}
                        font-semibold rounded-tl-md rounded-tr-md px-[3vw] py-4 text-center cursor-pointer`}
                        onClick={() => selectTab(tab)}>{tab}</p>))
                }
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-gray-stroke border-t border-b">
                        {
                            columns.map((column, index) => {
                                const columnWidths = ['w-[20%]', 'w-[35%]', 'w-[15%]', 'w-[15%]', 'w-[15%]'];
                                return (
                                    <th key={column} className={`${tableText} ${columnWidths[index] || 'w-auto'}`}>
                                        {column}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-8 text-gray-text">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                        <tr key={row.id}>
                            <td className={`${tableText} ${getTextSize(row.requestorName, 15)} overflow-auto`}>{row.requestorName}</td>
                            <td className={`${tableText} ${getTextSize(row.itemRequested, 25)} overflow-auto`}>{row.itemRequested}</td>
                            <td className={`${tableText} ${getTextSize(formatDate(row.requestCreatedDate), 12)} overflow-auto`}>{formatDate(row.requestCreatedDate)}</td>
                            <td className={`${tableText} ${getTextSize(row.lastEditedDate ? formatDate(row.lastEditedDate) : formatDate(row.requestCreatedDate), 12)} overflow-auto`}>{row.lastEditedDate ? formatDate(row.lastEditedDate) : formatDate(row.requestCreatedDate)}</td>
                            <td className={tableText}>
                                <Dropdown
                                    options={Object.values(RequestStatus).map(status => status.toString())}
                                    value={row.status}
                                    onChange={(newStatus) => handleStatusChange(row.id, newStatus as RequestStatus)}
                                />
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex justify-end">
                <Pagination pageNumber={currentPage} pageSize={pageSize} totalRecords={totalRecords} onPageChange={handlePageChange} />
            </div>
        </div>
    </>);
}