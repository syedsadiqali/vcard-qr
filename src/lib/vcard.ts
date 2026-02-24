import {
  EmailProperty,
  FNProperty,
  IntegerType,
  NProperty,
  OrgProperty,
  ParameterValueType,
  PrefParameter,
  SpecialValueType,
  TelProperty,
  TextType,
  TypeParameter,
  URIType,
  URLProperty,
  VCARD,
  ValueParameter,
} from "vcard4";

export type VCardFormValues = {
  firstname: string;
  lastname: string;
  mobileNumber: string;
  mobileCountryCode: string;
  phoneNumber: string;
  email?: string;
  company?: string;
  website: string;
};

export function generateVCardString(data: VCardFormValues) {
  const {
    firstname,
    lastname,
    mobileNumber,
    phoneNumber,
    email,
    company,
    website,
    mobileCountryCode,
  } = data;

  const fields = [];

  if (firstname.trim() !== "") {
    const fn = new FNProperty([], new TextType(`${firstname} ${lastname}`.trim()));
    const nArr = new Array(5);
    nArr[0] = new TextType(firstname);
    nArr[1] = new TextType(lastname);
    const n = new NProperty([], new SpecialValueType("nproperty", nArr));
    fields.push(fn, n);
  }

  if (phoneNumber.trim() !== "") {
    const tel1 = new TelProperty(
      [
        new ValueParameter(new TextType(phoneNumber)),
        new TypeParameter("telproperty", [
          new ParameterValueType("work"),
          new ParameterValueType("voice"),
        ]),
        new PrefParameter(new IntegerType(1)),
      ],
      new TextType(phoneNumber)
    );

    fields.push(tel1);
  }

  if (mobileNumber.trim() !== "" && mobileCountryCode.trim() !== "") {
    const mobileFullNumber = `${mobileCountryCode}${mobileNumber}`;
    const tel2 = new TelProperty(
      [
        new ValueParameter(new TextType(mobileFullNumber)),
        new TypeParameter("telproperty", [
          new ParameterValueType("home"),
          new ParameterValueType("voice"),
        ]),
        new PrefParameter(new IntegerType(1)),
      ],
      new TextType(mobileFullNumber)
    );

    fields.push(tel2);
  }

  if (email && email.trim() !== "") {
    const cardEmail = new EmailProperty(
      [new TypeParameter("emailproperty", new ParameterValueType("work"))],
      new TextType(email)
    );
    fields.push(cardEmail);
  }

  if (website.trim() !== "") {
    const url = website.startsWith("http") ? website : `https://${website}`;
    const cardWebsite = new URLProperty([], new URIType(url));
    fields.push(cardWebsite);
  }

  if (company && company.trim() !== "") {
    const org = new OrgProperty(
      [new TypeParameter("orgproperty", new ParameterValueType("work"))],
      new SpecialValueType("orgproperty", [new TextType(company)])
    );
    fields.push(org);
  }

  if (fields.length === 0) {
    return "";
  }

  const card = new VCARD(fields);
  return card.repr();
}
