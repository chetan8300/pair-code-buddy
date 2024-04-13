"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export function SearchBar() {
  const router = useRouter()
  const params = useSearchParams()
  const search = params.get("search")
  const [showClear, setShowClear] = React.useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: search ?? "",
    },
  })

  React.useEffect(() => {
    form.setValue("search", search ?? "")
    console.log(search)
    if (search && search !== "") {
      setShowClear(true)
    } else {
      setShowClear(false)
    }
  }, [search])

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    if (values.search === "") {
      router.push("/")
    } else {
      router.push(`/?search=${values.search}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-start">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[440px]"
                  placeholder="Filter rooms by name, description or tag keywords like react, typescript, nextjs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon className="h-6 w-6 mr-2" />
          Search
        </Button>
        {showClear && (
          <Button variant={"link"} onClick={() => form.setValue("search", "")}>
            Clear
          </Button>
        )}
      </form>
    </Form>
  )
}