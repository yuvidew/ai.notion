"use client"
import { useState } from 'react'
import { useMutation } from 'convex/react';

export const useApiMutation = (mutationFunction : any) => {
    const [pending , setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    console.log(mutationFunction)

    const mutate = (payload : any) => {
        setPending(true);
        return apiMutation(payload)
        .finally(() => setPending(false))
        .then((res) => {
            return res
        })
        .catch((err) => {
            throw err
        })
    }

    return {
        mutate ,
        pending
    }
}
