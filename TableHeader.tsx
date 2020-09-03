/**
 *
 * @Copyright 2020 VOID SOFTWARE, S.A.
 *
 */

import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';

interface OwnProps {
    text: string;
    id: string;
    isResizable?: boolean;
}

class TableHeader extends Component<OwnProps, any> {
    pageX = 0;

    curColWidth = 0;

    nxtColWidth = 0;

    curCol: HTMLElement | null = null;

    nxtCol: HTMLElement | null = null;

    componentDidMount() {
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    onDocumentMouseUp = () => {
        this.pageX = 0;
        this.curCol = null;
        this.curColWidth = 0;
        this.nxtCol = null;
        this.nxtColWidth = 0;
    }

    onDocumentMouseMove = (e: any) => {
        if (this.curCol) {
            const diffX = e.pageX - this.pageX;

            const newWidth = this.curColWidth + diffX;
            if (newWidth > 35 && newWidth < 400) {
                if (this.nxtCol) {
                    // this.nxtCol.style.width = `${this.nxtColWidth - (diffX)}px`;
                    // console.log("Next: ", `${this.nxtColWidth - (diffX)}px`);
                }

                this.curCol.style.width = `${this.curColWidth + diffX}px`;
            }
        }
    }

    onResizeMouseDown = (e: any, columnId: string) => {
        // this.curCol = e.target.parentElement;
        this.curCol = document.getElementById(columnId);

        console.log('onMouseDown')

        if (this.curCol) {
            const next: any = this.curCol.nextElementSibling;

            this.pageX = e.pageX;

            const padding = this.paddingDiff(this.curCol);

            console.log(padding);

            this.curColWidth = this.curCol.offsetWidth - padding;

            if (next) {
                this.nxtCol = next;
                this.nxtColWidth = next.offsetWidth - padding;
            }
        }
    }

    paddingDiff = (col: Element | HTMLElement | null): number => {
        // || this.getStyleVal(col, 'box-sizing') === 'border-box'
        if (!col) {
            return 0;
        }

        const padLeft = this.getStyleVal(col, 'padding-left');
        const padRight = this.getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));
    }

    getStyleVal = (element: Element, css: string) => {
        return (window.getComputedStyle(element, null).getPropertyValue(css));
    }

    render() {
        const {
            isResizable,
            text,
            id,
        } = this.props;

        const columnId = `header-${id}`;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // 20 -> padding-left = 10, padding-right = 10;
        let headerInitialWidth = (text.length * 10) + 20;

        if (context) {
            context.font = getComputedStyle(document.body).font;
            headerInitialWidth = context.measureText(text).width + 20;
        }

        return (
            <TableCell id={columnId} style={{ width: `${headerInitialWidth}px` }} data-testid={columnId}>
                <div>
                    <p>{text}</p>
                    {isResizable && (
                        <div
                            data-testid="resizable-container"
                            className="resize"
                            onMouseDown={e => this.onResizeMouseDown(e, columnId)}
                        >
                            <div />
                        </div>
                    )}
                </div>
            </TableCell>
        );
    }
}

export default TableHeader;
