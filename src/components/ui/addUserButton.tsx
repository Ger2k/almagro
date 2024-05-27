"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";


export function AddUserButton() {

    const { toast } = useToast()

    return (
        <Button                 
            onClick={() => {
                
                toast({
                    title: "Usuario añadido correctamente",
                  })
            }}
            variant="default">
            Añadir Usuario
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus ml-1" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
            </svg>
        </Button>
    )
}