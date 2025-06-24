import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DialogNewTask() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="text-emerald-700 font-semibold px-4 py-2 border-2 border-emerald-700/20 rounded hover:bg-gray-50 transition-colors cursor-pointer">
            Nueva Tarea
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva tarea</DialogTitle>
            <DialogDescription>
              Completa los detalles para tu nueva tarea.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="name-1">Nombre de la tarea</Label>
              <Input id="name-1" name="name" placeholder="Escribe el nombre de la tarea" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date-1">Fecha</Label>
              <Input id="date-1" name="date" type="date" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Dificultad</Label>
              <Select >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dificultad</SelectLabel>
                    <SelectItem value="apple">Facil</SelectItem>
                    <SelectItem value="banana">Media</SelectItem>
                    <SelectItem value="blueberry">Dificil</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 gap-3 grid">
              <Label htmlFor="description-1">Descripción</Label>
              <Textarea id="description-1" className="resize-none" name="description" placeholder="Escribe una breve descripción" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
