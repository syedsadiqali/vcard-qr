import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VCardFormValues } from "@/lib/vcard";
import { useEffect } from "react";

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().optional().default(""),
  mobileNumber: z.string().optional().default(""),
  mobileCountryCode: z.string().default("+91"),
  phoneNumber: z.string().optional().default(""),
  email: z.string().email("Please enter a valid email").or(z.literal("")),
  company: z.string().optional().default(""),
  website: z
    .string()
    .optional()
    .default("")
    .refine(
      (value) => {
        if (value.trim() === "") {
          return true;
        }

        try {
          const parsed = new URL(
            value.startsWith("http://") || value.startsWith("https://")
              ? value
              : `https://${value}`
          );
          return parsed.hostname.includes(".");
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid website" }
    ),
})
  .superRefine((value, ctx) => {
    const mobile = value.mobileNumber.trim();
    const phone = value.phoneNumber.trim();

    if (mobile === "" && phone === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobileNumber"],
        message: "Add a mobile or phone number",
      });
    }

    const numberPattern = /^[0-9+()\-\s]{7,20}$/;
    if (mobile !== "" && !numberPattern.test(mobile)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobileNumber"],
        message: "Use a valid mobile number",
      });
    }

    if (phone !== "" && !numberPattern.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phoneNumber"],
        message: "Use a valid phone number",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

type QRFormProps = {
  onLiveChange: (payload: {
    values: VCardFormValues;
    canGenerate: boolean;
    fullName: string;
  }) => void;
};

export function QRForm({ onLiveChange }: QRFormProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
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

  const values = watch();

  useEffect(() => {
    const fullName = `${values.firstname ?? ""} ${values.lastname ?? ""}`.trim();

    onLiveChange({
      values,
      canGenerate: isValid,
      fullName,
    });
  }, [isValid, onLiveChange, values]);

  return (
    <form className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Your Full Name</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            <Input placeholder="First name" {...register("firstname")} />
            <Input placeholder="Last name (optional)" {...register("lastname")} />
          </div>
          {errors.firstname && (
            <p className="text-sm text-destructive">
              {errors.firstname.message}
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
          {(errors.mobileNumber || errors.phoneNumber) && (
            <p className="text-sm text-destructive">
              {errors.mobileNumber?.message || errors.phoneNumber?.message}
            </p>
          )}
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
          <Input placeholder="example.com (optional)" {...register("website")} />
          {errors.website && (
            <p className="text-sm text-destructive">{errors.website.message}</p>
          )}
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Minimum required: first name and at least one phone number.
        </p>
      </div>
    </form>
  );
}
