"use client";
import { useState, KeyboardEvent, useRef, useEffect } from "react";

import { IoClose } from "react-icons/io5";

import RenderIf from "@/components/shared/RenderIf";

import { cn, isEmpty } from "@/lib/utils";

interface IProps {
  onValuesChange: (values: string[]) => void;
  error?: string;
  rootClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

/**
 * input with multiple values
 * pushes values to an array and returns the array
 * value push is triggered by pressing enter, space or comma
 * @param onValuesChange when array change
 * @param error error message
 * @param rootClassName extra class for the root div
 * @param inputWrapperClassName extra class for the input wrapper div
 * @param inputClassName extra class for the input
 * @param placeholder placeholder text
 * @constructor
 */
export function MultiValueInput({
  onValuesChange,
  error,
  rootClassName,
  inputWrapperClassName,
  inputClassName,
  placeholder,
}: IProps) {
  const [values, setValues] = useState<string[]>([]); // array of values
  const [currentValue, setCurrentValue] = useState(""); // current value of input
  const inputRef = useRef<HTMLInputElement>(null); // input ref

  /**
   * add value to the array
   * used when pressing enter, space or comma
   */
  const addValue = () => {
    //if value is empty or already exists, do nothing
    if (!currentValue) return;
    if (values.includes(currentValue)) return;
    setValues([...values, currentValue]);
  };

  /**
   * remove value from the array
   * used when clicking the close button on a value
   * @param val value to remove
   */
  const removeValue = (val: string) => {
    setValues(values.filter(v => v !== val));
  };

  // trigger onValuesChange when values array change
  useEffect(() => {
    onValuesChange(values);
  }, [onValuesChange, values]);

  // handle keydown events for input
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // if enter, space or comma is pressed, add value
    if (
      event.code === "Enter" ||
      event.code === "Space" ||
      event.code === "Comma"
    ) {
      addValue();
      setCurrentValue("");
    }
  };

  return (
    <div className={cn("h-24 w-full", rootClassName)}>
      {/* input wrapper style like input*/}
      <div
        className={cn(
          "relative flex h-full w-full flex-wrap gap-2 rounded-lg border bg-muted p-1.5 focus-within:border-primary focus-within:bg-background hover:border-primary/50",
          !!error &&
            "border-destructive hover:border-destructive focus-visible:border-destructive",
          isEmpty(values) ? "px-2.5" : "px-1.5",
          inputWrapperClassName,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* values */}
        {values.map((value, index) => (
          <div
            key={index}
            className={cn(
              "fit row gap-2 rounded-md border border-primary bg-active px-1.5 py-1 text-xs font-normal text-primary",
              !!error &&
                "border-destructive bg-destructive/10 text-destructive",
            )}
          >
            {value}
            <IoClose
              size=".8rem"
              onClick={() => removeValue(value)}
              className="cursor-pointer"
            />
          </div>
        ))}
        {/* input with no appearance*/}
        <input
          autoFocus
          ref={inputRef}
          value={currentValue}
          onKeyDown={handleKeyDown}
          onChange={e => setCurrentValue(e.target.value)}
          style={{ width: `${currentValue.length + 1}ch`, maxWidth: "100%" }}
          className={cn(
            "h-fit max-w-full appearance-none border-0 bg-transparent py-1 text-xs focus:outline-0 focus:ring-0",
            inputClassName,
          )}
        />

        {/*placeholder*/}
        <RenderIf isTrue={!!placeholder && !currentValue && isEmpty(values)}>
          <span className="absolute inset-x-0 top-0 z-10 select-none px-2.5 pt-1.5 font-normal text-foreground/50">
            {placeholder}
          </span>
        </RenderIf>
      </div>
      {/*error message*/}
      <RenderIf isTrue={!!error}>
        <div className="mt-0.5 flex h-3">
          <span className="error">{error}</span>
        </div>
      </RenderIf>
    </div>
  );
}
