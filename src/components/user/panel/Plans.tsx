import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import { plans } from "@/constants/plans";
import PlanCard from "./PlanCard";

// list of plans show in upgrade panel in user panel dialog
function Plans() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();
  const [activePlansTap, setActivePlansTap] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const tabClass = "w-full h-full bg-transparent transition-all duration-200";

  return (
    <section className="col gap-4 pt-4">
      <h4 className="border-b pb-2">{userPanelDictionary.compare_title}</h4>

      <div className="mx-auto flex h-9 w-48 rounded-md bg-muted p-1">
        <Button
          variant="ghost"
          onClick={() => setActivePlansTap("monthly")}
          className={cn(
            tabClass,
            activePlansTap === "monthly" && "bg-background shadow-sm",
          )}
        >
          {userPanelDictionary.monthly_label}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActivePlansTap("yearly")}
          className={cn(
            tabClass,
            activePlansTap === "yearly" && "bg-background shadow-sm",
          )}
        >
          {userPanelDictionary.yearly_label}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {plans.map(plan => (
          <PlanCard
            plan={plan}
            key={plan.id}
            showYearly={activePlansTap === "yearly"}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        className="mx-auto text-primary hover:text-primary/80"
      >
        {userPanelDictionary.see_all_feature_button_label}
      </Button>
    </section>
  );
}

export default Plans;
