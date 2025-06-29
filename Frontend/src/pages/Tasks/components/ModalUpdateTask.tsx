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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ModalUpdateTarea({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Actualizar Tarea</DialogTitle>
            <DialogDescription>
              Completa los detalles para actualizar la tarea.
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
                  <SelectValue placeholder="Selecciona la dificultad" />
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
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
