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
    tableId: string;
    isResizable?: boolean;
}

interface OwnState {
    hasVerticalScroll: boolean;
}

class TableHeader extends Component<OwnProps, OwnState> {
    state = {
        hasVerticalScroll: false,
    }

    curCol: HTMLElement | null = null;

    startOffset = 0;

    componentDidMount() {
        const { tableId } = this.props;

        const table = document.getElementById(tableId);
        if (table) {
            const parent = table.parentElement;

            const headers = table.querySelectorAll('th');

            if (headers.length > 0) {
                let length = 0;
                Object.keys(headers).forEach(k => {
                    const h = headers[Number(k)];
                    const text = h.innerText;
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (context) {
                        context.font = getComputedStyle(document.body).font;
                        length += context.measureText(text).width + 20;
                    }
                })

                if (parent) {
                    if (parent.offsetWidth < length) {
                        this.setState({
                            hasVerticalScroll: true,
                        })
                    }
                }
            }
        }

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    onDocumentMouseUp = () => {
        this.curCol = null;
    }

    onDocumentMouseMove = (e: any) => {
        if (this.curCol) {
            const newWidth = this.startOffset + e.pageX;
            if (newWidth > 35 && newWidth < 600) {
                this.curCol.style.width = `${newWidth}px`;
            }
        }
    }

    onResizeMouseDown = (e: any, columnId: string) => {
        // this.curCol = e.target.parentElement;
        this.curCol = document.getElementById(columnId);

        if (this.curCol) {
            this.startOffset = this.curCol.offsetWidth - e.pageX;
        }
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
        const { hasVerticalScroll } = this.state;

        const columnId = `header-${id}`;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // 20 -> padding-left = 10, padding-right = 10;
        let headerInitialWidth = (text.length * 10) + 20;

        if (context) {
            context.font = getComputedStyle(document.body).font;
            headerInitialWidth = context.measureText(text).width + 20;
        }
// style={hasVerticalScroll ? { width: `${headerInitialWidth}px` } : {}}
        return (
            <TableCell id={columnId} style={hasVerticalScroll ? { width: `${headerInitialWidth}px` } : {}} data-testid={columnId}>
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
