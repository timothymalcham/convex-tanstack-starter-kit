import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Field } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";

/**
 * DataTable Component
 *
 * A comprehensive data table component with sorting, filtering, pagination, and selection.
 * Built for displaying structured data with rich interaction capabilities.
 *
 * @example Basic usage:
 * ```jsx
 * const columns = [
 *   { key: 'name', label: 'Name', sortable: true },
 *   { key: 'email', label: 'Email' },
 *   { key: 'role', label: 'Role', sortable: true },
 * ];
 *
 * const data = [
 *   { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
 *   { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
 * ];
 *
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   onSort={(key, direction) => console.log('Sort:', key, direction)}
 * />
 * ```
 *
 * @example With selection and actions:
 * ```jsx
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   selectable
 *   onSelectionChange={(selectedIds) => console.log('Selected:', selectedIds)}
 *   actions={[
 *     { label: 'Delete', onClick: (selectedIds) => handleDelete(selectedIds) },
 *     { label: 'Export', onClick: (selectedIds) => handleExport(selectedIds) },
 *   ]}
 * />
 * ```
 *
 * @example With custom cell rendering:
 * ```jsx
 * const columns = [
 *   {
 *     key: 'name',
 *     label: 'Name',
 *     render: (value, row) => <strong>{value}</strong>
 *   },
 *   {
 *     key: 'status',
 *     label: 'Status',
 *     render: (value) => (
 *       <span className={value === 'active' ? 'text-green-600' : 'text-gray-500'}>
 *         {value}
 *       </span>
 *     )
 *   }
 * ];
 * ```
 *
 * @example With pagination:
 * ```jsx
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   pagination={{
 *     page: 1,
 *     pageSize: 10,
 *     total: 100,
 *     onPageChange: (page) => setPage(page),
 *     onPageSizeChange: (size) => setPageSize(size),
 *   }}
 * />
 * ```
 */

