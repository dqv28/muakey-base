'use server'

import { getKpi } from "@/libs/data"

export const getKpiAction = async (query?: any) => {
    return await getKpi(query)
}