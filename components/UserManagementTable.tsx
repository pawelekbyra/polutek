"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Search,
    Trash2,
    MoreVertical,
    Shield,
    User as UserIcon,
    Loader2,
    ChevronLeft,
    ChevronRight,
    BadgeCheck,
    AlertCircle
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { getUsers, deleteUser, updateUserRole } from '@/lib/admin-actions';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

// Helper for debouncing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export default function UserManagementTable() {
    const { addToast } = useToast();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const debouncedSearch = useDebounce(searchTerm, 500);

    // Reset page on filter change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, roleFilter]);

    // Data Fetching
    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin-users', page, debouncedSearch, roleFilter],
        queryFn: async () => {
            const res = await getUsers(page, 10, debouncedSearch, roleFilter);
            if (!res.success) throw new Error(res.message);
            return res;
        }
    });

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: (res) => {
            if (res.success) {
                addToast(res.message || 'Użytkownik usunięty', 'success');
                queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            } else {
                addToast(res.message || 'Błąd', 'error');
            }
        },
        onError: (err: any) => {
            addToast(err.message, 'error');
        }
    });

    const roleMutation = useMutation({
        mutationFn: ({ userId, role }: { userId: string, role: string }) => updateUserRole(userId, role),
        onSuccess: (res) => {
            if (res.success) {
                addToast(res.message || 'Rola zmieniona', 'success');
                queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            } else {
                addToast(res.message || 'Błąd', 'error');
            }
        },
        onError: (err: any) => {
            addToast(err.message, 'error');
        }
    });

    const handleDelete = async (userId: string) => {
        if (confirm('Czy na pewno chcesz usunąć tego użytkownika? Tej operacji nie można cofnąć.')) {
            deleteMutation.mutate(userId);
        }
    };

    const handleRoleChange = (userId: string, newRole: string) => {
        roleMutation.mutate({ userId, role: newRole });
    };

    const roles = [
        { value: 'all', label: 'Wszystkie role' },
        { value: 'user', label: 'Użytkownik' },
        { value: 'patron', label: 'Patron' },
        { value: 'author', label: 'Twórca' },
        { value: 'admin', label: 'Admin' },
    ];

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100 shadow-inner">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Szukaj użytkowników..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-white border-2 border-gray-100 rounded-2xl pl-12 pr-4 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:border-violet-600 transition-all shadow-sm"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {roles.map((r) => (
                        <button
                            key={r.value}
                            onClick={() => setRoleFilter(r.value)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2",
                                roleFilter === r.value
                                    ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-100"
                                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                            )}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 size={40} className="animate-spin mb-4 text-violet-600" />
                        <p className="font-bold tracking-tight">Pobieranie bazy...</p>
                    </div>
                ) : isError ? (
                    <div className="p-20 flex flex-col items-center justify-center text-red-500">
                        <AlertCircle size={40} className="mb-4" />
                        <p className="font-bold tracking-tight">Błąd połączenia z bazą.</p>
                    </div>
                ) : (data?.users || []).length === 0 ? (
                    <div className="p-20 text-center text-gray-300">
                        <p className="font-bold italic">Brak wyników wyszukiwania.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-[10px] uppercase text-gray-400 font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Użytkownik</th>
                                    <th className="px-8 py-5">Rola</th>
                                    <th className="px-8 py-5">Data dołączenia</th>
                                    <th className="px-8 py-5 text-right">Zarządzaj</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(data?.users || []).map((user: any) => (
                                    <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden relative border-2 border-white shadow-sm flex-shrink-0">
                                                    {user.avatar ? (
                                                        <Image
                                                            src={user.avatar}
                                                            alt={user.username}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full text-gray-300">
                                                            <UserIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 tracking-tight">{user.displayName || user.username}</div>
                                                    <div className="text-xs text-gray-400 font-bold">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                user.role === 'admin' ? "bg-red-50 text-red-600 border-red-100" :
                                                user.role === 'author' ? "bg-violet-50 text-violet-600 border-violet-100" :
                                                user.role === 'patron' ? "bg-orange-50 text-orange-600 border-orange-100" :
                                                "bg-blue-50 text-blue-600 border-blue-100"
                                            )}>
                                                {user.role}
                                                {user.role === 'author' && <BadgeCheck size={12} className="ml-1" />}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString('pl-PL')}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90 border border-transparent hover:border-gray-100">
                                                        <MoreVertical size={20} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-white border-gray-100 text-gray-900 min-w-[200px] rounded-2xl shadow-2xl p-2">
                                                    <DropdownMenuLabel className="font-black text-gray-400 uppercase tracking-widest text-[10px] px-3 py-2">Opcje Panelu</DropdownMenuLabel>
                                                    <DropdownMenuSeparator className="bg-gray-50" />
                                                    <DropdownMenuItem
                                                        onClick={() => handleRoleChange(user.id, 'user')}
                                                        className="hover:bg-gray-50 rounded-xl cursor-pointer text-sm font-bold px-3 py-2"
                                                    >
                                                        Ustaw jako: Użytkownik
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleRoleChange(user.id, 'patron')}
                                                        className="hover:bg-gray-50 rounded-xl cursor-pointer text-sm font-bold px-3 py-2"
                                                    >
                                                        Ustaw jako: Patron
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleRoleChange(user.id, 'author')}
                                                        className="hover:bg-gray-50 rounded-xl cursor-pointer text-sm font-bold px-3 py-2"
                                                    >
                                                        Ustaw jako: Twórca
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleRoleChange(user.id, 'admin')}
                                                        className="text-red-600 hover:bg-red-50 rounded-xl cursor-pointer text-sm font-bold px-3 py-2"
                                                    >
                                                        Ustaw jako: Admin
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-gray-50" />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(user.id)}
                                                        className="text-red-600 bg-red-50/50 hover:bg-red-50 rounded-xl cursor-pointer font-black px-3 py-3 mt-1"
                                                    >
                                                        <Trash2 size={16} className="mr-3" />
                                                        USUŃ KONTO
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {data && (data.pages || 0) > 1 && (
                <div className="flex items-center justify-center gap-6 mt-10">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-3 rounded-2xl bg-white border border-gray-100 hover:bg-gray-50 text-gray-900 shadow-sm disabled:opacity-30 transition-all active:scale-90"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-sm font-black tracking-tight text-gray-900">
                        {page} <span className="text-gray-300 mx-1">/</span> {data.pages || 1}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(data.pages || 1, p + 1))}
                        disabled={page === (data.pages || 1)}
                        className="p-3 rounded-2xl bg-white border border-gray-100 hover:bg-gray-50 text-gray-900 shadow-sm disabled:opacity-30 transition-all active:scale-90"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}
