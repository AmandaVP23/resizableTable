# resizableTable
Scripts for a resizable table

# Attention
## dont forget to put table-layout: fixed; on the table element

# Diferences 
- Better - TableHeader_v2 - is prepared for tables that can have vertical scroll, use table-layout: fixed; no elemento table
    - tableId sended must be the id of the table (Important)
    - resizing works without the jumping when we have a table that does not have vertical scroll
- ResizableTableSecond - uses MaterialUi table
- ResizableTableThird - does not uses external library, all with <table>, <thead>,...

# Usage 
add file .ts to project and call resizableTable(table)
```
resizableTable(table)
```
table is the table element to add resize 
```
document.getElementById('table-id')
```

# Versions
1 - basic, script addeds border on hover, blue border, all styles is inside script, last column has resize too
