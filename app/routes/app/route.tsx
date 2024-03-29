import {
  ActionFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { generateVCardString } from "./util";

import { getValidatedFormData } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import QRForm from "./QRForm";
import QRCodeA from "./QRCode";

const schema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  mobileNumber: z.string(),
  mobileCountryCode: z.string(),
  phoneNumber: z.string(),
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().min(1).optional().or(z.literal("")),
  website: z.string(),
});

export type FormData = z.infer<typeof schema>;
const resolver = zodResolver(schema);

export const meta: MetaFunction = () => {
  return [
    { title: "vCard QR Generator" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const b = randomIntFromInterval(0, 100);

  const { receivedValues, errors, data } = await getValidatedFormData<FormData>(
    request,
    resolver
  );

  if (errors) {
    return json({ errors, receivedValues });
  }

  const vCard = generateVCardString(data);

  return json({ vCard, b });
}

export default function Index() {
  const data = useActionData<typeof action>();

  // const navigation = useNavigation();
  // const isSubmitting = navigation.formAction === "/";

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center p-2 text-3xl font-bold underline">
        Generate QR Code vCard
      </h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="w-full md:max-w-[50%] flex justify-center items-center pt-8">
          <QRForm />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <QRCodeA value={data?.vCard} b={data?.b}/>
        </div>
      </div>
    </div>
  );
}
