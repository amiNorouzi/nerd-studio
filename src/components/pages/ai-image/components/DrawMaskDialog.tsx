"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { BsEraser } from "react-icons/bs";
import { MdUndo } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import CanvasDraw from "@karyum/react-canvas-draw";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MyTooltip } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import useMobileSize from "@/hooks/useMobileSize";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

import { useGetDictionary } from "@/hooks";

import type { StateSetterType } from "@/services/types";
import useInputValue from "@/components/pages/ai-image/hooks/useInputValue";

interface IProps {
  imageSrc: string;
  open: boolean;
  setOpen: StateSetterType<boolean>;
  canvasDimensions: {
    width: number;
    height: number;
  };
}

/**
 * used for image to image tab in  image generate
 * draw a mask on uploaded image with brush for mask image
 * @param isMobileSize for check if mobile size render bottom sheet else popover
 * @param canvasDimensions width and height of canvas changed by size of device
 * @param imageSrc image to draw mask for it
 * @param open ia dialog open
 * @param setOpen setter for is dialog open
 * @constructor
 */
const DrawMaskDialog: FC<IProps> = ({
  canvasDimensions,
  imageSrc,
  open,
  setOpen,
}) => {
  const {
    common: { share },
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [brushWidth, setBrushWidth] = useState(20);
  const [brushColor, setBrushColor] = useState("#00000090");
  const canvasRef = useRef<typeof CanvasDraw>(null); // ref for draw canvas
  const [savaData, setSavaData] = useState(""); //current changes that set after close dialog
  const [isLoaded, setIsLoaded] = useState(false); //need for check if component load draw saved data
  const isMobile = useMobileSize();
  const { getValue, changeValue } = useInputValue();

  useEffect(() => {
    if (open) {
      setIsLoaded(true);
    }
    return () => {
      setIsLoaded(false);
    };
  }, [open]);

  useEffect(() => {
    if (isLoaded) {
      //if any data saved load it
      if (savaData !== "") {
        canvasRef.current!.loadSaveData(savaData);
      }
    }
  }, [isLoaded, savaData]);

  /**
   * change size of brush nad eraser
   * @param val width of brush
   */
  const changeBrushWidth = (val: number) => {
    setBrushWidth(val);
  };

  /**
   * change color of brush
   * it's black or white because stable diffusion image to image accept black and white
   * @param color color of brush(black or white)
   */
  const handleChangeColor = (color: string) => {
    setBrushColor(color);
  };

  //set final image to use in masking
  const handleSave = () => {
    // @ts-ignore
    const maskData = canvasRef.current!.getDataURL();
    changeValue("mask", maskData);
    setOpen(false);
  };

  /**
   * open or close dialog
   * @param isOpen
   */
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      //save current changes for when use open dialog again load the saved data
      setSavaData(canvasRef.current!.getSaveData());
    }
  };

  /**
   * main content
   * rendered in drawer form mobile and in dialog for desktop
   */
  const renderMain = () => (
    <div className="col flex-grow items-center justify-center md:mt-2 ">
      <CanvasDraw
        imgSrc={imageSrc}
        ref={canvasRef}
        hideGrid
        brushColor={brushColor}
        brushRadius={brushWidth}
        lazyRadius={0}
        canvasWidth={canvasDimensions.width}
        canvasHeight={canvasDimensions.height}
        backgroundColor="hsl(var(--muted))"
        className="border border-primary/10"
      />

      <div className="row w-full max-w-[80vw] flex-wrap justify-center gap-2 pt-2">
        {/*brush size*/}
        <div className="row w-full gap-2 rounded-lg border bg-muted p-3 sm:w-64">
          <Label htmlFor="brush-width">
            {imageDictionary.brush_size_label}
          </Label>
          <Slider
            defaultValue={[5]}
            min={1}
            max={40}
            step={1}
            className="w-full"
            id="brush-width"
            onValueChange={val => changeBrushWidth(val[0])}
          />
        </div>

        {/*undo button*/}
        <MyTooltip title={imageDictionary.undo_button_label} side="top">
          <Button
            variant="outline"
            className="fit border-primary/20 p-2"
            onClick={() => canvasRef.current!.undo()}
          >
            <MdUndo size="1.1rem" />
          </Button>
        </MyTooltip>

        {/*erase button*/}
        <MyTooltip title={imageDictionary.erase_button_label} side="top">
          <Button
            variant="outline"
            className="fit border-primary/20 p-2"
            onClick={() => canvasRef.current!.clear()}
          >
            <BsEraser size="1.1rem" />
          </Button>
        </MyTooltip>

        {/*
          select color between white and black
          TODO: change settings mask selected color for send to AI
        */}
        <Select onValueChange={handleChangeColor} value={brushColor}>
          <SelectTrigger className="h-9 w-24 bg-muted text-xs capitalize focus:ring-0">
            <div className="row gap-1.5">
              <div
                className="h-4 w-4 rounded-full border border-primary"
                style={{ backgroundColor: brushColor }}
              />
              {/*show selected color in trigger*/}
              {brushColor === "#00000090"
                ? imageDictionary.black_color_label
                : imageDictionary.white_color_label}
            </div>
          </SelectTrigger>
          <SelectContent>
            {/*black item*/}
            <SelectItem
              value="#00000090"
              className="hide-svg px-0 data-[state=checked]:bg-primary-light"
            >
              <div className="row gap-2">
                <div className="h-4 w-4 rounded-full border-primary bg-[#00000090]" />
                {imageDictionary.black_color_label}
              </div>
            </SelectItem>
            {/*white item*/}
            <SelectItem
              value="#ffffff90"
              className="hide-svg px-0  data-[state=checked]:bg-primary-light"
            >
              <div className="row gap-2">
                <div className="h-4 w-4 rounded-full border border-primary bg-[#ffffff90]" />
                {imageDictionary.white_color_label}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/*save button*/}
        <MyTooltip title={share} side="top">
          <Button className="fit p-2" onClick={handleSave}>
            <TfiSave size="1.1rem" />
          </Button>
        </MyTooltip>
      </div>
    </div>
  );

  // un mobile size render drawer from button
  if (isMobile)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="p-5">
          <DrawerHeader>
            <DrawerTitle>{imageDictionary.draw_mask_title}</DrawerTitle>
            <DrawerDescription>
              {imageDictionary.draw_mask_description}
            </DrawerDescription>
          </DrawerHeader>
          {renderMain()}
        </DrawerContent>
      </Drawer>
    );

  // for desktop in a dialog
  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="col h-[100dvh] max-h-[100dvh] max-w-[100vw] overflow-y-auto bg-popover
           p-5 md:max-w-xl lg:h-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center md:text-start">
            {imageDictionary.draw_mask_title}
          </DialogTitle>
          <DialogDescription className="text-center md:text-start">
            {imageDictionary.draw_mask_description}
          </DialogDescription>
        </DialogHeader>
        {renderMain()}
      </DialogContent>
    </Dialog>
  );
};

export default DrawMaskDialog;
