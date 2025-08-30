import React from "react";
import { cn } from "@/lib/utils";
import { Dropdown } from "primereact/dropdown";

interface YearPickerWithLabelProps {
  name: string;
  label: string;
  className?: string;
  value?: number;
  onChange?: (e: any) => void; // PrimeReact change event
  required?: boolean;
  readonly?: boolean;
  bgColor?: string;
  startYear?: number;
  endYear?: number;
  placeholder?: string;
}

const YearPickerWithLabel: React.FC<YearPickerWithLabelProps> = ({
  name,
  label,
  className,
  value,
  onChange,
  required = false,
  readonly = false,
  bgColor = "#fff",
  startYear = 1900,
  placeholder = "Select Year",
  endYear = new Date().getFullYear(),
}) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year.toString(), value: year });
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className="font-bold text-gray-700 mb-2 block">
        {label}
      </label>
      <Dropdown
        id={name}
        value={value}
        options={years}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          boxShadow:
            "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
          border: "none",
          borderRadius: 10,
          backgroundColor: bgColor,
          fontFamily: "Montserrat",
        }}
        className={cn(
          "w-full h-10 lg:h-11 text-sm rounded-2xl focus:border-none",
          className
        )}
        disabled={readonly}
        required={required}
      />
    </div>
  );
};

export default YearPickerWithLabel;
