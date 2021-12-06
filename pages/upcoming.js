import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { getLayout } from "../common/layouts/NavFooterLayout";
import EventCard from "../modules/events/components/Event";
import Link from "next/link";
import { UilPlus } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { Validator } from "../common/util/validation";
import { UilExclamationOctagon } from "@iconscout/react-unicons";
import { Api } from '../common/api';
import { useEffect, useState } from "react";


const Upcoming = () => {
  const router = useRouter();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(async () => {
    try {
      let { data } = await Api.get('/events');
      setMyEvents(() => data);
    } catch(e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    console.log({myEvents})
  }, [myEvents])

  return (
    <>
      <div className="d-flex justify-content-between pb-4 pt-4">
        <h3>Upcoming</h3>
        <Link href="/semester/add" passHref={true}>
          <Button startIcon={<UilPlus />}>Add Event</Button>
        </Link>
      </div>
      {myEvents.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-fill">
          <h6 className="text-warning">
            <UilExclamationOctagon /> you dont have any events yet
          </h6>
        </div>
      ) : (
        <div className="d-flex flex-wrap">
        {
          myEvents.map((event, index) => (
            <EventCard
              key={index}
              event={event}
            />
          ))
        }
        </div>
      )}
    </>
  );
};

Upcoming.getLayout = getLayout;

export default Upcoming;
