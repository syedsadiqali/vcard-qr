import { Form } from "@remix-run/react";

import { useRemixForm } from "remix-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "./route";

export default function QRForm() {
  const {
    handleSubmit,
    formState: { isValid, errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      firstname: "",
      lastname: "",
      mobileCountryCode: "+91"
    },
  });

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
      className="w-[70%] flex flex-col gap-4"
    >
      <Label className="flex flex-col gap-4">
        Your Full Name
        <Input
          placeholder="First Name"
          type="text"
          {...register("firstname")}
        />
        <Input placeholder="Last Name" type="text" {...register("lastname")} />
        {errors?.firstname || errors?.lastname ? (
          <p className="text-destructive">
            {errors?.firstname?.message || errors?.lastname?.message}
          </p>
        ) : null}
      </Label>

      <Label className="flex flex-col gap-4">
        Contact
        <span className="flex gap-2">
        <Input placeholder="Code" type="text" {...register("mobileCountryCode")} className="w-[70px]"/>
        <Input placeholder="Mobile" type="text" {...register("mobileNumber")} />
        </span>
        <Input placeholder="Phone" type="text" {...register("phoneNumber")} />
        {errors?.mobileNumber || errors?.phoneNumber ? (
          <p className="text-destructive">
            {errors?.phoneNumber?.message || errors?.mobileNumber?.message}
          </p>
        ) : null}
      </Label>

      <Label className="flex flex-col gap-4">
        Email
        <Input placeholder="Email" type="text" {...register("email")} />
		{errors?.email ? (
          <p className="text-destructive">
            {errors?.email?.message}
          </p>
        ) : null}
      </Label>

      <Label className="flex flex-col gap-4">
        Company
        <Input placeholder="Company" type="text" {...register("company")} />
      </Label>

      <Label className="flex flex-col gap-4">
        Website
        <Input placeholder="Website" type="text" {...register("website")} />
      </Label>

      <Button disabled={!isValid}>Generate QR</Button>
    </Form>
  );
}
