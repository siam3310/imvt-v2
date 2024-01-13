import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"
const PaginationComponent = ({ mediaData, page, setPage }) => {
    const maxPage = mediaData?.total_pages > 500 ? 500 : mediaData?.total_pages
    return (
        <>{mediaData?.results && mediaData?.total_pages > 1 && <Pagination className="dark text-white mt-3">
            <PaginationContent>
                {page - 1 > 0 && <><PaginationItem>
                    <PaginationPrevious onClick={() => setPage(page - 1)} />
                </PaginationItem>
                    {page > 10 && <><PaginationItem>
                        <PaginationLink onClick={() => setPage(1)}>
                            {1}
                        </PaginationLink>
                    </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem></>}
                    <PaginationItem>
                        <PaginationLink onClick={() => setPage(page - 1)}>
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem></>}
                <PaginationItem>
                    <PaginationLink isActive >
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {maxPage >= page + 1 && <PaginationItem>
                    <PaginationLink onClick={() => setPage(page + 1)}>
                        {page + 1}
                    </PaginationLink>
                </PaginationItem>}
                {maxPage > page + 1 && <>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => setPage(maxPage)}>
                            {maxPage}
                        </PaginationLink>
                    </PaginationItem>
                </>}
                {maxPage >= page + 1 && <PaginationItem>
                    <PaginationNext onClick={() => setPage(page + 1)} />
                </PaginationItem>}
            </PaginationContent>
        </Pagination>}</>
    )
}

export default PaginationComponent