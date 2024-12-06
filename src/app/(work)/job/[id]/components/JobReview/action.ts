'use server'

import { refreshData } from "@/libs/data"

export const refreshDataAction = async (query?: any) => 
    refreshData(query)