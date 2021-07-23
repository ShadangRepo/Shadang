import React from "react";
import MaskedInput, { conformToMask } from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

const TextMaskCustom = (props) => {
  const { inputRef, mask, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={"\u2000"}
      showMask
      guide={false}
    />
  );
};

const phoneMask = [
  /[7-9]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const phoneMask2 = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

// Temporal license mask until a format is defined
const licenseMask = [
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
  /[0-9-]/,
];

const moneyMask = createNumberMask({ allowDecimal: true, prefix: "$" });
const decimalMask = createNumberMask({ allowDecimal: true, prefix: "" });

const intMask = (props) => {
  const intlimit = props.intlength || 9;
  let mask = [];
  for (let i = 0; i < intlimit; i++) {
    mask.push(/\d/);
  }
  return mask;
};

const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/];

const ZipCodeField = (props) => (
  <TextMaskCustom {...props} mask={zipCodeMask} />
);
const CustomZipCodeField = (props) => (
  <TextMaskCustom
    {...props}
    mask={[
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      props.value.length > 5 ? "-" : /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ]}
  />
);
const PhoneField = (props) => <TextMaskCustom {...props} mask={phoneMask} />;
const PhoneField2 = (props) => <TextMaskCustom {...props} mask={phoneMask2} />;
const LicenseField = (props) => (
  <TextMaskCustom {...props} mask={licenseMask} />
);
const IntField = (props) => <TextMaskCustom {...props} mask={intMask(props)} />;
const MoneyField = (props) => <TextMaskCustom {...props} mask={moneyMask} />;
const formatPhone = (text) => conformToMask(text, phoneMask2).conformedValue;
const formatZipCode = (text) => conformToMask(text, zipCodeMask).conformedValue;
const DecimalField = (props) => (
  <TextMaskCustom {...props} mask={decimalMask} />
);

export {
  ZipCodeField,
  CustomZipCodeField,
  PhoneField,
  PhoneField2,
  LicenseField,
  formatPhone,
  IntField,
  MoneyField,
  DecimalField,
  formatZipCode,
};
