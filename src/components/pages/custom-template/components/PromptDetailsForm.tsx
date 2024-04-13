"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomTextarea, SelectAndDrawer } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { useTemplateStore } from "@/stores/zustand/template-store";

import type { ChildrenProps } from "@/services/types";

const Box = (props: ChildrenProps) => {
    return (
        <div className="col col-span-2 gap-2 md:col-span-1">{props.children}</div>
    );
};

export function PromptDetailsForm() {
    const {
        page: { custom_template: dictionary },
    } = useGetDictionary();
    const setCustomTemplateDetails =
        useTemplateStore.use.setCustomTemplateDetails();
    const customTemplateDetails = useTemplateStore.use.customTemplateDetails();

    return (
        <div className="grid grid-cols-2 gap-4 p-4 lg:p-7 xl:gap-7 xl:p-9">
            <Box>
                <Label htmlFor="custom-template-name">
                    {dictionary.prompt_name_label}
                </Label>
                <Input
                    id="custom-template-name"
                    value={customTemplateDetails.name}
                    onChange={e => setCustomTemplateDetails("name", e.target.value)}
                />
            </Box>
            <Box>
                <Label htmlFor="custom-template-description">
                    {dictionary.prompt_description_label}
                </Label>
                <Input
                    id="custom-template-description"
                    value={customTemplateDetails.description}
                    onChange={e =>
                        setCustomTemplateDetails("description", e.target.value)
                    }
                />
            </Box>
            <Box>
                <Label>{dictionary.prompt_category_label}</Label>
                <SelectAndDrawer
                    value={customTemplateDetails.category}
                    setValue={val => setCustomTemplateDetails("category", val)}
                    items={["Music"]}
                />
            </Box>

            <Box>
                <Label>{dictionary.prompt_icon_label}</Label>
                <SelectAndDrawer
                    value={customTemplateDetails.icon}
                    setValue={val => setCustomTemplateDetails("icon", val)}
                    items={["GPS"]}
                />
            </Box>

            <div className="col col-span-2 gap-2">
                <Label>{dictionary.prompt_template_label}</Label>
                <CustomTextarea
                    rootClassName="col-span-2"
                    setValue={val => setCustomTemplateDetails("template", val)}
                    value={customTemplateDetails.template}
                    maxLength={4000}
                />
            </div>
        </div>
    );
}