export interface Column<T = any> {
    key: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface DataTableAction<T = any> {
    label: string;
    onClick: (selectedIds: string[], selectedRows: T[]) => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean | ((selectedIds: string[]) => boolean);
}

export interface PaginationConfig {
    page: number;
    pageSize: number;
    total: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export interface DataTableProps<T = any> {
    columns: Column<T>[];
    data: T[];
    keyField?: string;
    className?: string;
    selectable?: boolean;
    singleSelect?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (selectedIds: string[], selectedRows: T[]) => void;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    onSort?: (key: string, direction: "asc" | "desc") => void;
    searchable?: boolean;
    searchValue?: string;
    onSearch?: (value: string) => void;
    actions?: DataTableAction<T>[];
    pagination?: PaginationConfig;
    loading?: boolean;
    emptyMessage?: string;
    stickyHeader?: boolean;
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    compact?: boolean;
}

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    keyField = "id",
    className,
    selectable = false,
    singleSelect = false,
    selectedIds = [],
    onSelectionChange,
    sortBy,
    sortDirection = "asc",
    onSort,
    searchable = false,
    searchValue = "",
    onSearch,
    actions = [],
    pagination,
    loading = false,
    emptyMessage = "No data available",
    stickyHeader = false,
    striped = false,
    bordered = true,
    hoverable = true,
    compact = false,
}: DataTableProps<T>) {
    const [localSelectedIds, setLocalSelectedIds] = React.useState<string[]>(selectedIds);
    const [localSearchValue, setLocalSearchValue] = React.useState(searchValue);

    React.useEffect(() => {
        setLocalSelectedIds(selectedIds);
    }, [selectedIds]);

    React.useEffect(() => {
        setLocalSearchValue(searchValue);
    }, [searchValue]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data.map((row) => row[keyField] as string);
            setLocalSelectedIds(allIds);
            onSelectionChange?.(allIds, data);
        } else {
            setLocalSelectedIds([]);
            onSelectionChange?.([], []);
        }
    };

    const handleSelectRow = (rowId: string, checked: boolean) => {
        let newSelectedIds: string[];

        if (singleSelect) {
            newSelectedIds = checked ? [rowId] : [];
        } else {
            if (checked) {
                newSelectedIds = [...localSelectedIds, rowId];
            } else {
                newSelectedIds = localSelectedIds.filter((id) => id !== rowId);
            }
        }

        setLocalSelectedIds(newSelectedIds);
        const selectedRows = data.filter((row) => newSelectedIds.includes(row[keyField] as string));
        onSelectionChange?.(newSelectedIds, selectedRows);
    };

    const handleSort = (column: Column) => {
        if (!column.sortable || !onSort) return;

        const newDirection = sortBy === column.key && sortDirection === "asc" ? "desc" : "asc";
        onSort(column.key, newDirection);
    };

    const handleSearch = (value: string) => {
        setLocalSearchValue(value);
        onSearch?.(value);
    };

    const isAllSelected = data.length > 0 && data.every((row) => localSelectedIds.includes(row[keyField] as string));
    const isPartiallySelected =
        data.some((row) => localSelectedIds.includes(row[keyField] as string)) && !isAllSelected;

    const selectedRows = data.filter((row) => localSelectedIds.includes(row[keyField] as string));

    return (
        <div className={twMerge("w-full space-y-4", className)}>
            {/* Header Actions */}
            {(searchable || actions.length > 0) && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {searchable && (
                        <div className="w-full sm:w-72">
                            <Field.Root>
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    value={localSearchValue}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full"
                                />
                            </Field.Root>
                        </div>
                    )}

                    {actions.length > 0 && localSelectedIds.length > 0 && (
                        <div className="flex gap-2">
                            {actions.map((action, index) => {
                                const isDisabled =
                                    typeof action.disabled === "function"
                                        ? action.disabled(localSelectedIds)
                                        : action.disabled;

                                return (
                                    <Button
                                        key={index}
                                        variant={action.variant || "secondary"}
                                        size="sm"
                                        disabled={isDisabled}
                                        onClick={() => action.onClick(localSelectedIds, selectedRows)}
                                    >
                                        {action.label} ({localSelectedIds.length})
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className={twMerge("w-full overflow-auto rounded-lg", bordered && "border border-border-outline")}>
                <table className="w-full">
                    <thead className={twMerge("bg-surface-secondary", stickyHeader && "sticky top-0 z-10")}>
                        <tr>
                            {selectable && (
                                <th className={twMerge("text-left", compact ? "px-3 py-2" : "px-4 py-3")}>
                                    {!singleSelect && (
                                        <Checkbox
                                            checked={isAllSelected}
                                            indeterminate={isPartiallySelected}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            aria-label="Select all rows"
                                        />
                                    )}
                                </th>
                            )}

                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={twMerge(
                                        "text-left font-medium text-content-secondary",
                                        compact ? "px-3 py-2 text-sm" : "px-4 py-3",
                                        column.align === "center" && "text-center",
                                        column.align === "right" && "text-right",
                                        column.sortable && "cursor-pointer select-none hover:text-content-primary",
                                    )}
                                    style={{ width: column.width }}
                                    onClick={() => handleSort(column)}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.label}
                                        {column.sortable && (
                                            <span className="text-xs">
                                                {sortBy === column.key ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="py-8 text-center text-content-secondary"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="py-8 text-center text-content-secondary"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => {
                                const rowId = row[keyField] as string;
                                const isSelected = localSelectedIds.includes(rowId);

                                return (
                                    <tr
                                        key={rowId}
                                        className={twMerge(
                                            "border-t border-border-outline transition-colors",
                                            striped && rowIndex % 2 === 1 && "bg-surface-secondary",
                                            hoverable && "hover:bg-surface-hover",
                                            isSelected && "bg-interactive-accent/10",
                                        )}
                                    >
                                        {selectable && (
                                            <td className={twMerge("text-left", compact ? "px-3 py-2" : "px-4 py-3")}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(e) => handleSelectRow(rowId, e.target.checked)}
                                                    aria-label={`Select row ${rowIndex + 1}`}
                                                />
                                            </td>
                                        )}

                                        {columns.map((column) => {
                                            const value = row[column.key];
                                            const content = column.render ? column.render(value, row, rowIndex) : value;

                                            return (
                                                <td
                                                    key={column.key}
                                                    className={twMerge(
                                                        "text-content-primary",
                                                        compact ? "px-3 py-2 text-sm" : "px-4 py-3",
                                                        column.align === "center" && "text-center",
                                                        column.align === "right" && "text-right",
                                                    )}
                                                >
                                                    {content}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-content-secondary">
                            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}{" "}
                            results
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-content-secondary">Rows per page:</span>
                            <Select
                                value={pagination.pageSize.toString()}
                                onChange={(value) => pagination.onPageSizeChange(parseInt(value))}
                            >
                                {(pagination.pageSizeOptions || [10, 25, 50, 100]).map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={pagination.page === 1}
                                onClick={() => pagination.onPageChange(pagination.page - 1)}
                            >
                                Previous
                            </Button>

                            <span className="px-3 text-sm">
                                Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
                            </span>

                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
                                onClick={() => pagination.onPageChange(pagination.page + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Export types for external use
export type { Column, DataTableAction, PaginationConfig };
