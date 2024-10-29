"use client";

import { ChangeEvent } from "react";
import InputLabel from "./InputLabel";

export interface InputCheckboxOptions {
  name: string;
  label: string;
  value: string | number;
  error?: string;
  className?: string;
  onValueChanged: { (value: any): void };
}

export default function InputCheckbox(options: InputCheckboxOptions) {
  function onValueChanged(event: ChangeEvent<HTMLInputElement>) {
    options.onValueChanged(event.target.checked);
  }

  return (
    <div className={`flex flex-col ${options.className ?? ""}`}>
      <div className="flex items-center gap-3">
        <input className="checkbox border-fiap-green" name={options.name} type="checkbox" onChange={onValueChanged} />
        <InputLabel htmlFor={options.name} text={options.label} textBold={false} />
      </div>
      {options.error && <span className="text-red-500">{options.error}</span>}
    </div>
  );
}
