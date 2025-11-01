export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

//curated list of events for devlopers
//image assets are stored in public/images folder with next/image
//via path like "images/event1.png"
//generate real world data which will sound relatistic

export const  events: EventItem[] = [
    { 
        image: "/images/event1.png",
        title: "Event One",
        slug: "event-1",
        location: "Oslo",
        date: "2024-07-15",
        time: "18:00"
    },
    { 
        image: "/images/event2.png",
        title: "Event Two",
        slug: "event-2",
        location: "Bergen",
        date: "2024-08-20",
        time: "10:00"
    },
    {
        image: "/images/event3.png",
        title: "Event Three",
        slug: "event-3",
        location: "Trondheim",
        date: "2024-09-05",
        time: "14:00"
    },
    {
        image: "/images/event4.png",
        title: "Event Four",
        slug: "event-4",
        location: "Stavanger",
        date: "2024-10-12",
        time: "09:00"
    },
    {
        image: "/images/event5.png",
        title: "Event Five",
        slug: "event-5",
        location: "Kristiansand",
        date: "2024-11-22",
        time: "16:00"
    },
]

