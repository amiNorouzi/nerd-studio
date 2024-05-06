"use client"
import { PlanItem } from "@/services/types";
import RenderIf from "@/components/shared/RenderIf";
import { useGetDictionary } from "@/hooks";
import { DescriptionHoverCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { separateNumber } from "@/lib/utils";

/**
 * PlanCard component used in plan selection of upgrade panel
 * @param plan PlanItem
 * @param showYearly - show yearly price
 * @constructor
 */
function PlanCard({
  plan,
  showYearly,
}: {
  plan: PlanItem;
  showYearly: boolean;
}) {
  const {
    common: { upgrade, month, day, year },
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  return (
    <div className="col w-40 gap-2 rounded-md border p-3">
      {/* plan title*/}
      <h2>
        {plan.title} {/* render if target plan is active for user*/}
        <RenderIf isTrue={plan.isActive}>
          <span className="rounded-sm bg-active px-1.5 text-primary">
            {userPanelDictionary.current_plan_tag}
          </span>
        </RenderIf>
      </h2>
      {/* plan price*/}
      <p className="text-xl font-semibold">
        ${showYearly ? plan.yearlyPrice : plan.price}{" "}
        <span className="text-xsm font-normal">/ {month}</span>
      </p>
      {/* plan credits*/}
      <p className="row gap-1 border-b pb-2 text-xs">
        {separateNumber(plan.creditsAmount.toString())}{" "}
        {plan.isFree
          ? userPanelDictionary.free_credits_tag
          : userPanelDictionary.credits_tag}{" "}
        / {plan.isDaily ? day : month.slice(0, 2)}
        <DescriptionHoverCard
          description={plan.description}
          iconSize=".75rem"
        />
      </p>
      {/* plan features*/}
      <ul className="col mb-1 list-item list-disc gap-2 ps-4">
        {plan.features.map(feature => (
          <li
            key={feature.id}
            className="text-xs font-normal text-muted-foreground"
          >
            <div className="flex items-start gap-1">
              {feature.title}
              <RenderIf isTrue={feature.description !== ""}>
                <DescriptionHoverCard
                  description={feature.description}
                  iconSize=".75rem"
                />
              </RenderIf>
            </div>
          </li>
        ))}
      </ul>

      {/*
        upgrade button
        active plan will not have(is disabled)
        */}
      <Button disabled={plan.isActive} className="mt-auto">
        {/*
            label is different for active and inactive plans
        */}
        {plan.isActive
          ? userPanelDictionary.current_plan_button_label
          : upgrade}
      </Button>
    </div>
  );
}

export default PlanCard;
