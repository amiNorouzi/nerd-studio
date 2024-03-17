import { Progress } from "@/components/ui/progress";
import RenderIf from "@/components/shared/RenderIf";
import { useGetDictionary } from "@/hooks";

interface IProps {
  title: string;
  availableAmount: number | string;
  totalAmount: number | string;
  description?: string;
  progress: number;
}

/**
 * a progress bar used in upgrade panel in user panel dialog
 * @param availableAmount not used amount
 * @param totalAmount total amount
 * @param description show a description under the progress
 * @param title progress title
 * @param progress
 * @constructor
 */
function UpgradeDetailsProgress({
  availableAmount,
  totalAmount,
  description,
  title,
  progress,
}: IProps) {
  const {
    common: { total, available },
  } = useGetDictionary();

  return (
    <div className="col gap-1">
      <div className="spacing-row mt-2">
        <p>{title}</p>
        <p className="text-xs font-light text-muted-foreground">
          <span className="font-normal !text-foreground">
            {availableAmount}{" "}
          </span>
          {available} / {totalAmount} {total}
        </p>
      </div>
      <Progress value={progress} className="h-2 bg-muted" />
      <RenderIf isTrue={!!description}>
        <p className="text-xs font-normal text-muted-foreground">
          {description}
        </p>
      </RenderIf>
    </div>
  );
}

export default UpgradeDetailsProgress;
