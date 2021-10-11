/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useState } from 'react';

export default function Pagination({ total, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, pageIndex, pageSize }: any) {
    const minContent = () => {
        return pageSize * pageIndex + 1;
    }

    const maxContent = () => {
        const max = minContent() + pageSize - 1;
        return max > total ? total : max;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    const pageInputChange = (e: any) => {
        const value = Number(e.target.value);
        console.log(value);
        if (value <= pageCount) {
            setCurrentPage(value);
        }
    }

    const incrementCurrentPage = () => {
        const value = currentPage + 1;
        if (value <= pageCount) {
            setCurrentPage(value);
        }
    }

    const decrementCurrentPage = () => {
        const value = currentPage - 1;
        if (value >= 0 && value <= pageCount) {
            setCurrentPage(value);
        }
    }

    const gotoCurrentPage = () => {
        if (currentPage > 0 && currentPage <= pageCount) {
            gotoPage(currentPage - 1);
            setShowPopup(false);
        }
    }

    const pageNumbers = () => {
        const shownPages = 3;
        const result = [];
        const current = pageIndex + 1;
        if (current > pageCount - shownPages) {
            result.push(1, '...',pageCount - 2, pageCount - 1, pageCount);
        } else {
            result.push(current, current + 1, current + 2, '...', pageCount);
        }
        return result;
    }

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    disabled={!canNextPage}
                    onClick={nextPage}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{minContent()}</span> to <span className="font-medium">{maxContent()}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                            className="relative z-1 inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        {pageNumbers().map((page: any, i: number) => page !== '...' ? (
                            <button
                                key={`page-index-${i}`}
                                onClick={() => gotoPage(page - 1)}
                                className={`${pageIndex === page - 1 ? 'bg-indigo-600 border-indigo-600 border-l-solid text-white' : 'bg-white border-gray-300 z-1 text-gray-500 hover:bg-gray-50 '} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                            >
                                {page}
                            </button>
                        ) : (<div onClick={() => {
                            setShowPopup(true);
                            setCurrentPage(pageIndex + 1)
                        }} className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            <span>...</span>
                        </div>))}

                        {showPopup ? (<div className="absolute -top-16 z-10 bg-white shadow-xl border-gray-200 rounded border-solid border">
                            <div className="text-sm px-2 py-3 border-gray-200 border-b border-b-solid">Go to page</div>
                            <div className="p-2 flex space-x-2">
                                <div className="border border-solid border-gray-200 overflow-hidden flex divide-x divide-gray-200 rounded">
                                    <input value={currentPage} onChange={pageInputChange} type="text" className="focus:outline-none py-1 px-2 text-right w-24" />
                                    <button onClick={incrementCurrentPage} className="w-8">+</button>
                                    <button onClick={decrementCurrentPage} className="w-8">-</button>
                                </div>
                                <button onClick={gotoCurrentPage} className="px-3 bg-gray-200 rounded font-medium">Go</button>
                            </div>
                        </div>) : null}

                        <button
                            disabled={!canNextPage}
                            onClick={nextPage}
                            className="relative z-1 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}