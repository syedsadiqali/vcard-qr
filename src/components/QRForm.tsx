import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VCardFormValues } from "@/lib/vcard";

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  mobileNumber: z.string().optional().default(""),
  mobileCountryCode: z.string().default("+91"),
  phoneNumber: z.string().optional().default(""),
  email: z.string().email("Please enter a valid email").or(z.literal("")),
  company: z.string().optional().default(""),
  website: z.string().min(1, "Website is required"),
});

type FormValues = z.infer<typeof schema>;

type QRFormProps = {
  onGenerate: (values: VCardFormValues) => void;
};

export function QRForm({ onGenerate }: QRFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      mobileCountryCode: "+91",
      mobileNumber: "",
      phoneNumber: "",
      email: "",
      company: "",
      website: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    onGenerate(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6"
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Your Full Name</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            <Input placeholder="First name" {...register("firstname")} />
            <Input placeholder="Last name" {...register("lastname")} />
          </div>
          {(errors.firstname || errors.lastname) && (
            <p className="text-sm text-destructive">
              {errors.firstname?.message || errors.lastname?.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label>Contact</Label>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <Input placeholder="Code" {...register("mobileCountryCode")} />
            <Input placeholder="Mobile" {...register("mobileNumber")} />
          </div>
          <Input placeholder="Phone" {...register("phoneNumber")} />
        </div>

        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" placeholder="name@company.com" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="grid gap-2">
          <Label>Company</Label>
          <Input placeholder="Company" {...register("company")} />
        </div>

        <div className="grid gap-2">
          <Label>Website</Label>
          <Input placeholder="example.com" {...register("website")} />
          {errors.website && (
            <p className="text-sm text-destructive">{errors.website.message}</p>
          )}
        </div>

        <Button type="submit" disabled={!isValid || isSubmitting} className="mt-1 w-full">
          {isSubmitting ? "Generating..." : "Generate QR"}
        </Button>
      </div>
    </form>
  );
}
