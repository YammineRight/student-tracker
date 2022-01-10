import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { getLayout } from "../common/layouts/NavFooterLayout";
import EventCard from "../modules/events/components/Event";
import Link from "next/link";
import { UilPlus } from "@iconscout/react-unicons";
import { connect, useSelector } from "react-redux";
import { Validator } from "../common/util/validation";
import { UilExclamationOctagon } from "@iconscout/react-unicons";
import { Api } from "../common/api";
import { useEffect, useState } from "react";
import Loader from "../common/components/Loader";
import { addEvent } from "../modules/events/redux/getters/main";

const Upcoming = ({ addEvent }) => {
  const myEvents = useSelector((state) => state.events.events);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      let { data } = await Api.get("/events");
      setLoading(false);
      data.forEach((event) => {
        addEvent(event);
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log({ myEvents });
  }, [myEvents]);

  if (loading) {
    return (
      <div className="page-loader-container">
        <Loader />
      </div>
    );
  } else {
    return (
      <>
        <div className="d-flex justify-content-between pb-4 pt-4">
          <h3>Upcoming</h3>
          <Link href="/event/add" passHref={true}>
            <Button startIcon={<UilPlus />}>Add Event</Button>
          </Link>
        </div>
        {Validator.isEmpty(myEvents).success === true ? (
          <div className="d-flex justify-content-center align-items-center flex-fill">
            <h6 className="text-warning">
              <UilExclamationOctagon /> you dont have any events yet
            </h6>
          </div>
        ) : (
          <div className="d-flex flex-wrap">
            {Object.keys(myEvents).map((eventId, index) => (
              <EventCard key={index} event={myEvents[eventId]} />
            ))}
          </div>
        )}
      </>
    );
  }
};

Upcoming.getLayout = getLayout;

const mapDispatchToProps = {
  addEvent,
};

export default connect((state) => ({}), mapDispatchToProps)(Upcoming);
