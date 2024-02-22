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
      <h2>
        {plan.title}{" "}
        <RenderIf isTrue={plan.isActive}>
          <span className="rounded-sm bg-active px-1.5 text-primary">
            {userPanelDictionary.current_plan_tag}
          </span>
        </RenderIf>
      </h2>
      <p className="text-xl font-semibold">
        ${showYearly ? plan.yearlyPrice : plan.price}{" "}
        <span className="text-xsm font-normal">/ {month}</span>
      </p>
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

      <Button
        disabled={plan.isActive}
        variant={plan.isActive ? "muted" : "default"}
        className="mt-auto"
      >
        {plan.isActive
          ? userPanelDictionary.current_plan_button_label
          : upgrade}
      </Button>
    </div>
  );
}

export default PlanCard;
