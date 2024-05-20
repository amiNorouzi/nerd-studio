import { Menu } from "react-pro-sidebar";
import SidePanelItem from "./SidePanelItem";
import SpaceItems from "@/components/layout/side-panel/SpaceItems";
import { UserMenu } from "@/components/user";
import { apps } from "@/constants/side-panel";
import { getHslColorByVar } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  activeTheme: AppTheme;
  setGrammarHistoryIsOpen(isOpen: boolean): void;
  setSelectHistoryItem(item: any): void;
};
export default function SidePanelMenu({
  isOpen,
  activeTheme,
  setGrammarHistoryIsOpen,
  setSelectHistoryItem,
}: Props) {
  return (
    <Menu
      rootStyles={{
        padding: "10px 0",
      }}
      menuItemStyles={{
        button: ({ active }) => ({
          background: active
            ? `linear-gradient(90deg, ${getHslColorByVar(activeTheme.includes("-dark") ? "--primary-dark" : "--primary-light")}, transparent)`
            : "transparent",
          color: active
            ? getHslColorByVar("--foreground")
            : getHslColorByVar("--muted-foreground"),
          display: "flex",
          justifyContent: isOpen ? "start" : "center",
          alignItems: "center",
          padding: isOpen ? "1px 10px" : "1px 4px 1px 0px",
          height: "var(--spacing-element-height)",
          width: "100%",
          zIndex: 1,
          "&:hover": {
            backgroundColor: "var(--hover)",
          },
        }),
        icon: {
          margin: "0 auto",
        },
      }}
      onClick={() => {
        setGrammarHistoryIsOpen(false);
        setSelectHistoryItem({
          answer_text: "",
          id: 0,
          app_type: "grammar",
          uuid: "12121212",
          created_at: "12121212",
        });
      }}
    >
      {apps.map(app => (
        <SidePanelItem
          key={app.id}
          title={app.title}
          to={app.route}
          icon={app.Icon}
        />
      ))}

      <div className="col absolute inset-x-0 bottom-0 gap-1.5 py-2">
        <SpaceItems />
        <UserMenu />
      </div>
    </Menu>
  );
}
