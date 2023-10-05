import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    name: any
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputFile({ name, onChange }: Props) {
    return (
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Avatar</Label>
            <Input
                accept="image/*"
                id={name}
                name={name}
                type="file"
                onChange={onChange}
                className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
    )
}