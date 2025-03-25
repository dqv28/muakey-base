'use client'

import { useAsyncEffect } from '@/libs/hook'
import { useMemo, useState } from 'react'
import {
  getAccountsAsAttendanceAction,
  getAssetCategoriesAction,
  getBrandAction,
} from '../components/action'

export const useAssetForm = () => {
  const [users, setUsers] = useState<Array<any>>([])
  const [brands, setBrands] = useState<Array<any>>([])
  const [categories, setCategories] = useState<Array<any>>([])

  // Fetch users
  useAsyncEffect(async () => {
    try {
      const res = await getAccountsAsAttendanceAction()
      const validUsers = Array.isArray(res)
        ? res.filter((user) => user && user.id)
        : []
      setUsers(validUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    }
  }, [])

  // Fetch brands
  useAsyncEffect(async () => {
    try {
      const res = await getBrandAction()
      const validBrands = Array.isArray(res)
        ? res.filter((brand) => brand && brand.id)
        : []
      setBrands(validBrands)
    } catch (error) {
      console.error('Error fetching brands:', error)
      setBrands([])
    }
  }, [])

  // Fetch categories
  useAsyncEffect(async () => {
    try {
      const res = await getAssetCategoriesAction()
      const validCategories = Array.isArray(res)
        ? res.filter((category) => category && category.id)
        : []
      setCategories(validCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }, [])

  const statusOptions = useMemo(
    () => [
      { label: 'Đang sử dụng', value: 'using', key: 'using' },
      { label: 'Chưa sử dụng', value: 'unused', key: 'unused' },
      { label: 'Đã thanh lý', value: 'liquidated', key: 'liquidated' },
      { label: 'Đang bảo hành', value: 'warranty', key: 'warranty' },
      { label: 'Hỏng', value: 'broken', key: 'broken' },
    ],
    [],
  )

  const categoryOptions = useMemo(() => {
    return (categories || []).map((category: any) => ({
      label: category?.name || '',
      value: category?.id || '',
      key: category?.id || '',
    }))
  }, [categories])

  const userOptions = useMemo(() => {
    return (users || []).map((user: any) => ({
      label: user?.full_name || '',
      value: user?.id || '',
      key: user?.id || '',
    }))
  }, [users])

  const brandOptions = useMemo(() => {
    return (brands || []).map((brand: any) => ({
      label: brand?.name || '',
      value: brand?.id || '',
      key: brand?.id || '',
    }))
  }, [brands])

  return {
    users,
    brands,
    categories,
    statusOptions,
    categoryOptions,
    userOptions,
    brandOptions,
  }
}
