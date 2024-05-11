import { docs } from "@/constants/dashboard";
import { useGetDictionary } from "@/hooks";

/**
 * chat hero section
 * @constructor
 */
export default function ChatHero() {
  //TODO: write chat dictionary
  const {
    page: { dashboard: dashboardDictionary, chat },
  } = useGetDictionary();

  return (
    <div className="form-gap hidden w-full  flex-col items-start rounded-xl border px-form-padding py-4.5 lg:flex">
      <h4 className="text-sm font-medium">{chat.chatHero_title}</h4>
      <section className="grid w-full grid-cols-3 max-lg:gap-2 md:grid-cols-6">
        {docs.map(item => (
          <div
            key={item.id}
            className="flex h-full w-full flex-col items-center justify-start  max-lg:cursor-pointer
           max-lg:rounded-xl max-lg:border max-lg:bg-background max-lg:shadow-dashboard-card lg:flex-row "
          >
            <div
              className="centered-col aspect-square h-11 rounded-lg"
              style={{ backgroundColor: item.iconBackground }}
            >
              <item.Icon color={item.color} size="18" />
            </div>
            <div className="col p-3 text-sm  font-medium text-muted-foreground">
              <span className="text-xs font-light">
                {dashboardDictionary[item.titleKey]}
              </span>
              <span className="text-xs font-light">
                {dashboardDictionary[item.subtitleKey]}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
