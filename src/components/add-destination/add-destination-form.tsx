"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Save, Trash } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { redirect } from "next/navigation"

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"]

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

type FormState = typeof initialForm

const fieldClassName =
  "h-11 rounded-lg border-transparent bg-muted px-3.5 focus-visible:border-ring"
const labelClassName = "text-base"

export function AddDestinationForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [categoryError, setCategoryError] = useState(false)

  const update =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { value } = event.target
      setForm((prev) => ({ ...prev, [field]: value }))
      setSubmitted(false)
      if (field === "category") setCategoryError(false)
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.category) {
      setCategoryError(true)
      return
    }
    const formData = new FormData(event.currentTarget);
    const newDestination = Object.fromEntries(formData.entries());
    console.log("NewDestination Data: ", newDestination);

    const res = await fetch(`http://localhost:5000/destinations`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(newDestination),
    });
    const resData = await res.json();
    console.log("Data from Server response: ", resData);
    if(resData.insertedId){
      redirect('/');
    }
  

    // Client-only demo: no backend exists yet.
    console.log("FormData for new destination:", form)
    setSubmitted(true)
    setForm(initialForm)
    setCategoryError(false)
  }

  const handleCancel = () => {
    setForm(initialForm)
    setCategoryError(false)
    setSubmitted(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name" className={labelClassName}>
            Destination Name
          </Label>
          <Input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Bali Paradise"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className={labelClassName}>
            Country
          </Label>
          <Input
            id="country"
            name="country"
            required
            value={form.country}
            onChange={update("country")}
            placeholder="Indonesia"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className={labelClassName}>
            Category
          </Label>
          <Select
            value={form.category}
            onValueChange={(value) => {
              setForm((prev) => ({ ...prev, category: value ?? "" }))
              setCategoryError(false)
              setSubmitted(false)
            }}
          >
            <SelectTrigger
              id="category"
              className={cn(fieldClassName, "w-full")}
              aria-invalid={categoryError || undefined}
            >
              <SelectValue placeholder="Beach" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {categoryError && (
            <p role="alert" className="text-sm text-destructive">
              Please select a category.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className={labelClassName}>
            Price (USD)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            required
            value={form.price}
            onChange={update("price")}
            placeholder="e.g., 1299"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className={labelClassName}>
            Duration
          </Label>
          <Input
            id="duration"
            name="duration"
            required
            value={form.duration}
            onChange={update("duration")}
            placeholder="e.g., 7 Days/6 Nights"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="departureDate" className={labelClassName}>
            Departure Date
          </Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="date"
            required
            value={form.departureDate}
            onChange={update("departureDate")}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="imageUrl" className={labelClassName}>
            Image URL
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            value={form.imageUrl}
            onChange={update("imageUrl")}
            placeholder="https://example.com/image.jpg"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description" className={labelClassName}>
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            required
            value={form.description}
            onChange={update("description")}
            placeholder="Describe the travel experience..."
            className="min-h-36 rounded-lg border-transparent bg-muted px-3.5 py-3 focus-visible:border-ring"
          />
        </div>
      </div>

      {submitted && (
        <p
          role="status"
          className="rounded-lg bg-cyan-50 px-4 py-3 text-sm text-cyan-700"
        >
          Travel package added successfully.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="h-11 gap-2 rounded-lg border-red-500 px-6 text-red-500 hover:border-red-600 hover:bg-red-500/10 hover:text-red-600"
        >
          <Trash aria-hidden="true" />
          Reset
        </Button>
        <Button
          type="submit"
          className="h-11 gap-2 rounded-lg bg-cyan-600 px-6 text-white hover:bg-cyan-700"
        >
          <Save aria-hidden="true" />
          Add Travel Package
        </Button>
      </div>
    </form>
  )
}
