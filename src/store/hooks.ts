// Import hook bawaan dari react-redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Import tipe RootState dan AppDispatch dari file store.ts
import type { RootState, AppDispatch } from './store';

/**
 * Custom hook useAppDispatch
 * - Membungkus useDispatch agar mengenali tipe dispatch kita (AppDispatch)
 * - Berguna terutama saat menggunakan Redux Toolkit + TypeScript + thunk async
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom hook useAppSelector
 * - Membungkus useSelector dengan tipe RootState
 * - Membantu TypeScript mengenali struktur state global (dari store)
 * - Memberikan auto-complete dan validasi tipe saat akses state
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
