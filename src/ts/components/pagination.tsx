/// <reference types="react" />
import * as React from 'react';

interface PaginationProps {
    pageCount:number;
    currentPageNumber?:number;
}

export class Pagination extends React.Component<PaginationProps, {}> {
    render () {
        const pages = Array(this.props.pageCount);
        let activePageIndex = 0;
        if (this.props.hasOwnProperty('currentPageNumber')) {
          activePageIndex = this.props.currentPageNumber - 1;
        } 
        pages[activePageIndex] = (<a className="page active" href="#">{activePageIndex + 1}</a>);
        for (let i = 0 ; i < pages.length ; i ++) {
            if (i != activePageIndex) {
                pages[i] = (<a className="page" href="#">{i + 1}</a>);
            }
        }

        return (
            <div className="widget pagination">
                <a href="#">&laquo;</a>
                {pages}
                <a href="">&raquo;</a>
            </div>
        );
    }
}