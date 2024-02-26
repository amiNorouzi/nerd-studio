"use client";
import { Stars } from "@/components/svg-icons";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

/**
 * Favorites section of the dashboard
 * favorites assistants and templates
 * @constructor
 */
export function FavoritesSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();

  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      <div className="col h-72 w-full gap-1 rounded-lg border bg-background p-4 shadow-sm lg:w-1/2">
        {/* favorite assistants*/}
        <h2 className="row text-sm font-semibold">
          <Stars />
          {dashboardDictionary.favorite_assistants_title}
        </h2>
        <p className="text-muted-foreground">
          {dashboardDictionary.favorite_assistants_description}
        </p>

        <p className="col my-auto gap-2 text-center text-muted-foreground/70">
          {dashboardDictionary.favorite_assistants_empty_message}
          <Button
            variant="ghost"
            className="mx-auto w-fit text-primary hover:text-primary/70"
          >
            {dashboardDictionary.favorite_assistants_button_label}
          </Button>
        </p>
      </div>
      {/* favorite templates*/}
      <div className="col h-72 w-full gap-1 rounded-lg border bg-background p-4 shadow-sm lg:w-1/2">
        <h2 className="row text-sm font-semibold">
          <Stars />
          {dashboardDictionary.favorite_template_title}
        </h2>
        <p className="text-muted-foreground">
          {dashboardDictionary.favorite_template_description}
        </p>

        <p className="col my-auto gap-2 text-center text-muted-foreground/70">
          {dashboardDictionary.favorite_template_empty_message}
          <Button
            variant="ghost"
            className="mx-auto w-fit text-primary hover:text-primary/70"
          >
            {dashboardDictionary.favorite_template_button_label}
          </Button>
        </p>
      </div>
    </section>
  );
}
