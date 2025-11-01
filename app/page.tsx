import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import {events} from "@/lib/constants"



export default function Page() {
  return (
    <section>
      <h1 className="text-center">The Hub For Every Dev 
      <br/> 
      Event You Cannot Miss.
      </h1>
      <p className="text-center mt-5">Hackton, Meet Up, Meeting,etc.</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title} className="event-item list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}