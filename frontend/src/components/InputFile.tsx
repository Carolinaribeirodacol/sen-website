import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputFile(name: any) {
    return (
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <Label htmlFor="avatar">Avatar</Label>
            <Input
                id={name}
                name={name}
                type="file"
                className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
    )
}