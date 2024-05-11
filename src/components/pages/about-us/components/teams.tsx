"use client";
import { useGetTeams } from "@/services/static-pages/contact-us";
import CardContactUs from "./card";
export interface Employe {
  id: string;
  name: string;
  family: string;
  avatar: string;
  role: {
    title: string;
  };
  about: string;
  
}
const TeamsSection = () => {
  const { data, isLoading } = useGetTeams();

  return (
    <div className="mt-16  w-full space-y-6 px-5 py-4 text-center">
      <h1 className=" text-2xl font-medium md:text-4xl">Meet our team</h1>
      <div className="flex-wrap items-center justify-center gap-5 space-y-6  text-center md:flex">
        {!isLoading &&
          data.map((perosn: Employe) => {
            return (
              <CardContactUs
                id={perosn.id}
                name={perosn.name}
                family={perosn.family}
                avatar={perosn.avatar}
                about={perosn.about}
                role={perosn.role}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TeamsSection;
// {
//     "id": 1,
//     "name": "john",
//     "family": "doe",
//     "avatar": "https://nerdstudio-backend-bucket.s3.amazonaws.com/media/team/avatars/avatar-JohnDoe.jpg",
//     "role": {
//       "title": "Backend developer"
//     },
//     "joined_team": "2024-05-08T07:34:56Z",
//     "leave_team": null,
//     "about": "about",
//     "review": "review",
//     "services": "services",
//     "favorites": "favorites",
//     "weight": 3,
//     "social_media": [
//       {
//         "handler": "johndoe",
//         "social_media": {
//           "title": "twitter",
//           "logo": "https://nerdstudio-backend-bucket.s3.amazonaws.com/media/teams/social/avatar-JohnDoe.jpg",
//           "url": "http://twitter.com"
//         }
//       }
//     ]
//   }
